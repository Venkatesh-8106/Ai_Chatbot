import google.generativeai as genai
from google.api_core.exceptions import (
    DeadlineExceeded,
    ServiceUnavailable,
    ResourceExhausted
)
from config import Config
import time


genai.configure(api_key=Config.GEMINI_API_KEY)

# Fast Gemini model
model = genai.GenerativeModel("models/gemini-flash-lite-latest")


def generate_response(user_message, conversation_history=None):
    """
    Sends conversation history + user message to Gemini
    and returns complete response.
    """

    if conversation_history is None:
        conversation_history = []

    history = []

    for msg in conversation_history:
        history.append({
            "role": "user" if msg["role"] == "user" else "model",
            "parts": [
                {
                    "text": msg["content"]
                }
            ]
        })

    try:
        chat = model.start_chat(history=history)

        response = chat.send_message(
            user_message,
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,
                max_output_tokens=2048,   # increased from 512
                top_p=0.9,
                top_k=40
            ),
            request_options=genai.types.RequestOptions(
                timeout=60
            )
        )

        return response.text

    except DeadlineExceeded:
        return "The response took too long. Please try again."

    except ServiceUnavailable:
        return "Gemini service is temporarily unavailable. Please try again."

    except ResourceExhausted:
        return "API limit reached. Please wait and try again."

    except Exception as e:
        return f"Error: {str(e)}"