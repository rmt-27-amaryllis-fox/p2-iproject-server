# API Documentation

Endpoints:
- GET /login
- GET /callback
- GET /users
- GET /songs/newrelease
- GET /albums/search
- GET /artists/search
- GET /lyrics/search
- GET /playlists/:id
- POST /playlists/:id

&nbsp;
# GET /login
Description: Fetching data needed to login via Spotify .

Response: 200 (OK)
```json
"string"
```

&nbsp;
# GET /callback
Description: Receiving code from Spotify and then reroute to ask for access token.

&nbsp;
# GET /users
Description: Get detailed profile information about the current user (including the current user's username).
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

Response: 200 (OK)
```json
{
  "country": "string",
  "display_name": "string",
  "email": "string",
  "explicit_content": "Object",
  "external_urls": "Object",
  "followers": "Object",
  "href": "string",
  "id": "string",
  "images": "Array",
  "product": "string",
  "type": "string",
  "uri": "string"
}
```

&nbsp;
# GET /songs/newrelease
Description: Get a list of new album releases featured in Spotify.
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

Response: 200 (OK)
```json
{
  "id": "string",
  "name": "string",
  "image": "string",
  "artist": "Object"
}
```

&nbsp;
# GET /albums/search
Description: Get Spotify catalog information about albums, artists, playlists, tracks, shows or episodes that match a keyword string..
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

- Params:
```json
{
    "track": "string"
}
```

Response: 200 (OK)
```json
{
  "id": "string",
  "name": "string",
  "image": "string",
  "artist": "Object"
}
```

&nbsp;
# GET /artists/search
Description: Search for similar artists.
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

- Params:
```json
{
    "artist": "string"
}
```

Response: 200 (OK)
```json
{
  "Info": "Array",
  "Results": "Array"
}
```

&nbsp;
# GET /lyrics/search
Description: Search for song's lyrics.
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

- Params:
```json
{
    "artist": "string",
    "song": "string"
}
```

Response: 200 (OK)
```json
{
  "lyrics": "string"
}
```

Response: 404 (Not Found)
```json
{
  "error": "No lyrics found"
}
```

&nbsp;
# GET /playlists/:id
Description: Get a list of the playlists owned or followed by the current Spotify user.
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

- Params
```json
{
    "id": "integer (required)" 
}
```

Response: 200 (OK)
```json
[
  {
    "collaborative": "string",
    "description": "string",
    "external_urls": "Object",
    "href": "string",
    "id": "string",
    "images": "Object",
    "name": "string",
    "owner": "Object",
    "primary_color": "string",
    "public": "boolean",
    "snapshot_id": "string",
    "tracks": "Object",
    "type": "string",
    "uri": "string"
  },...
]
```

&nbsp;
# POST /playlists/:id
Description: Create a playlist for a Spotify user.
Request:
- Headers:
```json
{
    "access_token": "string"
}
```

- Params
```json
{
    "id": "integer (required)",
    "name": "string"
}
```

Response: 201 (Created)
```json
[
  {
    "collaborative": "string",
    "description": "string",
    "external_urls": "Object",
    "href": "string",
    "id": "string",
    "images": "Object",
    "name": "string",
    "owner": "Object",
    "primary_color": "string",
    "public": "boolean",
    "snapshot_id": "string",
    "tracks": "Object",
    "type": "string",
    "uri": "string"
  },...
]
```

&nbsp;
# Global Error
Response: 401 (UNAUTHORIZED)
```json
{
    "message": "string"
}
```

Response: 403 (FORBIDDEN)
```json
{
    "message": "string"
}
```

Response: 429 (Too Many Requests)
```json
{
    "message": "string"
}
```

Response: 500 (Internal Server Error)
```json
{
    "message": "Internal server error"
}
```