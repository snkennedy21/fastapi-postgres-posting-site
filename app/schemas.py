from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint


class UserCreate(BaseModel):
  username: str
  email: str
  password: str
  confirm_password: str


class UserUpdate(BaseModel):
  username: str
  about: Optional[str]


class UserOut(BaseModel):
  id: int
  username: str
  email: EmailStr
  created_at: datetime
  
  class Config:
    orm_mode = True


class UserLogin(BaseModel):
  email: EmailStr
  password: str

class PostBase(BaseModel):
  title: str
  content: str
  published: bool = True

class PostCreate(PostBase):
  pass

class PostId(BaseModel):
  id: int


class Post(PostBase):
  id: int
  created_at: datetime
  owner_id: int
  owner: UserOut

  # Pydantic is typically only able to read dictionaries. This will enure that pydantic can read the ORM model returned by SQL Alchemy.
  class Config:
    orm_mode = True

 
class PostOut(BaseModel):
  post_id: int
  title: str
  content: str
  time_created: datetime
  current_user_is_owner: bool
  is_published: bool
  num_comments: int
  num_downvotes: int
  num_upvotes: int
  owner_id: int
  owner_username: str
  vote_is_upvote: Optional[bool]

  class Config:
    orm_mode = True

class Comment(BaseModel):
  id: int
  parent_id: Optional[int]
  post_id: int
  owner_id: int
  owner: UserOut
  created_at: datetime
  content: str

  class Config:
    orm_mode = True

class CommentIn(BaseModel):
  post_id: int
  content: str
  parent_id: Optional[int]
  

class CommentOut(BaseModel):
  Comment: Comment
  owned_by_current_user: bool


class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  id: Optional[str] = None


class CommentVote(BaseModel):
  comment_id: int
  direction: conint(le=1)


class Vote(BaseModel):
  post_id: int
  direction: conint(le=1)

class DeleteCommentVote(BaseModel):
  comment_id: int

class DeleteVote(BaseModel):
  post_id: int