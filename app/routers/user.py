from fastapi import status, HTTPException, Depends, APIRouter, Response
from .. import models, schemas, utils, oauth2
from sqlalchemy.orm import Session
from ..database import get_db
import re


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

  print('hello')

  response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, expires=3600, secure=True, samesite="none")
  response.set_cookie(key="auth", value="auth", expires=3600, secure=True, samesite="none")
  return {"access_token": access_token, "token_type": "bearer"}

@router.get('/{id}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
  user = db.query(models.User).filter(models.User.id == id).first()

  if not user:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"User with id: {id} does not exist"
    )
  
  return user
