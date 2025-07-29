#!/bin/bash

echo "🚀 Setting up Event Signup Website..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 14+ first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB doesn't seem to be running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongod"
    echo "   Or use MongoDB Atlas (cloud service)"
fi

echo "📦 Setting up backend..."

# Backend setup
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cat > .env << EOF
SECRET_KEY=dev-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/event_signup
DATABASE_NAME=event_signup
EOF
    echo "✅ Created .env file with default configuration"
fi

cd ..

echo "📦 Setting up frontend..."

# Frontend setup
cd frontend

# Install dependencies
npm install

cd ..

echo "✅ Setup complete!"
echo ""
echo "🎯 To start the application:"
echo ""
echo "1. Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python run.py"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5001"
echo ""
echo "📝 Don't forget to:"
echo "   - Configure MongoDB connection in backend/.env"
echo "   - Update SECRET_KEY for production use" 