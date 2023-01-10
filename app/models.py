from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, LargeBinary
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
  about = Column(String(length=500), nullable=True)
  photo = Column(LargeBinary, nullable=True)


class Vote(Base):
  __tablename__ = "votes"

  user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
  user = relationship("User", backref="votes")
  post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
  post = relationship("Post", backref="votes")
  upvote = Column(Boolean, nullable=False)

class Comment(Base):
  __tablename__ = "comments"

  id = Column(Integer, primary_key=True, nullable=False)
  parent_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
  owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
  owner = relationship("User", backref="comments")
  post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"))
  post = relationship("Post", backref="comments")
  content = Column(String, nullable=False)
  created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
  replies = relationship("Comment", lazy="joined", join_depth=1)


class CommentVote(Base):
  __tablename__ = "comment_votes"

  user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
  user = relationship("User", backref="comment_votes")
  comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), primary_key=True)
  comment = relationship("Comment", backref="comment_votes")
  upvote = Column(Boolean, nullable=False)