# Weather Station

Weather and tidal information for the good ol' town of Swampscott

## API URL, ID, and Keys

The NOAA URL path, tidal station ID, and NWS forecast grid coordinates are provided to the app via a .env file (git-ignored for security). Newer versions of the API require a token however I'm still using the older version here. The variable format of the .env file is:

```
BASE_URL='<url base>'
STATION_ID='<seven digit station ID>'
FORECAST_GRID='<NWS grid coordinates separated by a comma>'
```

Parcel caches these values, so changing them while it's running will not immediately update them in localhost. You will need to run `npm install` from root to update the cache.

## TODO

- ~~Settle on a component solution.~~
- Bring logic over from the tides project.
- Find weather API for this project.
- Integrate weather.
- Expand visuals, style, and animations/transitions.
