from flask import Blueprint, request, jsonify

from database.mongo import (
    create_conversation,
    get_messages,
    save_message
)

from services.gemini_service import generate_response

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    message = data.get("message", "").strip()

    conversation_id = data.get("conversation_id")

    if not message:
        return jsonify({
            "error": "Message is required"
        }), 400

    # Create a new conversation if one doesn't exist
    if not conversation_id:
        title = " ".join(message.split())
        if len(title) > 40:
            title = title[:37] + "..."
        conversation_id = create_conversation(title=title or "New Chat")

    # Load previous messages
    history = get_messages(conversation_id)

    try:
        # Get AI response
        ai_response = generate_response(
            message,
            history
        )

        # Save user message
        save_message(
            conversation_id,
            "user",
            message
        )

        # Save AI message
        save_message(
            conversation_id,
            "assistant",
            ai_response
        )

        return jsonify({
            "conversation_id": conversation_id,
            "response": ai_response
        })
    except Exception as exc:
        return jsonify({
            "error": "Failed to generate AI response",
            "details": str(exc)
        }), 500