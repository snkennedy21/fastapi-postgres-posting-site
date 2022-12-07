from fastapi import Response, status, HTTPException, Depends, APIRouter
from .. import models, schemas, oauth2
from typing import List, Optional
from sqlalchemy.orm import Session
from ..database import get_db


router = APIRouter(
  prefix="/comments",
  tags=["Comments"]
)


@router.get("/")
def get_comments_for_post():
  return {"Message": "Hoozah"}