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
    data_ev = pd.read_csv(csv_file.stream, decimal=",", header=0, names=["Date", "Consumption", "Distance", "Time hh:mm", "Speed"], index_col=0, parse_dates=True)
    data_ev['Duration'] = data_ev['Time hh:mm'].str.split(':').apply(lambda x: int(x[0]) * 60 + int(x[1]))
    data_ev = data_ev.drop(columns=['Time hh:mm']).loc[(data_ev['Speed']>30) & (data_ev['Duration'] > 15)]

    data_retriever = fd.FrostDataRetriever(
        longitude=10.55,
        latitude=63.42,
        initial_time_stamp=data_ev.index.min().isoformat(),
        final_time_stamp=data_ev.index.max().isoformat()
    )
    data_frost = data_retriever.build_dataframe()
    data_frost.set_index('referenceTime', inplace=True)
    data_frost.index = pd.to_datetime(data_frost.index)
    idx = data_ev.index
    data_combined = pd.concat([data_ev, data_frost]).sort_index().interpolate().reindex(idx)
    return data_combined.to_json()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
