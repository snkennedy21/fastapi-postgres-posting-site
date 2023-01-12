from fastapi import Response, status, HTTPException, Depends, APIRouter, Cookie
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from ..database import get_db


router = APIRouter(
  prefix="/comments",
  tags=["Comments"]
)

# response_model=List[schemas.CommentOut]
@router.get("/post/{id}")
def get_comments_for_post(id: int, db: Session = Depends(get_db), access_token: str = Cookie(None)):
  current_user = oauth2.get_current_user(access_token, db)
  def get_nested_comments(root_id=None, depth=0):
    if root_id:
      root = db.query(models.Comment).filter(models.Comment.id == root_id).one()
    else:
      root = db.query(models.Comment).filter(models.Comment.parent_id == None).filter(models.Comment.post_id == id).all()

    def get_replies(parent, depth):
      replies = []
      for reply in parent.replies:

        upvote_count = db.query(func.count(models.CommentVote.user_id)).filter(models.CommentVote.comment_id == reply.id, models.CommentVote.upvote == True).scalar()

        downvote_count = db.query(func.count(models.CommentVote.user_id)).filter(models.CommentVote.comment_id == reply.id, models.CommentVote.upvote == False).scalar()

        net_vote_count = upvote_count - downvote_count

        if current_user is None:
          user_vote = None
        elif current_user is not None:
          user_vote = db.query(models.CommentVote).filter(models.CommentVote.user_id == current_user.id, models.CommentVote.comment_id == reply.id).first()

        if user_vote:
          user_vote = user_vote.upvote
        else:
          user_vote = None
        
        owner_is_user = False
        if current_user is None:
          owner_is_user = False
        elif current_user is not None:
          owner_is_user = reply.owner.id == current_user.id
        replies.append({
          "id": reply.id,
          "content": reply.content,
          "created_at": reply.created_at,
          "owner": reply.owner.username,
          "owner_is_user": owner_is_user,
          "net_vote_count": net_vote_count,
          "user_vote": user_vote,
          "depth": depth,
          "replies": get_replies(reply, depth + 1)
        })
      return replies
    
    if root_id:
      upvote_count = db.query(func.count(models.CommentVote.user_id)).filter(models.CommentVote.comment_id == root.id, models.CommentVote == True).scalar()
      downvote_count = db.query(func.count(models.CommentVote.user_id)).filter(models.CommentVote.comment_id == root.id, models.CommentVote.upvote == False).scalar()
      net_vote_count = upvote_count - downvote_count

      if current_user is None:
        user_vote = None
      elif current_user is not None:
        user_vote = db.query(models.CommentVote).filter(models.CommentVote.user_id == current_user.id, models.CommentVote.comment_id == root.id).first()
        
      if user_vote:
        user_vote = user_vote.upvote
      else:
        user_vote = None

      owner_is_user = False
      if current_user is None:
        owner_is_user = False
      elif current_user is not None:
        owner_is_user = root.owner.id == current_user.id
      return {
        "id": root.id,
        "content": root.content,
        "created_at": root.created_at,
        "owner": root.owner.username,
        "owner_is_user": owner_is_user,
        "net_vote_count": net_vote_count,
        "user_vote": user_vote,
        "depth": depth,
        "replies": get_replies(root, depth + 1)
      }
    else:
      comments = []
      for comment in root:
        upvote_count = db.query(func.count(models.CommentVote.user_id)).filter(models.CommentVote.comment_id == comment.id, models.CommentVote.upvote == True).scalar()
        downvote_count = db.query(func.count(models.CommentVote.user_id)).filter(models.CommentVote.comment_id == comment.id, models.CommentVote.upvote == False).scalar()
        net_vote_count = upvote_count - downvote_count

        if current_user is None:
          user_vote = None
        elif current_user is not None:
          user_vote = db.query(models.CommentVote).filter(models.CommentVote.user_id == current_user.id, models.CommentVote.comment_id == comment.id).first()
    
        
        if user_vote:
          user_vote = user_vote.upvote
        else:
          user_vote = None

        owner_is_user = False
        if current_user is None:
          owner_is_user = False
        elif current_user is not None:
          owner_is_user = comment.owner.id == current_user.id
        comments.append({
          "id": comment.id,
          "content": comment.content,
          "created_at": comment.created_at,
          "owner": comment.owner.username,
          "owner_is_user": owner_is_user,
          "net_vote_count": net_vote_count,
          "user_vote": user_vote,
          "depth": depth,
          "replies": get_replies(comment, depth + 1)
        })
      return comments
  
  comments = get_nested_comments()

  return comments
  

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