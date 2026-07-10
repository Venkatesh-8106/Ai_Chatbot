from flask import Flask, render_template
from flask_cors import CORS

from routes.chat import chat_bp
from routes.conversation import conversation_bp

from config import Config

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():
    return render_template("index.html")


# Register Routes
app.register_blueprint(chat_bp)

app.register_blueprint(conversation_bp)


if __name__ == "__main__":

    

    app.run(
        debug=True,
        port=Config.PORT
    )
