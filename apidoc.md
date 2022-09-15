# Game Search API Documentation

List of available endpoints:
- `POST /register`
- `POST /login`

- `GET /mycart`
- `POST /mycart`
- `DELETE /mycart`

- `POST /transaction`

- `GET /games`
- `GET /prices`

&nbsp;

## 1. POST /register

Description:

- Register

_Response (200 - OK)_

```json
{
  "message": "succesful!! created 'username'"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "please!! use email format"
}
{
  "message": "Email must be unique"
}
{
  "message": "Email is required"
}
{
  "message": "Password is required"
}
{
  "message": "Minimum password length is 5"
}
```

## 2. POST /login

Description: 

- Login

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
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /mycart

Description:

- Showing data user list cart

Response (200 -OK)

```json
[
    {
        "id": 11,
        "UserId": 1,
        "itemName": "PUBG Survivor Pass: Badlands",
        "price": 1158600,
        "createdAt": "2022-09-14T14:46:44.500Z",
        "updatedAt": "2022-09-14T14:46:44.500Z"
    },
    {
        "id": 12,
        "UserId": 1,
        "itemName": "PUBG Survivor Pass: Payback",
        "price": 105000,
        "createdAt": "2022-09-14T14:47:00.863Z",
        "updatedAt": "2022-09-14T14:47:00.863Z"
    },
    {
        "id": 13,
        "UserId": 1,
        "itemName": "test 2 ",
        "price": 112321,
        "createdAt": "2022-09-14T14:47:12.248Z",
        "updatedAt": "2022-09-14T14:47:12.248Z"
    }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized"
}
```

## 4. POST /mycart

Description

- add item to the cart

Response (200 - OK)

```json
{
    "price": 112321,
    "UserId": 1,
    "updatedAt": "2022-09-14T14:47:12.248Z",
    "createdAt": "2022-09-14T14:47:12.248Z"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized"
}
```

## 5. DELETE /mycart

Description

- delete item from cart

Response (200 - OK)

```json
{
    "message": "Success delete item from cart"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "item not found"
}
```
    "id": 13,
    "itemName": "test 2 ",


## 6. POST /transaction

Description

- untuk checkout cart

Response (200 - OK)

```json
{
    "id": 13,
    "itemName": "test 2 ",
    "price": 112321,
    "UserId": 1,
    "updatedAt": "2022-09-14T14:47:12.248Z",
    "createdAt": "2022-09-14T14:47:12.248Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "There are no item to checkout!"
}
```
    "id": 13,
    "itemName": "test 2 ",


## 7. GET /games

Description

- untuk menampilkan free games

```json
[
    {
        "id": 521,
        "title": "Diablo Immortal",
        "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
        "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
        "game_url": "https://www.freetogame.com/open/diablo-immortal",
        "genre": "MMOARPG",
        "platform": "PC (Windows)",
        "publisher": "Blizzard Entertainment",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-06-02",
        "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
    },
    {
        "id": 517,
        "title": "Lost Ark",
        "thumbnail": "https://www.freetogame.com/g/517/thumbnail.jpg",
        "short_description": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
        "game_url": "https://www.freetogame.com/open/lost-ark",
        "genre": "ARPG",
        "platform": "PC (Windows)",
        "publisher": "Amazon Games",
        "developer": "Smilegate RPG",
        "release_date": "2022-02-11",
        "freetogame_profile_url": "https://www.freetogame.com/lost-ark"
    },
    {
        "id": 516,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },
    {
        "id": 508,
        "title": "Enlisted",
        "thumbnail": "https://www.freetogame.com/g/508/thumbnail.jpg",
        "short_description": "Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted. ",
        "game_url": "https://www.freetogame.com/open/enlisted",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "Gaijin Entertainment",
        "developer": "Darkflow Software",
        "release_date": "2021-04-08",
        "freetogame_profile_url": "https://www.freetogame.com/enlisted"
    },
    ...
]
    ```

## 8. GET/prices

Description

- untuk menampilkan prices games dengan cara search dan pagination

```json
{
    "amount": 10,
    "games": [
        {
            "availability": "OnlineOnly",
            "currency": "USD",
            "currentLowestPrice": 49.61,
            "id": "final-fantasy-vii-remake-intergrade",
            "name": "FINAL FANTASY VII REMAKE INTERGRADE",
            "releaseDate": "2021-12-16",
            "stores": [
                {
                    "price": 49.61,
                    "seller": "GAMIVO",
                    "url": "https://www.gamivo.com/product/final-fantasy-vii-remake-intergrade"
                },
                {
                    "price": 52.12,
                    "seller": "Kinguin",
                    "url": "https://www.kinguin.net/category/121803/final-fantasy-vii-remake-intergrade-steam-cd-key"
                },
                {
                    "price": 52.12,
                    "seller": "G2Play",
                    "url": "https://www.g2play.net/category/121803/final-fantasy-vii-remake-intergrade-steam-cd-key"
                },
                ...
        }
        ...
    ]
```
&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}