from flask import Blueprint, jsonify

from database.mongo import (
    get_all_conversations,
    get_messages,
    delete_conversation,
    delete_all_conversations
)

conversation_bp = Blueprint(
    "conversation",
    __name__
)


@conversation_bp.route("/conversations", methods=["GET"])
def conversations():

    return jsonify(
        get_all_conversations()
    )


@conversation_bp.route(
    "/conversation/<conversation_id>",
    methods=["GET"]
)
def conversation(conversation_id):

    return jsonify(
        get_messages(conversation_id)
    )


@conversation_bp.route(
    "/conversation/<conversation_id>",
    methods=["DELETE"]
)
def delete(conversation_id):

    delete_conversation(conversation_id)

    return jsonify({
        "message": "Conversation deleted"
    })


@conversation_bp.route("/conversations", methods=["DELETE"])
def delete_all():
    delete_all_conversations()

    return jsonify({
        "message": "All conversations deleted"
    })