from flask import Blueprint, request, jsonify
from app.services.auth_service import create_user, authenticate_user
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Api, Resource
from flasgger import swag_from
from app.models.user import User, db
from app.services.exceptions import AuthenticationError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from jwt.exceptions import ExpiredSignatureError

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')
api = Api(auth_bp)


@auth_bp.route('/register', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'description': 'Create a new user account.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'description': 'User information',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'},
                    'gender': {'type': 'string', 'enum': ['male', 'female']}
                },
                'required': ['name', 'email', 'password', 'gender']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'User created successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'},
                    'user': {
                        'type': 'object',
                        'properties': {
                            'id': {'type': 'integer'},
                            'name': {'type': 'string'},
                            'email': {'type': 'string'},
                            'gender': {'type': 'string'}
                        }
                    }
                }
            }
        },
        400: {
            'description': 'Missing required fields'
        }
    }
})
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')
    
    if not name or not email or not password or not gender:
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'User already exists'}), 400
        else:
            new_user = create_user(name, email, password, gender)
            return jsonify({'message': 'User created successfully', 'user': {'id': new_user.id, 'name': new_user.name, 'email': new_user.email, 'gender': new_user.gender}}), 201

    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500


@auth_bp.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'description': 'Login and get JWT token.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'description': 'Login credentials',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['email', 'password']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Login successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'},
                    'access_token': {'type': 'string'}
                }
            }
        },
        401: {
            'description': 'Invalid credentials'
        }
    }
})
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        token = authenticate_user(email, password)
        return jsonify({'message': 'Login successful', 'access_token': token}), 200
    except AuthenticationError as e:
        return jsonify({'message': str(e)}), 401 #return error authentication
    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Authentication'],
    'description': 'Get profile of the logged-in user.',
    'responses': {
        200: {
            'description': 'User profile data',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'name': {'type': 'string'},
                    'email': {'type': 'string'},
                    'gender': {'type': 'string'}
                }
            }
        },
        401: {
            'description': 'Unauthorized, invalid or expired token'
        }
    }
})
def profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'gender': user.gender}), 200
    except ExpiredSignatureError:
        return jsonify({'message': 'Unauthorized, invalid or expired token'}), 401
    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500
