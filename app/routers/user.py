from fastapi import status, HTTPException, Depends, APIRouter, Response, Form, File, UploadFile
from .. import models, schemas, utils, oauth2
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
import re, io, boto3, base64


S3_BUCKET_NAME = "fullstackoverflowphotos"
AWS_ACCESS_KEY = "AKIASE4T3J7OPSLTLHQB"
AWS_SECRET_KEY = "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"


router = APIRouter(
  prefix="/users",
  tags=["Users"]
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Token)
def create_user(response: Response, user: schemas.UserCreate, db: Session = Depends(get_db)):

  regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

  username_already_exists = db.query(models.User).filter(models.User.username == user.username).first()
  email_already_exists = db.query(models.User).filter(models.User.email == user.email).first()
  email_invalid = not re.fullmatch(regex, user.email)
  passwords_dont_match = user.password != user.confirm_password
  username_empty = len(user.username) == 0
  email_empty = len(user.email) == 0
  password_empty = len(user.password) == 0
  confirm_password_empty = len(user.confirm_password) == 0

  if username_already_exists or email_already_exists or passwords_dont_match or username_empty or email_empty or password_empty or confirm_password_empty or email_invalid:
    detail = ''
    if username_already_exists:
      detail += "usernameExists "
    if email_already_exists:
      detail += "emailExists "
    if email_invalid:
      detail += "emailInvalid "
    if passwords_dont_match:
      detail += "passwordsDontMatch "
    if username_empty:
      detail += "usernameEmpty "
    if email_empty:
      detail += "emailEmpty "
    if password_empty:
      detail += "passwordEmpty "
    if confirm_password_empty:
      detail += "confirmPasswordEmpty "

    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail=detail[:-1]
    )

  hashed_password = utils.hash(user.password)
  user.password = hashed_password

  new_user = models.User(
    username=user.username,
    email=user.email,
    password=user.password
  )

  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  access_token = oauth2.create_access_token(data={"user_id": new_user.id})

  response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, expires=3600, secure=True, samesite="none")
  response.set_cookie(key="auth", value="auth", expires=3600, secure=True, samesite="none")
  return {"access_token": access_token, "token_type": "bearer"}

#  response_model=schemas.UserOut
@router.get('/')
def get_current_user(current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
  user = db.query(models.User).filter(models.User.id == current_user.id).first()
  posts = db.query(models.Post).filter(models.Post.owner_id == current_user.id).all()

  users_posts = []
  for post in posts:
    upvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == True).scalar()
    downvote_count = db.query(func.count(models.Vote.user_id)).filter(models.Vote.post_id == post.id, models.Vote.upvote == False).scalar()
    net_vote_count = upvote_count - downvote_count
    user_vote = db.query(models.Vote).filter(models.Vote.user_id == current_user.id, models.Vote.post_id == post.id).first()
    num_comments = db.query(func.count(models.Comment.id)).filter(models.Comment.post_id == post.id).scalar()
    owner = db.query(models.User.username, models.User.email, models.User.id).filter(models.User.id == current_user.id).first()

    post_dict = post.__dict__

    post_dict["net_vote_count"] = net_vote_count
    post_dict["user_vote"] = user_vote
    post_dict["num_comments"] = num_comments
    post_dict["owner"] = owner

    users_posts.append(post_dict)

  s3 = boto3.client(
    "s3",
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key = AWS_SECRET_KEY
  )

  user_photo = ''
  photo_url = user.photo_url
  if photo_url is not None:

    split_url = photo_url.split('/')
    file_name = split_url[-1]

    response = s3.get_object(
      Bucket = S3_BUCKET_NAME,
      Key = file_name
    )
    user_photo = base64.b64encode(response["Body"].read()).decode()
  # except Exception as e:
  #   raise HTTPException(status_code=404, detail="User's Photo not found")

  if not user:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"User with id: {id} does not exist"
    )

  print(user_photo)

  return {
    "username": user.username,
    "email": user.email,
    "about": user.about,
    "posts": users_posts,
    "photo": user_photo
  }


@router.put("/")
def update_user(username: str = Form(), about: str = Form(), file: UploadFile = File(...), db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

  username_already_exists = db.query(models.User).filter(models.User.username == username).first()

  if username_already_exists and not username == current_user.username:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="usernameExists"
    )
  if username == '':
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="usernameEmpty"
    )

  url = current_user.photo_url 
  if file.filename != '':    
    s3 = boto3.client(
        "s3",
        aws_access_key_id = AWS_ACCESS_KEY,
        aws_secret_access_key = AWS_SECRET_KEY
      )
    file_name = f"{username}_{file.filename}"
    s3.upload_fileobj(file.file, S3_BUCKET_NAME, file_name)
    url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_name}"

  current_user.photo_url = url
  current_user.username = username
  current_user.about = about
  db.commit()


  return {"success": "yay"}

