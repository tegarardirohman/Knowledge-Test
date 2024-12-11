from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import db, User
from flask_jwt_extended import create_access_token
import datetime
from app.services.exceptions import AuthenticationError

def create_user(name, email, password, gender):
    try:
        hashed_password = generate_password_hash(password)
        new_user = User(name=name, email=email, password=hashed_password, gender=gender)
        db.session.add(new_user)
        db.session.commit()
        return new_user
    except Exception as e:
        db.session.rollback()
        raise e


def authenticate_user(email, password):
    try:
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            return create_access_token(identity=user.id)
        else:
            raise AuthenticationError("Email atau password salah")
    except Exception as e:
        db.session.rollback()
        raise e
