# Weather Station

Weather and tidal information for the good ol' town of Swampscott. As of right now this project has become a scratch-pad to tinker with technologies that I'm curious about, such as Next.js.

## API URL, ID, and Keys

The NOAA URL path, tidal station ID, and NWS forecast grid coordinates are provided to the app via a .env file (git-ignored for security). Newer versions of the API require a token however I'm still using the older version here. The variable format of the .env file is (note the `NEXT` flavoring):

```
NEXT_PUBLIC_BASE_URL='<url base>'
NEXT_PUBLIC_STATION_ID='<seven digit station ID>'
NEXT_PUBLIC_FORECAST_GRID='<NWS grid coordinates separated by a comma>'
```

Parcel caches these values, so changing them while it's running will not immediately update them in localhost. You will need to run `npm install` from root to update the cache.

## TODO

- Integrate weather and tidal API
- Expand visuals, style, and animations/transitions
