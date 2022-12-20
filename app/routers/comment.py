from fastapi import Response, status, HTTPException, Depends, APIRouter
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from ..database import get_db


router = APIRouter(
  prefix="/comments",
  tags=["Comments"]
)

# response_model=List[schemas.CommentOut]
@router.get("/post/{id}")
def get_comments_for_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

  def get_nested_comments(root_id=None):
    if root_id:
      root = db.query(models.Comment).filter(models.Comment.id == root_id).one()
    else:
      root = db.query(models.Comment).filter(models.Comment.parent_id == None).filter(models.Comment.post_id == id).all()

    def get_replies(parent):
      replies = []
      for reply in parent.replies:
        replies.append({
          "id": reply.id,
          "content": reply.content,
          "owner": reply.owner.username,
          "replies": get_replies(reply)
        })
      return replies
    
    if root_id:
      return {
        "id": root.id,
        "content": root.content,
        "owner": root.owner.username,
        "replies": get_replies(root)
      }
    else:
      comments = []
      for comment in root:
        comments.append({
          "id": comment.id,
          "content": comment.content,
          "owner": comment.owner.username,
          "replies": get_replies(comment)
        })
      return comments
  
  comments = get_nested_comments()

  print(comments)

  return comments
  



  # comments_query = db.query(
  #   models.Comment,
  #   (models.Comment.owner_id == current_user.id).label("owned_by_current_user")
  # ).filter(
  #   models.Comment.post_id == id
  # )

  # comments = comments_query.all()
  # print(comments)

  # return comments

@router.post("/")
def create_comment(comment: schemas.CommentIn, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
  new_comment = models.Comment(owner_id=current_user.id, **comment.dict())
  print(new_comment)
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