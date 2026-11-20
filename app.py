from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder="public")

@app.route("/")
def home():
    return send_from_directory("public", "index.html")

@app.route("/health")
def health():
    return jsonify({
        "status": "FreedomChat online!"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
    