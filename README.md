# Event Signup Website

A modern event signup website built with Flask (Python) backend and React (JavaScript) frontend, featuring clean CSV export functionality for event management.

## Features

- **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations
- **Event Signup Form**: Comprehensive form for cultural event registrations
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Clean CSV Export**: Organized data export with only necessary fields
- **Real-time Notifications**: Toast notifications for user feedback

## Tech Stack

### Backend
- **Flask**: Python web framework
- **MongoDB**: NoSQL database with PyMongo
- **Pandas**: Data manipulation and CSV generation
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **React**: JavaScript library for building user interfaces
- **React-Toastify**: Toast notifications
- **Axios**: HTTP client for API calls
- **Modern CSS**: Responsive design with gradients and animations

## Project Structure

```
tempo/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── signup.py      # Signup form endpoints
│   │   │   └── export.py      # Clean CSV export functionality
│   │   └── __init__.py        # Flask app initialization
│   ├── config.py              # Configuration settings
│   ├── requirements.txt       # Python dependencies
│   └── run.py                # Application entry point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EventSignupForm.js    # Main signup form
    │   │   └── EventSignupForm.css   # Form styling
    │   ├── App.js                    # Main app component
    │   ├── App.css                   # App styling
    │   └── index.js                  # React entry point
    └── package.json                  # Node.js dependencies
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (create a `.env` file):
   ```
   SECRET_KEY=your-secret-key
   MONGODB_URI=mongodb://localhost:27017/event_signup
   DATABASE_NAME=event_signup
   ```

5. Start the Flask server:
   ```bash
   python run.py
   ```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## Usage

### Event Signup
1. Open the website in your browser
2. Fill out the comprehensive signup form with:
   - Performance details (name, type, duration, performers)
   - Coordinator information (name, contact)
   - Performance description (optional)
3. Submit the form to register for the cultural event

### Data Export
1. Click the "Export Signups to CSV" button
2. A clean, organized CSV file will be downloaded containing:
   - Contact information (email, coordinator, phone)
   - Performance details (name, type, duration, performers)
   - Group assignment and description
   - Submission date

## API Endpoints

### POST /api/signup
Submit a new event signup
```json
{
  "email": "coordinator@example.com",
  "performance_name": "Bollywood Dance Medley",
  "performance_type": "Dance",
  "duration": "5-7 minutes",
  "number_of_performers": "8",
  "performer_names": "Priya Sharma, Raj Patel, Meera Singh",
  "group": "Group A",
  "performance_description": "A vibrant fusion of classical and modern dance",
  "coordinator_name": "Priya Sharma",
  "contact_number": "1234567890"
}
```

### GET /api/signups
Retrieve all signup data

### POST /api/export
Generate and download clean CSV file with organized data

## CSV Export Features

The export functionality provides:
1. **Clean Data**: Only necessary fields included in logical order
2. **Proper Formatting**: Readable column headers and formatted dates
3. **Data Cleaning**: Handles empty values and whitespace
4. **Logical Organization**: Contact info → Performance details → Metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 