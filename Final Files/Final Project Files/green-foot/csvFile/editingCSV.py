import pandas as pd
from json import loads, dumps

df = pd.read_csv("viewable_data.csv")

df = df[df['lon'].between(-125, -66)]
df = df[df['lat'].between(24, 50)]

#new_df = df[['time','lon','lat', 'nv', 'precipitationCal']].copy()

df = df.loc[(((df['lon'] - 0.05) % 1 == 0) & (df['nv'] == 0) & (((df['lat'] - 0.05) % 1 == 0) | ((df['lat'] - 0.55) % 1 == 0)))|
            (((df['lon'] - 0.05) % 1 == 0) & (df['nv'] == 0) & (((df['lat'] == 32.55)) | ((df['lat'] == 32.05))))|
            (((df['lon'] - 0.55) % 1 == 0) & (df['nv'] == 0) & (((df['lat'] - 0.05) % 1 == 0) | ((df['lat'] - 0.55) % 1 == 0)))|
            (((df['lon'] - 0.55) % 1 == 0) & (df['nv'] == 1) & (((df['lat'] == 32.55)) | ((df['lat'] == 32.05))))
            ]

#print(df)

result = df.to_json(orient="records")
parsed = loads(result)
json_string = dumps(parsed, indent=4)

with open("written_data.json", "w") as outfile:
    outfile.write(json_string)

print("We have parsed the csv and wrote to our json file with a limited range of results!")
