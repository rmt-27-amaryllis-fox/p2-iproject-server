# MET Digital API Documentation

MET Digital is a virtual museum where you can browse New York's MET collection. With midtrans, you may purchase arts that you like with various payment methods. Images and data gathered are accessed from metmuseum API


## Endpoints:
List of available endpoints:
* POST /register
* POST /login
* POST /owned/:id
* GET /owned

<br><br>

# 1. POST /users/register
description:
* register as a new users

request: 
* body:
```javascript
"username": string,
"email": string,
"password": string,
```

## Response <br><br>
***(201 - Created)***
```javascript
{
    "message": `user with email ${createUser.email} has been created`
}
```
***(400 - Bad Request)***
```javascript
{
    "message": string
}
```
***(SequelizeUniqueConstraintError || SequelizeValidationError)***
```js
{
    message: err.errors[0].message
}
```


# 2. POST /users/login
description:
* log in as an existing users

request: 
* body:
```javascript
"email": string,
"password": string,
```

## Response <br><br>
***(201 - Created)***
```javascript
{
    "access_token": string
}
```
***(400 - Bad Request)***
```javascript
{
    "message": "user not found!"
}
```

# 3. POST /owned/:id
description:
* Purchase a new item with Midtrans<br>

## request: 

* params:
```javascript
{id}
```
* headers:
```javascript
{access_token}
```
## Response
***(200 - OK)*** 
```js
{
    "transactionToken": "8ddd8e69-c51e-461b-aa86-26393fa878d6",
    "redirectUrl": "https://app.sandbox.midtrans.com/snap/v2/vtweb/8ddd8e69-c51e-461b-aa86-26393fa878d6"
}
```
***(401 - Unauthorized)***
```js
"message": "please login"
```
***(other)***
automated by MidTrans ex: 409
# 4. GET /owned
description:
* show all purchased items<br>

## Response
***(200 - OK)*** 
```js
[
    {
        "id": 8,
        "price": 32220000,
        "purchaseDate": "Thu Sep 15 2022 07:15:48 GMT+0700 (Western Indonesia Time)",
        "title": "Wall Tile Depicting an Asian Captive",
        "artist": "",
        "imgUrl": "https://images.metmuseum.org/CRDImages/eg/web-large/LC-26_7_969_EGDP031168.jpg",
        "UserId": 1,
        "createdAt": "2022-09-15T00:15:48.548Z",
        "updatedAt": "2022-09-15T00:15:48.548Z",
        "User": {
            "id": 1,
            "username": "hana",
            "email": "hana@mail.com",
            "password": "$2a$10$9.9GJcHGZHx1EDtnWO3yxeq/rYDP2220ddLWfa5uS0p0xPlnOOP8W",
            "createdAt": "2022-09-14T23:56:38.100Z",
            "updatedAt": "2022-09-14T23:56:38.100Z"
        }
    },
    {
        "id": 9,
        "price": 13520000,
        "purchaseDate": "Thu Sep 15 2022 07:15:54 GMT+0700 (Western Indonesia Time)",
        "title": "Pensive bodhisattva",
        "artist": "",
        "imgUrl": "https://images.metmuseum.org/CRDImages/as/web-large/DT11140.jpg",
        "UserId": 1,
        "createdAt": "2022-09-15T00:15:54.335Z",
        "updatedAt": "2022-09-15T00:15:54.335Z",
        "User": {
            "id": 1,
            "username": "hana",
            "email": "hana@mail.com",
            "password": "$2a$10$9.9GJcHGZHx1EDtnWO3yxeq/rYDP2220ddLWfa5uS0p0xPlnOOP8W",
            "createdAt": "2022-09-14T23:56:38.100Z",
            "updatedAt": "2022-09-14T23:56:38.100Z"
        }
    }
    .
    .
    .
]
```
***(401 - Unauthorized)***
```js
"message": "please login"
```

# Global Error

## Response

***500 - Internal Server Error***
```js
"message": "internal server error!!"
```