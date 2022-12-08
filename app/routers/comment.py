from fastapi import Response, status, HTTPException, Depends, APIRouter
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db


router = APIRouter(
  prefix="/comments",
  tags=["Comments"]
)


@router.get("/post/{id}", response_model=List[schemas.CommentOut])
def get_comments_for_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  comments_query = db.query(
    models.Comment,
    # (models.Comment.owner_id == current_user.id).label("ownedByCurrentUser")
  ).filter(
    models.Comment.post_id == id
  )

  comments = comments_query.all()
  print(comments)

  return comments

@router.post("/")
def create_comment(comment: schemas.Comment, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  print(comment.dict())
  new_comment = models.Comment(owner_id=current_user.id, **comment.dict())
  db.add(new_comment)
  db.commit()
  db.refresh(new_comment)
  return new_comment


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  comment_query = db.query(models.Comment).where(models.Comment.id == id)

  comment = comment_query.first()

  if comment == None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Comment with id {id} does not exist"
    )

  if comment.owner_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Not Authorized to perform requested action"
    )

  comment_query.delete(synchronize_session=False)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put('/{id}', response_model=schemas.CommentOut)
def update_comment(id: int, updated_comment: schemas.CommentIn, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  comment_query = db.query(
    models.Comment
  ).where(
    models.Comment.id == id
  )

  comment = comment_query.first()

  if comment == None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Comment with id {id} does not exist"
    )
  
  if comment.owner_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="Not Authorized to perform requested action"
    )
  
  comment_query.update(
    updated_comment.dict(),
    synchronize_session=False
  )
  db.commit()
  return comment_query.first()