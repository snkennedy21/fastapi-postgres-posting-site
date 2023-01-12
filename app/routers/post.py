from fastapi import Response, status, HTTPException, Depends, APIRouter, Cookie
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db, engine
from sqlalchemy import func, distinct, select, and_, text
import boto3, base64

S3_BUCKET_NAME = "fullstackoverflowphotos"
AWS_ACCESS_KEY = "AKIASE4T3J7OPSLTLHQB"
AWS_SECRET_KEY = "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"

router = APIRouter(
  prefix='/posts',
  tags=["Posts"]
)

# current_user: int = Depends(oauth2.get_current_user)

# response_model=List[schemas.PostOut]
@router.get("/",)
def get_posts(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = '', access_token: str = Cookie(None)):
  current_user = oauth2.get_current_user(access_token, db)

  posts = db.query(models.Post).all()

  list_of_posts = []
  for post in posts:
    upvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == True).scalar()
    downvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == False).scalar()
    net_vote_count = upvote_count - downvote_count
    num_comments = db.query(func.count(models.Comment.id)).filter(models.Comment.post_id == post.id).scalar()
    owner = db.query(models.User.username, models.User.email, models.User.id, models.User.photo_url).filter(models.User.id == post.owner_id).first()

    if current_user is None:
      vote_is_upvote = True
    elif current_user is not None:
      vote_is_upvote = db.query(models.Vote.upvote).filter(models.Vote.user_id == current_user.id, models.Vote.post_id == post.id).first()
    
    s3 = boto3.client(
      "s3",
      aws_access_key_id = AWS_ACCESS_KEY,
      aws_secret_access_key = AWS_SECRET_KEY
    )

    # user_photo = ''
    # photo_url = post.owner.photo_url
    # if photo_url is not None:

    #   split_url = photo_url.split('/')
    #   file_name = split_url[-1]

    #   response = s3.get_object(
    #     Bucket = S3_BUCKET_NAME,
    #     Key = file_name
    #   )
    #   user_photo = base64.b64encode(response["Body"].read()).decode()

    post_dict = post.__dict__

    post_dict["net_vote_count"] = net_vote_count
    post_dict["num_comments"] = num_comments
    post_dict["owner"] = owner
    post_dict["vote_is_upvote"] = vote_is_upvote

    list_of_posts.append(post_dict)

  return list_of_posts


#  response_model=schemas.PostOut
@router.get('/{id}')
def get_post(id: int, db: Session = Depends(get_db), access_token: str = Cookie(None)):
  current_user = oauth2.get_current_user(access_token, db)


  post = db.query(models.Post).filter(models.Post.id == id).first()

  upvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == True).scalar()
  downvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == False).scalar()

  net_vote_count = upvote_count - downvote_count
  num_comments = db.query(func.count(models.Comment.id)).filter(models.Comment.post_id == post.id).scalar()
  owner = db.query(models.User.username, models.User.email, models.User.id).filter(models.User.id == post.owner_id).first()
  if current_user is None:
    user_vote = None
  elif current_user is not None:
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
  if current_user is None:
    post_dict["owner_is_user"] = False
  elif current_user is not None:
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