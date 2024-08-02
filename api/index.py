from flask import Flask
app = Flask(__name__)

@app.route("/api/")
def index_page():
    return "<main><h1>Pedalboard Simulator</h1><p>Hello, World!</p></main>"
