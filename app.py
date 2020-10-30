import os
from flask import Flask, render_template

app = Flask("name-gathering")


@app.route("/")
def root():
    return render_template("index.html")


@app.route("/hello")
def hello():
    return {"hello": "world"}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
