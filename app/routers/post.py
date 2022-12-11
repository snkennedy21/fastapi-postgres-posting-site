from fastapi import Response, status, HTTPException, Depends, APIRouter
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db, engine
from sqlalchemy import func, distinct, select, and_, text

router = APIRouter(
  prefix='/posts',
  tags=["Posts"]
)

# current_user: int = Depends(oauth2.get_current_user)

# response_model=List[schemas.PostOut]

@router.get("/")
def get_posts(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = '', current_user: int = Depends(oauth2.get_current_user)):

  sql = text(
    '''
    SELECT 
      p.id AS posts_id,
      p.title AS posts_title,
      p.content AS posts_content,
      p.published AS posts_published,
      p.created_at AS posts_created_at,
      p.owner_id AS posts_owner_id,
      COALESCE(v.cnt_up, 0) AS upvotes,
      COALESCE(v.cnt_down, 0) AS downvotes,
      COALESCE(c.cnt, 0) AS comments,
	  users.username AS owner,
	  p.id IN (
		SELECT DISTINCT
		  votes.post_id
		  FROM votes
		  WHERE votes.user_id = :user_id
	  ) AS user_voted
    FROM posts p
    LEFT OUTER JOIN
    (
      SELECT
        post_id,
        COUNT(*) FILTER (WHERE upvote = true) AS cnt_up,
        COUNT(*) FILTER (WHERE upvote = false) AS cnt_down
      FROM votes
      GROUP BY post_id
    ) v ON v.post_id = p.id
    LEFT OUTER JOIN
    (
      SELECT
        post_id,
        COUNT(*) AS cnt
        FROM comments
        GROUP BY post_id
    ) c ON c.post_id = p.id
	  LEFT OUTER JOIN users ON users.id = p.owner_id
    ORDER BY p.id;
    '''
  )

  results = engine.execute(sql, user_id=current_user.id)
  stuff = results.all()
  return stuff


@router.get('/{id}', response_model=schemas.PostOut)
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

  upvote_subquery = select(
      models.Vote.upvote
    ).where(
      and_
      (models.Vote.user_id == current_user.id),
      (models.Vote.post_id == models.Post.id)
    ).correlate(models.Post)

  post_query = db.query(
      models.Post,
      func.count(models.Vote.post_id).filter(models.Vote.upvote == True).label("upvotes"),
      func.count(models.Vote.post_id).filter(models.Vote.upvote == False).label("downvotes"),
      (upvote_subquery).label('upvote'),
      (models.Post.owner_id == current_user.id).label("owner")
    ).join(
      models.Vote, models.Vote.post_id == models.Post.id, isouter=True
    ).group_by(
      models.Post.id
    ).filter(
      models.Post.id == id
    )
  
  post = post_query.first()

  if not post:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"post with id: {id} was not found" 
    )
  return post


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  new_post = models.Post(owner_id=current_user.id, **post.dict())
  db.add(new_post) # Adds the post to the database
  db.commit() # Saves the added post to the database
  db.refresh(new_post) # Returns the new post
  return new_post 


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  post_query = db.query(models.Post).filter(models.Post.id == id)

  post = post_query.first()

  if post == None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Post with id {id} does not exist"
    )

  if post.owner_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Not Authorized to perform requested action"
    )

  post_query.delete(synchronize_session=False)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put('/{id}', response_model=schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  post_query = db.query(models.Post).filter(models.Post.id == id)
  post = post_query.first()

  if post == None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Post with id {id} does not exist"
    )

  if post.owner_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Not Authorized to perform requested action"
    )

  post_query.update(updated_post.dict(), synchronize_session=False) 
  db.commit()
  return post_query.first()