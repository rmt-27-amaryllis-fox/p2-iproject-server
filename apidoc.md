# Vox8 API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /series`
- `GET /movies`
- `POST /search`
- `GET /movies/:id`
- `GET /series/:id`
- `PATCH /confirmation/:token`
- `GET /watchlists`
- `POST /watchlits/movies/:movieId`
- `POST /watchlists/series/:seriesId`
- `DELETE /watchlists/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
	"fullname": "string"
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;



## 2. POST /login

Request:

- body: 

```json
{
  "email": "string",
  "password": "string"
}
```
_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

&nbsp;

## 3. GET /series

Description:
- Get all series from 3rd Party API

Request:

- query:
```json
{
    "page": "integer(required)"
}
```


_Response (200 - OK)_

```json
{
    "page": "1",
    "series": [
        {
            "id": 94997,
            "name": "House of the Dragon",
            "release_date": "2022-08-21",
            "poster": "https://image.tmdb.org/t/p/original/z2yahl2uefxDCl0nogcRBstwruJ.jpg"
        },
        {
            "id": 84773,
            "name": "The Lord of the Rings: The Rings of Power",
            "release_date": "2022-09-01",
            "poster": "https://image.tmdb.org/t/p/original/suyNxglk17Cpk8rCM2kZgqKdftk.jpg"
        },
        {
            "id": 77169,
            "name": "Cobra Kai",
            "release_date": "2018-05-02",
            "poster": "https://image.tmdb.org/t/p/original/6POBWybSBDBKjSs1VAQcnQC1qyt.jpg"
        },
        ...
    ]
}
```

&nbsp;

## 4. GET /movies

Description:
- Get all movies from 3rd Party API

Request:

- query:
```json
{
    "page": "integer(required)"
}
```


_Response (200 - OK)_

```json
{
    "page": "1",
    "movies": [
        {
            "id": 985939,
            "title": "Fall",
            "release_date": "2022-08-11",
            "poster": "https://image.tmdb.org/t/p/original/v28T5F1IygM8vXWZIycfNEm3xcL.jpg"
        },
        {
            "id": 610150,
            "title": "Dragon Ball Super: Super Hero",
            "release_date": "2022-06-11",
            "poster": "https://image.tmdb.org/t/p/original/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg"
        },
        {
            "id": 616037,
            "title": "Thor: Love and Thunder",
            "release_date": "2022-07-06",
            "poster": "https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
        },
        ...
    ]
}
```

&nbsp;

## 5. POST /search

Description:
- Search movies or series

Request:
- query:
```json
{
    "query": "string"
}
```

_Response (200 - OK)_

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
            "genre_ids": [
                14,
                28,
                35
            ],
            "id": 616037,
            "media_type": "movie",
            "original_language": "en",
            "original_title": "Thor: Love and Thunder",
            "overview": "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
            "popularity": 3643.289,
            "poster_path": "https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
            "release_date": "2022-07-06",
            "title": "Thor: Love and Thunder",
            "video": false,
            "vote_average": 6.8,
            "vote_count": 3224
        },
        ...
    ],
    "total_pages": 122,
    "total_results": 2431
}
```

&nbsp;

## 6. GET /movies/:id
Description:
- Get movie details

Request: 

- params:

```json
{
    "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
{
    "movie": {
        "id": 616037,
        "backdrop_path": "https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
        "budget": 250000000,
        "genres": "Fantasy, Action, Comedy",
        "overview": "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
        "release_date": "2022-07-06",
        "revenue": 758004063,
        "status": "Released",
        "title": "Thor: Love and Thunder"
    },
    "cast": [
        {
            "name": "Chris Hemsworth",
            "photo": "https://image.tmdb.org/t/p/original/xkHHiJXraaMFXgRYspN6KVrFn17.jpg",
            "as": "Thor Odinson"
        },
        {
            "name": "Natalie Portman",
            "photo": "https://image.tmdb.org/t/p/original/edPU5HxncLWa1YkgRPNkSd68ONG.jpg",
            "as": "Jane Foster / The Mighty Thor"
        },
        {
            "name": "Christian Bale",
            "photo": "https://image.tmdb.org/t/p/original/qCpZn2e3dimwbryLnqxZuI88PTi.jpg",
            "as": "Gorr"
        },
        ...
    ],
    "similiar": [
        {
            "id": 9947,
            "title": "Elektra",
            "poster_path": "https://image.tmdb.org/t/p/original/gC6s6NKHneSrOKyQZnUMb443RKU.jpg",
            "release_date": "2005-01-13"
        },
        {
            "id": 9982,
            "title": "Chicken Little",
            "poster_path": "https://image.tmdb.org/t/p/original/1wg65q3daTE8rGfaUhBxLdXk6NL.jpg",
            "release_date": "2005-11-04"
        },
        ...
    ],
    "provider": [
        {
            "name": "Hotstar",
            "img": "https://image.tmdb.org/t/p/original/7Fl8ylPDclt3ZYgNbW2t7rbZE9I.jpg"
        }
    ]
}
```

&nbsp;

## 7. GET /series/:id
- Get series details

Request: 

- params:

```json
{
    "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
{
    "series": {
        "id": 94997,
        "backdrop_path": "https://image.tmdb.org/t/p/original/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
        "genres": "Sci-Fi & Fantasy, Drama, Action & Adventure",
        "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
        "first_air_date": "2022-08-21",
        "title": "House of the Dragon"
    },
    "cast": [
        {
            "name": "Paddy Considine",
            "photo": "https://image.tmdb.org/t/p/original/96bZA8JRDjBgCE7ZHHgOMPmykc4.jpg",
            "as": "Viserys Targaryen"
        },
        {
            "name": "Matt Smith",
            "photo": "https://image.tmdb.org/t/p/original/xr2GSp8Pm6fT5VGm0I9tsWVcZ8q.jpg",
            "as": "Daemon Targaryen"
        },
        {
            "name": "Rhys Ifans",
            "photo": "https://image.tmdb.org/t/p/original/AfXRP33ncRunR83JPehZ06Kgh8e.jpg",
            "as": "Otto Hightower"
        }
    ],
    "provider": [
        {
            "name": "HBO Go",
            "img": "https://image.tmdb.org/t/p/original/bxdNcDbk1ohVeOMmM3eusAAiTLw.jpg"
        }
    ]
}
```

&nbsp;

## 8. PATCH /confirmation/:token
Description: 
- Verify user email address by compare token when user click link on email

Request:
- params
```json
{
    "token": "string(required)"
}
```
_Response (200 - OK)_
```json
{ "message": "Verified" }
```

&nbsp;

## 9. GET /watchlists
Description:
- Get user watchlists

Request:
- headers:
```json
{
    "access_token": "string"
}
```
_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "title": "Thor: Love and Thunder",
        "release_year": "2022-07-06",
        "img_url": "https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
        "kind": "movie",
        "movie_id": 616037,
        "UserId": 1,
        "createdAt": "2022-09-14T10:50:26.412Z",
        "updatedAt": "2022-09-14T10:50:26.412Z"
    },
    {
        "id": 2,
        "title": "The Lord of the Rings: The Rings of Power",
        "release_year": "2022-09-01",
        "img_url": "https://image.tmdb.org/t/p/original/suyNxglk17Cpk8rCM2kZgqKdftk.jpg",
        "kind": "series",
        "movie_id": 84773,
        "UserId": 1,
        "createdAt": "2022-09-14T12:10:17.039Z",
        "updatedAt": "2022-09-14T12:10:17.039Z"
    },
    {
        "id": 3,
        "title": "House of the Dragon",
        "release_year": "2022-08-21",
        "img_url": "https://image.tmdb.org/t/p/original/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
        "kind": "series",
        "movie_id": 94997,
        "UserId": 1,
        "createdAt": "2022-09-14T12:31:44.613Z",
        "updatedAt": "2022-09-14T12:31:44.613Z"
    },
    ...
]
```

&nbsp;

## 10. POST /watchlits/movies/:movieId
Description:
- Add a movie to watchlists

Request: 
- params:
```json
{
    "movieId": "integer"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "Jurassic World Dominion",
    "release_year": "2022-06-01",
    "img_url": "https://image.tmdb.org/t/p/original/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
    "movie_id": 507086,
    "kind": "movie",
    "UserId": 1,
    "updatedAt": "2022-09-15T03:49:16.918Z",
    "createdAt": "2022-09-15T03:49:16.918Z"
}
```

&nbsp;

## 11. POST /watchlits/series/:seriesId
Description:
- Add a series to watchlists

Request: 
- params:
```json
{
    "seriesId": "integer"
}
```

_Response (201 - Created)_
```json
{
    "id": 2,
    "title": "The Sandman",
    "release_year": "2022-08-05",
    "img_url": "https://image.tmdb.org/t/p/original/q54qEgagGOYCq5D1903eBVMNkbo.jpg",
    "movie_id": 90802,
    "kind": "series",
    "UserId": 1,
    "updatedAt": "2022-09-15T03:51:40.228Z",
    "createdAt": "2022-09-15T03:51:40.228Z"
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Duplicate watchlist"
}
```
_Response ()

&nbsp;

## 11. DELETE /watchlists/:id
Description:
- Delete a movie or series from user watchlists

Request:
- params
```json
{
    "id": "integer"
}
```

_Response (200 - OK)_
```json
{
    "message": "Success delete watchlist"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Watchlist not found"
}
```


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;