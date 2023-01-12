from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import schemas, database, models, oauth2

router = APIRouter(
  prefix="/commentvote",
  tags=["Commentvote"]
)


@router.post('/', status_code=status.HTTP_201_CREATED)
def vote(vote: schemas.CommentVote, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):


  comment = db.query(models.Comment).filter(models.Comment.id == vote.comment_id).first()

  if not comment:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Comment with id: {vote.parent_id} does not exist"
    )
  
  vote_query = db.query(models.CommentVote).filter(models.CommentVote.comment_id == vote.comment_id, models.CommentVote.user_id == current_user.id)

  found_vote = vote_query.first()

  if vote.direction == 1:
    if found_vote:
      raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail=f"User: {current_user.id} has already voted on post {vote.comment_id}"
      )
    
    new_vote = models.CommentVote(comment_id=vote.comment_id, user_id=current_user.id, upvote=True)
    db.add(new_vote)
    db.commit()
    return {"Message": "Successfully added vote"}
  else:
    if found_vote:
      raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail=f"User: {current_user.id} has already voted on post {vote.comment_id}"
      )
    new_vote = models.CommentVote(comment_id=vote.comment_id, user_id=current_user.id, upvote=False)
    db.add(new_vote)
    db.commit()
    return {"Message": "Successfully added vote"}


@router.delete('/')
def deleteVote(vote: schemas.DeleteCommentVote, db: Session = Depends(database.get_db), current_user: int = Depends(oauth2.get_current_user)):
  vote_query = db.query(models.CommentVote).filter(models.CommentVote.comment_id == vote.comment_id, models.CommentVote.user_id == current_user.id)
  vote = vote_query.first()

  if vote == None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Could not find vote"
    )
  
  vote_query.delete(synchronize_session=False)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)