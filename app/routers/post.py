from fastapi import Response, status, HTTPException, Depends, APIRouter
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db
from sqlalchemy import func, distinct, select, and_

router = APIRouter(
  prefix='/posts',
  tags=["Posts"]
)

# current_user: int = Depends(oauth2.get_current_user)

# response_model=List[schemas.PostOut]

@router.get("/", response_model=List[schemas.PostOut])
def get_posts(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = '', current_user: int = Depends(oauth2.get_current_user)):

    upvote_subquery = select(
      models.Vote.upvote
    ).where(
      and_
      (models.Vote.user_id == current_user.id),
      (models.Vote.post_id == models.Post.id)
    ).correlate(models.Post)

    posts_query = db.query(
      models.Post,
      func.count(models.Vote.post_id).filter(models.Vote.upvote == True).label("upvotes"),
      func.count(models.Vote.post_id).filter(models.Vote.upvote == False).label("downvotes"),
      (upvote_subquery).label('upvote'),
      (models.Post.owner_id == current_user.id).label("owner"),
    ).join(
      models.Vote, models.Vote.post_id == models.Post.id, isouter=True
    ).group_by(
      models.Post.id
    )

    print(posts_query)
    posts = posts_query.all()
    return posts


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