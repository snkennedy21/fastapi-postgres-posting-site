from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routers import post, user, auth, vote, comment, comment_vote
from .config import settings


# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ['http://localhost:3000', 'https://full-stack-overflow.netlify.app']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)
app.include_router(comment.router)
app.include_router(comment_vote.router)


@app.get('/')
def root():
    return {"Message": "successfully deployed from CI/CD pipeline"}