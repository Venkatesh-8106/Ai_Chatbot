import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    MONGO_URI = os.getenv("MONGO_URI")

    DATABASE_NAME = os.getenv("DATABASE_NAME")

    PORT = int(os.getenv("PORT", 3009))