from pydantic import BaseSettings

class Settings(BaseSettings):
  DATABASE_HOSTNAME: str
  DATABASE_PORT: str
  DATABASE_PASSWORD: str
  DATABASE_NAME: str
  DATABASE_USERNAME: str
  SECRET_KEY: str
  ALGORITHM: str
  ACCESS_TOKEN_EXPIRE_MINUTES: int
  S3_BUCKET_NAME: str
  AWS_ACCESS_KEY: str
  AWS_SECRET_KEY: str

  class Config:
    env_file=".env"

settings = Settings()