from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)

db = client[Config.DATABASE_NAME]

conversations = db["conversations"]

messages = db["messages"]


def create_conversation(title="New Chat"):
    result = conversations.insert_one({
        "title": title
    })
    return str(result.inserted_id)


def delete_all_conversations():
    conversations.delete_many({})
    messages.delete_many({})


def get_all_conversations():
    data = []

    for conversation in conversations.find().sort("_id", -1):
        conversation["_id"] = str(conversation["_id"])
        data.append(conversation)

    return data


def delete_conversation(conversation_id):
    from bson import ObjectId

    conversations.delete_one({
        "_id": ObjectId(conversation_id)
    })

    messages.delete_many({
        "conversation_id": conversation_id
    })


def save_message(conversation_id, role, content):
    messages.insert_one({
        "conversation_id": conversation_id,
        "role": role,
        "content": content
    })


def get_messages(conversation_id):
    data = []

    for message in messages.find({
        "conversation_id": conversation_id
    }):
        message["_id"] = str(message["_id"])
        data.append(message)

    return data