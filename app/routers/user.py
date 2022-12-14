from fastapi import status, HTTPException, Depends, APIRouter, Response
from .. import models, schemas, utils, oauth2
from sqlalchemy.orm import Session
from ..database import get_db


router = APIRouter(
  prefix="/users",
  tags=["Users"]
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Token)
def create_user(response: Response, user: schemas.UserCreate, db: Session = Depends(get_db)):

  username_already_exists = db.query(models.User).filter(models.User.username == user.username).first()
  email_already_exists = db.query(models.User).filter(models.User.email == user.email).first()

  if username_already_exists and email_already_exists:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail=f"username {user.username} and email {user.email} already exist"
    )

  if username_already_exists:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail=f"username {user.username} already exists"
    )
  
  if email_already_exists:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail=f"email {user.email} already exists"
    )

  hashed_password = utils.hash(user.password)
  user.password = hashed_password

  new_user = models.User(**user.dict())

  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  access_token = oauth2.create_access_token(data={"user_id": new_user.id})

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
