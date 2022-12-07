from fastapi import Response, status, HTTPException, Depends, APIRouter
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db


router = APIRouter(
  prefix="/comments",
  tags=["Comments"]
)


@router.get("/{id}", response_model=List[schemas.CommentOut])
def get_comments_for_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  comments_query = db.query(
    models.Comment
  ).filter(
    models.Comment.post_id == id
  )
  comments = comments_query.all()

  return comments