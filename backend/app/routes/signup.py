from flask import Blueprint, request, jsonify, current_app
from flask_cors import cross_origin
from datetime import datetime
import uuid

bp = Blueprint('signup', __name__)

@bp.route('/api/signup', methods=['POST', 'OPTIONS'])
@cross_origin()
def submit_signup():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'performance_name', 'performance_type', 'duration', 
                         'number_of_performers', 'performer_names', 'group', 
                         'coordinator_name', 'contact_number']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create signup entry
        signup_data = {
            'id': str(uuid.uuid4()),
            'email': data['email'],
            'performance_name': data['performance_name'],
            'performance_type': data['performance_type'],
            'duration': data['duration'],
            'number_of_performers': data['number_of_performers'],
            'performer_names': data['performer_names'],
            'group': data['group'],
            'performance_description': data.get('performance_description', ''),
            'coordinator_name': data['coordinator_name'],
            'contact_number': data['contact_number'],
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert into MongoDB
        result = current_app.mongo.signups.insert_one(signup_data)
        
        return jsonify({
            'message': 'Signup submitted successfully',
            'id': signup_data['id']
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/api/signups', methods=['GET'])
@cross_origin()
def get_signups():
    try:
        signups = list(current_app.mongo.signups.find({}, {'_id': 0}))
        return jsonify(signups), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500 