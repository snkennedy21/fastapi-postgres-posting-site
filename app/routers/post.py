from fastapi import Response, status, HTTPException, Depends, APIRouter, Cookie
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
@router.get("/",)
def get_posts(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = '', access_token: str = Cookie(None)):
  current_user = oauth2.get_current_user(access_token)

  print(current_user)
  posts = db.query(models.Post).all()
  
  list_of_posts = []
  for post in posts:
    upvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == True).scalar()
    downvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == False).scalar()
    net_vote_count = upvote_count - downvote_count
    num_comments = db.query(func.count(models.Comment.id)).filter(models.Comment.post_id == post.id).scalar()
    owner = db.query(models.User.username, models.User.email, models.User.id).filter(models.User.id == post.owner_id).first()

    vote_is_upvote = db.query(models.Vote.upvote).filter(models.Vote.user_id == current_user.id, models.Vote.post_id == post.id).first()

    post_dict = post.__dict__

    post_dict["net_vote_count"] = net_vote_count
    post_dict["num_comments"] = num_comments
    post_dict["owner"] = owner
    post_dict["vote_is_upvote"] = vote_is_upvote

    list_of_posts.append(post_dict)

  return list_of_posts


#  response_model=schemas.PostOut
@router.get('/{id}')
def get_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

  post = db.query(models.Post).filter(models.Post.id == id).first()

  upvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == True).scalar()
  downvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == False).scalar()

  net_vote_count = upvote_count - downvote_count
  num_comments = db.query(func.count(models.Comment.id)).filter(models.Comment.post_id == post.id).scalar()
  owner = db.query(models.User.username, models.User.email, models.User.id).filter(models.User.id == post.owner_id).first()
  user_vote = db.query(models.Vote).filter(models.Vote.user_id == current_user.id, models.Vote.post_id == post.id).first()

  if user_vote:
    user_vote = user_vote.upvote
  else:
    user_vote = None

  post_dict = post.__dict__
  
  post_dict["net_vote_count"] = net_vote_count
  post_dict["num_comments"] = num_comments
  post_dict["owner"] = owner
  post_dict["user_vote"] = user_vote
  post_dict["owner_is_user"] = current_user.id == post.owner_id

  return post_dict


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