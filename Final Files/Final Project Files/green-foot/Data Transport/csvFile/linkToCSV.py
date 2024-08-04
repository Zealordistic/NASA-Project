import xarray as xr
print ("START")
DS = xr.open_dataset("data1.nc4")
DS.to_dataframe().to_csv("viewable_data.csv")
print ("END")