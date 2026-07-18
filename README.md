# AI Chatbot

A Flask-based AI chatbot application with a modern web interface, conversation history, and Google Gemini integration. The application allows users to interact with an AI assistant while automatically storing conversations in MongoDB for future access.

---

## Overview

This project provides:

- Interactive AI-powered conversations
- Persistent chat history using MongoDB
- Conversation management (create, switch, and delete chats)
- Clean and responsive web interface
- REST API for chatbot communication
- Google Gemini integration for AI-generated responses

---

## Features

- Responsive chat interface
- Light and dark theme support
- Conversation sidebar
- Create new chat sessions
- Switch between conversations
- Delete conversations
- Automatic chat history storage in MongoDB
- AI-generated responses using Google Gemini
- Flask REST API backend

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Backend | Flask 3.1 |
| Database | MongoDB |
| AI Model | Google Gemini |
| Database Driver | PyMongo |
| Cross-Origin Support | Flask-CORS |
| Environment Management | python-dotenv |

---

## Prerequisites

Before running the application, ensure the following are installed:

- Python 3.9 or later
- MongoDB (Local or MongoDB Atlas)
- Google Gemini API Key from Google AI Studio
- pip (Python Package Manager)

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd khub
```

### 2. Create a virtual environment

```bash
python -m venv my
```

### 3. Activate the virtual environment

**Windows**

```bash
my\Scripts\activate
```

**Linux / macOS**

```bash
source my/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Configuration

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=khub
PORT=3009
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API Key |
| `MONGO_URI` | MongoDB connection string |
| `DATABASE_NAME` | MongoDB database name |
| `PORT` | Flask server port |

---

## Running the Application

Start the Flask server.

```bash
python app.py
```

Once the server starts successfully, open:

```
http://127.0.0.1:3009
```

---

## Usage

1. Open the application in your browser.
2. Enter a message in the chat input.
3. Submit the message.
4. The application sends the request to Google Gemini.
5. The generated response is displayed in the chat window.
6. Conversations are automatically saved in MongoDB.
7. Use the sidebar to create, switch, or delete conversations.

---

## Project Structure

```
khub/
│
├── app.py                  # Application entry point
├── config.py               # Configuration loader
├── database/               # MongoDB connection and helpers
├── routes/                 # API endpoints
├── services/               # Gemini service implementation
├── static/                 # CSS, JavaScript, and static assets
├── templates/              # HTML templates
├── requirements.txt
└── .env
```

---

## API

### Send Chat Message

**Endpoint**

```
POST /chat
```

**Request**

```json
{
  "message": "Hello"
}
```

**Response**

```json
{
  "response": "Hello! How can I help you today?"
}
```

---

## Troubleshooting

If you encounter any issues while running the application, verify the following:

| Issue | Solution |
|-------|----------|
| Gemini API errors | Verify that `GEMINI_API_KEY` is valid and correctly configured. |
| MongoDB connection failure | Ensure MongoDB is running and `MONGO_URI` is correct. |
| Port already in use | Change the `PORT` value in the `.env` file. |
| Missing dependencies | Run `pip install -r requirements.txt`. |
| Module import errors | Confirm that the virtual environment is activated before running the application. |

---

## License

This project is intended for educational and development purposes. Modify and extend it as needed.
