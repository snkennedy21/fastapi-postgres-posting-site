from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base

class Post(Base):
  __tablename__ = "posts"

  id = Column(Integer, primary_key=True, nullable=False)
  title = Column(String, nullable=False)
  content = Column(String, nullable=False)
  published = Column(Boolean, server_default="True", nullable=False)
  created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
  owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  owner = relationship("User", backref="posts")


class User(Base): 
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, nullable=False)
  username = Column(String, nullable=False, unique=True)
  email = Column(String, nullable=False, unique=True)
  password = Column(String, nullable=False)
  created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)


class Vote(Base):
  __tablename__ = "votes"

  user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
  user = relationship("User", backref="votes")
  post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
  post = relationship("User", backref="votes")
  upvote = Column(Boolean, nullable=False)