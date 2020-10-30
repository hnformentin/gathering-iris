import os
import pandas as pd
import backend.frost_data_retriever as fd
from flask import Flask, render_template, send_from_directory, request


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


@app.route('/uploadUserData', methods=['POST'])
def upload_user_data():
    print(request.form)
    print(request.files)
    csv_file = request.files.get("userData")
    data = pd.read_csv(csv_file.stream)
    data_retriever = fd.FrostDataRetriever()
    df = data_retriever.build_dataframe()
    # Magic math
    return df.to_json()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
