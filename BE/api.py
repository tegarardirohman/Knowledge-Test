from flask import Flask
from flasgger import Swagger
from flask_restful import Api
from app.models.user import db
from app.routes.auth import auth_bp
from app.routes.product import product_bp
from app.config import Config
from flask_cors import CORS

#flask initialization
app = Flask(__name__)

#activate CORS for all origins
CORS(app, origins="*", methods=["GET", "POST", "PUT", "DELETE"])

#jwt initialization
from flask_jwt_extended import JWTManager
jwt = JWTManager(app)

app.config.from_object(Config)
db.init_app(app)

# create database tables
with app.app_context():
    db.create_all()

#swagger UI initialization
api = Api(app)
swagger = Swagger(app)

#register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(product_bp)

if __name__ == '__main__':
    app.run(debug=True)
