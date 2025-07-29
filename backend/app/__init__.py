from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize CORS with more permissive settings
    CORS(app, 
          origins=['http://localhost:3000', 'http://127.0.0.1:3000'],
          supports_credentials=True,
          methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          allow_headers=['Content-Type', 'Authorization'])
    
    # Initialize MongoDB
    client = MongoClient(app.config['MONGODB_URI'])
    app.mongo = client[app.config['DATABASE_NAME']]
    
    # Register blueprints
    from app.routes import signup, export
    app.register_blueprint(signup.bp)
    app.register_blueprint(export.bp)
    
    return app