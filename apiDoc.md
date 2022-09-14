# Applu API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /iPhone`
- `GET /order`
- `POST /order/:iphoneId`
- `DELETE /order/:orderId`

&nbsp;

## 1. POST /login

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
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. POST /register

Request:

- body:

```json
{
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


## 3. GET /iPhone

Description:
- Get all iPhone from database

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "iPhone 14",
        "price": 799,
        "ram": "6GB",
        "CPU": "Hexa-core",
        "description": "Our longest battery life ever",
        "imgUrl": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660689596976",
        "createdAt": "2022-09-14T09:55:23.358Z",
        "updatedAt": "2022-09-14T09:55:23.358Z"
    },
    {
        "id": 2,
        "name": "iPhone X",
        "price": 280,
        "ram": "3GB",
        "CPU": "Hexa-core",
        "description": "Like using the future of smartphones today",
        "imgUrl": "https://cdn.eraspace.com/pub/media/wysiwyg/ibox/iphone-x/iphoneX_30-min.png",
        "createdAt": "2022-09-14T09:55:23.358Z",
        "updatedAt": "2022-09-14T09:55:23.358Z"
    },
    {
        "id": 3,
        "name": "iPhone 12",
        "price": 425,
        "ram": "4GB",
        "CPU": "Hexa-core",
        "description": "Thinner and Faster",
        "imgUrl": "https://cdn.eraspace.com/pub/media/catalog/product/i/p/iphone_12_purple_1_2_1.jpg",
        "createdAt": "2022-09-14T09:55:23.358Z",
        "updatedAt": "2022-09-14T09:55:23.358Z"
    }
]
```

&nbsp;


## 4. GET /order

Description:
- Get all order from database

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
        "UserId": 1,
        "IphoneId": 1,
        "color": "Silver",
        "capacity": "256GB",
        "User": {
            "id": 1,
            "email": "user@mail.com",
            "password": "$2a$10$dZ.QxGu8M88oWSXa9.hDC.xfiZYNAGU.GLflYR0LJ9BC31/JCAjJm",
            "role": "customer",
            "createdAt": "2022-09-14T09:55:23.222Z",
            "updatedAt": "2022-09-14T09:55:23.222Z"
        },
        "Iphone": {
            "id": 1,
            "name": "iPhone 14",
            "price": 799,
            "ram": "6GB",
            "CPU": "Hexa-core",
            "description": "Our longest battery life ever",
            "imgUrl": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660689596976",
            "createdAt": "2022-09-14T09:55:23.358Z",
            "updatedAt": "2022-09-14T09:55:23.358Z"
        }
    }
]
```

&nbsp;

## 5. POST /order/:iphoneId

Description:
- Find or Create order to database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
[
    {
        "IphoneId": 1,
        "UserId": 1,
        "capacity": "256GB",
        "color": "Gold",
        "updatedAt": "2022-09-14T10:32:19.995Z",
        "createdAt": "2022-09-14T10:32:19.995Z"
    },
    true
]
```

&nbsp;

## 6. DELETE /order/:orderId

Description:
- Delete order by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Order has been Cancelled"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Order not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

## 7. POST /users/google-sign-in

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
