from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint


class UserCreate(BaseModel):
  username: str
  email: EmailStr
  password: str


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
  Post: Post
  upvotes: int
  downvotes: int
  upvote: Optional[bool]
  owner: bool

  class Config:
    orm_mode = True

class Comment(BaseModel):
  post_id: int
  content: str

class CommentIn(BaseModel):
  content: str


class CommentOut(BaseModel):
  id: int
  post_id: int
  owner_id: int
  owner: UserOut
  created_at: datetime
  content: str

  class Config:
    orm_mode = True


class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  id: Optional[str] = None



class Vote(BaseModel):
  post_id: int
  direction: conint(le=1)

class DeleteVote(BaseModel):
  post_id: int