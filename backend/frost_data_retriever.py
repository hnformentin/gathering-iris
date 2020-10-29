import pandas as pd
import numpy as np
import requests

def _set_reference_time(time0, time1):
    return time0 + '/' + time1


class FrostDataRetriever:

    def __init__(self, longitude=10, latitude=59, initial_time_stamp='2020-07-20T00:00:00',
                 final_time_stamp='2020-07-31T23:59:59'):
        self.client_id = '2b9f6bea-e460-4b62-ae1b-cf542359279d'
        self.source_location = self._set_source_location(longitude, latitude)
        self.reference_time = _set_reference_time(initial_time_stamp, final_time_stamp)

    def _set_source_location(self, longitude=10, latitude=59):
        endpoint = 'https://frost.met.no/sources/v0.jsonld'

        parameters = {
            'geometry': f'nearest(POINT({longitude} {latitude}))'
        }

        r = requests.get(endpoint, parameters, auth=(self.client_id, ''))

        if r.status_code > 203:
            raise ConnectionError('Unable to retrieve data from FROST.')

        return r.json()['data'][0]['id']

    # 'air_temperature,precipitation_amount,relative_humidity,surface_temperature,wind_speed',
    def get_data(self, element='air_temperature'):
        endpoint = 'https://frost.met.no/observations/v0.jsonld'

        parameters = {
            'sources': self.source_location,
            'elements': element,
            'referencetime': self.reference_time,
        }

        r = requests.get(endpoint, parameters, auth=(self.client_id, ''))

        if r.status_code > 203:
            raise ConnectionError('Unable to retrieve data from FROST.')

        return r.json()['data']


    def build_dataframe(self):
        elements = ['air_temperature', 'wind_speed']

        final_df = pd.DataFrame()

        for e in elements:
            json_data = self.get_data(e)
            df = pd.DataFrame(json_data)
            df[e] = df.apply(lambda row: row['observations'][0]['value'], axis=1)
            df = df.drop(['observations', 'sourceId'], axis=1)
            final_df = pd.concat([final_df, df], axis=1)
            print(df)

        _, i = np.unique(final_df.columns, return_index=True)
        final_df = final_df.iloc[:, i]

        print(final_df.head())


if __name__ == '__main__':
    data_retriever = FrostDataRetriever()
    data_retriever.build_dataframe()
