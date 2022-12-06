from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_

from .. import database, schemas, models, utils, oauth2

router = APIRouter(
  tags = ["Authentication"]
)


@router.post('/login', response_model=schemas.Token)
def login(response: Response, user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

  user = db.query(models.User).filter(or_(models.User.username == user_credentials.username, models.User.email == user_credentials.username)).first()

  if not user:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Invalid Credentials"
    )
  
  if not utils.verify(user_credentials.password, user.password):
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Invalid Credentials"
    )

  access_token = oauth2.create_access_token(data={"user_id": user.id})

  response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, expires=20, secure=True, samesite="none")
  response.set_cookie(key="auth", value="auth", expires=20, secure=True, samesite="none")
  return {"access_token": access_token, "token_type": "bearer"}

@router.delete('/logout')
def logout(response: Response):
  response.delete_cookie(key="access_token")
  response.delete_cookie(key="auth")
  response.status_code=status.HTTP_204_NO_CONTENT
  return response.status_code
  
