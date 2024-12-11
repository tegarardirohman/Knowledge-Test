import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SECRET_KEY = os.urandom(24)
    SECRET_KEY = 'your_secret_key'
    # JWT_SECRET_KEY = os.urandom(24)
    JWT_SECRET_KEY = 'your_jwt_secret_key'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/db_win'
