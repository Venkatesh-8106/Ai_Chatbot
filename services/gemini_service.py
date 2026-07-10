import google.generativeai as genai
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_response(user_message, conversation_history=[]):
    """
    Sends the conversation history along with the latest
    user message to Gemini and returns the response.
    """

    history = []

    for msg in conversation_history:
        history.append({
            "role": "user" if msg["role"] == "user" else "model",
            "parts": [msg["content"]]
        })

    chat = model.start_chat(history=history)

    response = chat.send_message(user_message)

    return response.text