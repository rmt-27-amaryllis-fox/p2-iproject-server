# simptcg API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/google-sign-in`
- `POST /users/register`
- `POST /users/login`
- `GET /myprofile`
- `GET /game-cards`
- `POST /game-cards`
- `POST /redeem`

&nbsp;

## 1. POST /users/google-sign-in

Request:

- header:

```json
{
  "token_dari_google": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "usernameFind": "string"
}
```

_Response (401 - invalid email/password)_

```json
{
  "message": "error invalid username or email or password"
}
```

## 2. POST /users/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "user with email <email> has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be null"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Email value should be email format (using @)"
}
OR
{
  "message": "password cannot be null"
}
OR
{
  "message": "password cannot be empty"
}

```

&nbsp;

## 3. POST /users/login

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
  "access_token": "string",
  "usernameFind": "string"
}
```

_Response (401 - invalid email/password)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

## 4. GET /myprofile

Description : get Information about users profile in game

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "coba1",
  "email": "coba1@gmail.com",
  "UserProfile": {
    "id": 1,
    "name": "coba1",
    "bio": "This is a normal Bio",
    "UserId": 1,
    "totalSpellCard": 1,
    "totalTrapCard": 0,
    "totalMonsterCard": 2,
    "totalWin": 0,
    "totalLose": 0
  },
  "CardDatabases": [
    {
      "cardName": "Shuttleroid",
      "cardType": "Effect Monster",
      "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/10449150.jpg",
      "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/10449150.jpg"
    },
    {
      "cardName": "Magician's Salvation",
      "cardType": "Spell Card",
      "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/95477924.jpg",
      "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/95477924.jpg"
    },
    {
      "cardName": "Mermail Abyssnerei",
      "cardType": "Effect Monster",
      "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/71133680.jpg",
      "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/71133680.jpg"
    }
  ]
}
```

_Response (401 - Unauthorized Activity)_

```json
{
  "message": "Unauthorized Activity"
}
```

&nbsp;

&nbsp;

## 5. GET /game-cards

Description :
Get 6 Cards from ygoproapidb randomly

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "cardList": [
    {
      "name": "Odd-Eyes Pendulumgraph Dragon",
      "type": "Pendulum Effect Ritual Monster",
      "atk": 2700,
      "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/66425726.jpg",
      "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/66425726.jpg"
    },
    {
      "name": "Zenigebazauls",
      "type": "Effect Monster",
      "atk": 2400,
      "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/160203008.jpg",
      "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/160203008.jpg"
    },
  ...
  ]
}
```

_Response (401 - Unauthorized Activity)_

```json
{
  "message": "Unauthorized Activity"
}
```

&nbsp;

&nbsp;

## 6. POST /game-cards

Description : Add record game data to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body :

```json
{
  "pointAI": "integer",
  "pointYou": "integer",
  "cardList": "Array of Object"
}
```

_Response (201 - Created)_

```json
{ "message": "Success saving cards & stats" }
```

_Response (401 - Unauthorized Activity)_

```json
{
  "message": "Unauthorized Activity"
}
```

&nbsp;

## 7. POST /redeem

Description :
Redeem 3 Random Card from ygoproapidb
Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - OK)_

```json
{ "message": "Success Redeem Cards. Please check myprofile page " }
```

_Response (401 - Unauthorized Activity)_

```json
{
  "message": "Unauthorized Activity"
}
```

&nbsp;

## Global Error

&nbsp;

_Response (400 - Error Fetch data from ygoproapidb)_

```json
{ "message": "eror : api ygopro macet" }
```

&nbsp;

_Response (401 - Error Invalid email/password)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

_Response (401 - Unauthorized Activity)_

```json
{
  "message": "Unauthorized Activity"
}
```

&nbsp;

_Response (401 - JsonWebTokenError)_

```json
{
  "message": "invalid token"
}
```

&nbsp;

_Response (401 - TokenExpiredError)_

```json
{
  "message": "expired token"
}
```

&nbsp;

_Response (403 - forbidden to access)_

```json
{
  "message": "forbidden to access"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;
