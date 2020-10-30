import os
from flask import Flask, render_template, send_from_directory


app = Flask("iris-gathering", static_url_path='')


@app.route('/templates/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)


@app.route("/")
def root():
    return render_template("index.html")


@app.route("/hello")
def hello():
    return {"hello": "world"}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
