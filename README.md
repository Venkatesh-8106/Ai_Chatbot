# KHub Chatbot

KHub is a Flask-based AI chatbot application with a polished web interface, conversation history, and Gemini-powered responses. It lets users chat with an AI assistant while saving conversations in MongoDB for later use.

## Features
- Responsive chat interface with light and dark themes
- Sidebar for managing conversations
- Create, switch, and delete chat sessions
- Save chat history in MongoDB
- AI responses powered by Google Gemini
- Backend API route for sending chat messages

## Tech Stack
- Flask 3.1
- Flask-CORS
- Google Generative AI
- PyMongo
- python-dotenv

## Prerequisites
Before running the app, make sure you have:
- Python 3.9 or newer
- A MongoDB instance running locally or on MongoDB Atlas
- A Gemini API key from Google AI Studio

## Installation
1. Open the project folder:
   cd khub

2. Create and activate a virtual environment (recommended):
   python -m venv my
   .\my\Scripts\activate

3. Install the required Python packages:
   pip install -r requirements.txt

4. Create a .env file in the project root with the following values:

   GEMINI_API_KEY=your_gemini_api_key_here
   MONGO_URI=mongodb://localhost:27017
   DATABASE_NAME=khub
   PORT=3009

### Environment Variables
- GEMINI_API_KEY: Your Google Gemini API key
- MONGO_URI: Your MongoDB connection string
- DATABASE_NAME: Name of the MongoDB database to use
- PORT: Port for the Flask app (default is 3009)

## Running the Application
Start the server with:

python app.py

Then open your browser at:

http://127.0.0.1:3009

## How to Use
1. Open the app in your browser.
2. Type a message in the chat box.
3. The assistant will respond using Gemini.
4. Use the sidebar to manage and switch between conversations.

## Project Structure
- app.py: Main Flask application entry point
- routes/: API routes for chat and conversation management
- services/: Gemini integration logic
- templates/: HTML frontend templates
- static/: CSS and JavaScript assets
- database/: MongoDB connection and persistence helpers
- config.py: Application configuration loaded from .env

## Troubleshooting
- If the app shows an API error, verify that GEMINI_API_KEY is set correctly.
- If MongoDB connections fail, check that MONGO_URI points to a working MongoDB instance.
- If the port is already in use, change the PORT value in your .env file.
- If dependencies are missing, run:

  pip install -r requirements.txt


