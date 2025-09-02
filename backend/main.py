from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from adapters.api.user_routes import user_bp
from adapters.api.dash_routes import dash_bp
import os

load_dotenv()

app=Flask(__name__)
CORS(app, supports_credentials=True, origins="http://localhost:5173")

port=os.getenv("PORT") or 5000

# Routes
app.register_blueprint(user_bp)
app.register_blueprint(dash_bp)

if __name__=="__main__":
    app.run(port=port)