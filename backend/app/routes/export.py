from flask import Blueprint, request, jsonify, send_file, current_app
from flask_cors import cross_origin
import pandas as pd
from datetime import datetime
import os

bp = Blueprint('export', __name__)

@bp.route('/api/export', methods=['POST', 'OPTIONS'])
@cross_origin()
def export_signups():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    
    try:
        # Get all signups from MongoDB
        signups = list(current_app.mongo.signups.find({}, {'_id': 0}))
        
        if not signups:
            return jsonify({'error': 'No signups found'}), 404
        
        # Create DataFrame from signups
        df = pd.DataFrame(signups)
        
        # Select and reorder only the necessary fields for a clean export
        # Fields are ordered logically: Contact Info -> Performance Details -> Coordinator Info -> Metadata
        clean_columns = [
            'email',
            'coordinator_name', 
            'contact_number',
            'performance_name',
            'performance_type',
            'duration',
            'number_of_performers',
            'performer_names',
            'group',
            'performance_description',
            'created_at'
        ]
        
        # Filter to only include columns that exist in the data
        available_columns = [col for col in clean_columns if col in df.columns]
        df_clean = df[available_columns].copy()
        
        # Rename columns for better readability
        column_mapping = {
            'email': 'Email',
            'coordinator_name': 'Coordinator Name',
            'contact_number': 'Contact Number',
            'performance_name': 'Performance Name',
            'performance_type': 'Performance Type',
            'duration': 'Duration',
            'number_of_performers': 'Number of Performers',
            'performer_names': 'Performer Names',
            'group': 'Group',
            'performance_description': 'Performance Description',
            'created_at': 'Submission Date'
        }
        
        # Apply column mapping for available columns
        df_clean.columns = [column_mapping.get(col, col) for col in df_clean.columns]
        
        # Format the submission date for better readability
        if 'Submission Date' in df_clean.columns:
            df_clean['Submission Date'] = pd.to_datetime(df_clean['Submission Date']).dt.strftime('%Y-%m-%d %H:%M:%S')
        
        # Clean up data - remove extra whitespace and handle empty values
        for col in df_clean.columns:
            if df_clean[col].dtype == 'object':
                df_clean[col] = df_clean[col].astype(str).str.strip()
                # Replace empty strings with 'N/A' for better readability
                df_clean[col] = df_clean[col].replace(['', 'nan', 'None'], 'N/A')
        
        # Sort by submission date (newest first)
        if 'Submission Date' in df_clean.columns:
            df_clean = df_clean.sort_values('Submission Date', ascending=False)
        
        # Save to CSV file with proper formatting
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'ganesh_utsav_signups_{timestamp}.csv'
        filepath = os.path.join('/tmp', filename)
        
        # Export to CSV with proper formatting
        df_clean.to_csv(filepath, index=False, encoding='utf-8')
        
        # Return the file
        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype='text/csv'
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500 