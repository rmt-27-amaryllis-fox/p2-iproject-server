# PLAN T API Documentation

## Endpoints :

List of available endpoints:

 
- `POST /register`
- `POST /login`
- `GET /plan`
- `GET /plan/:id`
- `get /orderItem`
- `POST /orderItem/:id`
- `DELETE /orderItem/:id`
- `PUT /orderItem/:id`
- `POST /order`
- `PATCH /orderItem/:id`
- `GET /payment/:id`
- `GET /order/:id`



&nbsp;

## 1. POST /register

Description:
- Add new User to Database

Request:
- body
```json
{
  "username":"string",
  "email":"string",
  "password":"string",
  "location":"string",
  "address":"string"
}
```

_Response (201 - OK)_

```json
{
    "id": 3,
    "username": "rose",
    "email": "rose@blackpink.com",
    "password": "string",
    "address": "Daegu",
    "updatedAt": "2022-08-23T05:12:22.428Z",
    "createdAt": "2022-08-23T05:12:22.428Z"
}
```
_Response (400 - Error Validation)_

```json
{
  "message": "email can not be empty"
}
or
{
  "message": "Format Email wrong"
}
or
{
  "message": "username can not be empty"
}
or
{
  "message": "Password must be number"
}
or
{
  "message": "Min 5 Characters"
}

```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 2. POST /login

Request:
- body
```json
{
  "email":"string",
  "password":"string",
}
```

_Response (201 - OK)_

```json
{
    "access_token":"string"
}
```
_Response (401 - Unautorize)_

```json
{
  "message": "Please Login First"
}
```
_Response (401 - JsonWebTokenError)_

```json
{
  "message": "invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 3. GET /plan

Description:
-Get all plan from Database (including Product)

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "PLAN EASY VINES PREMIUM",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet felis non justo pharetra, in convallis nisl fermentum. Curabitur et tellus nec",
        "price": 200000,
        "createdAt": "2022-09-14T17:48:01.153Z",
        "updatedAt": "2022-09-14T17:48:01.153Z",
        "Products": [
            {
                "id": 16,
                "name": "Marble Queen Pothos",
                "image_url": "https://cdn.shopify.com/s/files/1/0260/3037/4957/products/medium-plant-marble-queen-dovegrey-pot.jpg?v=1649449778",
                "createdAt": "2022-09-14T17:48:01.126Z",
                "updatedAt": "2022-09-14T17:48:01.126Z",
                "PlanItem": {
                    "ProductId": 16,
                    "PlanId": 1,
                    "createdAt": "2022-09-14T17:48:01.160Z",
                    "updatedAt": "2022-09-14T17:48:01.160Z"
                }
            },
            {
                "id": 18,
                "name": "TERRACOTTA POT 15CM",
                "image_url": "https://www.ikea.com/sg/en/images/products/brunbaer-plant-pot-with-saucer-outdoor-terracotta__1033770_pe840269_s5.jpg",
                "createdAt": "2022-09-14T17:48:01.126Z",
                "updatedAt": "2022-09-14T17:48:01.126Z",
                "PlanItem": {
                    "ProductId": 18,
                    "PlanId": 1,
                    "createdAt": "2022-09-14T17:48:01.160Z",
                    "updatedAt": "2022-09-14T17:48:01.160Z"
                }
            },
            {
                "id": 23,
                "name": "MEDIUM PEAT MOSS 1LT",
                "image_url": "https://www.familyhandyman.com/wp-content/uploads/2021/10/GettyImages-153148943-e1634131030665.jpg?fit=700,1024",
                "createdAt": "2022-09-14T17:48:01.126Z",
                "updatedAt": "2022-09-14T17:48:01.126Z",
                "PlanItem": {
                    "ProductId": 23,
                    "PlanId": 1,
                    "createdAt": "2022-09-14T17:48:01.160Z",
                    "updatedAt": "2022-09-14T17:48:01.160Z"
                }
            }
        ]
    },
    ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 4. GET /plan/:id

Description: 
- Get plan from Database

_Response (201 - Created)_

```json
{
    "id": 2,
    "name": "PLAN EASY VINES",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet felis non justo pharetra, in convallis nisl fermentum. Curabitur et tellus nec",
    "price": 100000,
    "createdAt": "2022-09-14T17:48:01.153Z",
    "updatedAt": "2022-09-14T17:48:01.153Z",
    "Products": [
        {
            "id": 17,
            "name": "Golden Pothos",
            "image_url": "https://cdn.shopify.com/s/files/1/0260/3037/4957/products/medium-plant-marble-queen-dovegrey-pot.jpg?v=1649449778",
            "createdAt": "2022-09-14T17:48:01.126Z",
            "updatedAt": "2022-09-14T17:48:01.126Z",
            "PlanItem": {
                "ProductId": 17,
                "PlanId": 2,
                "createdAt": "2022-09-14T17:48:01.160Z",
                "updatedAt": "2022-09-14T17:48:01.160Z"
            }
        },
        {
            "id": 18,
            "name": "TERRACOTTA POT 15CM",
            "image_url": "https://www.ikea.com/sg/en/images/products/brunbaer-plant-pot-with-saucer-outdoor-terracotta__1033770_pe840269_s5.jpg",
            "createdAt": "2022-09-14T17:48:01.126Z",
            "updatedAt": "2022-09-14T17:48:01.126Z",
            "PlanItem": {
                "ProductId": 18,
                "PlanId": 2,
                "createdAt": "2022-09-14T17:48:01.160Z",
                "updatedAt": "2022-09-14T17:48:01.160Z"
            }
        },
        {
            "id": 23,
            "name": "MEDIUM PEAT MOSS 1LT",
            "image_url": "https://www.familyhandyman.com/wp-content/uploads/2021/10/GettyImages-153148943-e1634131030665.jpg?fit=700,1024",
            "createdAt": "2022-09-14T17:48:01.126Z",
            "updatedAt": "2022-09-14T17:48:01.126Z",
            "PlanItem": {
                "ProductId": 23,
                "PlanId": 2,
                "createdAt": "2022-09-14T17:48:01.160Z",
                "updatedAt": "2022-09-14T17:48:01.160Z"
            }
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 5. GET /orderItem

Description:
- Get MyPlan Data with CustomerId as per user login

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "OrderId": null,
        "CustomerId": 1,
        "PlanId": 1,
        "quantity": 1,
        "priceSum": 200000,
        "createdAt": "2022-09-14T17:49:28.620Z",
        "updatedAt": "2022-09-14T17:49:28.620Z",
        "Plan": {
            "id": 1,
            "name": "PLAN EASY VINES PREMIUM",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet felis non justo pharetra, in convallis nisl fermentum. Curabitur et tellus nec",
            "price": 200000,
            "createdAt": "2022-09-14T17:48:01.153Z",
            "updatedAt": "2022-09-14T17:48:01.153Z"
        }
    },
    {
        "OrderId": null,
        "CustomerId": 1,
        "PlanId": 22,
        "quantity": 1,
        "priceSum": 50000,
        "createdAt": "2022-09-14T17:49:36.629Z",
        "updatedAt": "2022-09-14T17:49:36.629Z",
        "Plan": {
            "id": 22,
            "name": "PLAN-T ONLY Golden Pothos",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet felis non justo pharetra, in convallis nisl fermentum. Curabitur et tellus nec",
            "price": 50000,
            "createdAt": "2022-09-14T17:48:01.169Z",
            "updatedAt": "2022-09-14T17:48:01.169Z"
        }
    }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}

```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;


## 6. POST orderItem/:id
Description:
- Add Plan to MyPlan

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "OrderId": null,
    "PlanId": 3,
    "CustomerId": 1,
    "quantity": 1,
    "priceSum": 100000,
    "updatedAt": "2022-09-14T18:46:56.239Z",
    "createdAt": "2022-09-14T18:46:56.239Z"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Data Not Fond"
}

```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;


## 7. DELETE orderItem/:id
Description: DELETE PLAN FROM MyPlan

Request:
- header
```json
{
  "idToken": "google_token"
}
```

_Response (201 - OK)_

{
    "OrderId": null,
    "PlanId": 3,
    "CustomerId": 1,
    "quantity": 1,
    "priceSum": 100000,
    "updatedAt": "2022-09-14T18:46:56.239Z",
    "createdAt": "2022-09-14T18:46:56.239Z"
}

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 8. PUT /orderItem/:id

Description:
- Change quantity selected plan in myplan Database

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "data": [
        1
    ]
}
```

_Response (401 - Unautorize)_

```json
{
  "message": "Please Login First"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 9. POST /order

Description:
- Checkout all MyPlan to produce invoice

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json


```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 10. PATCH /orderItem/:id

Description:
- Change the field OrderId (previously null if havent checkout yet to be fill wit the id of the table order)

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
    "data": [
        1
    ],
    ...
}
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 11. GET /payment/:id

Description:
- Get all token from payment gateway midtrans 

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "token_payment": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;

## 12. GET /order/:id

Description:
- GET SPECIFIED DATA FROM TABLE ORDER TO MAKE PAGE INVOICE

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "CustomerId": 1,
    "totalPrice": 250000,
    "createdAt": "2022-09-14T17:57:51.101Z",
    "updatedAt": "2022-09-14T17:57:51.101Z",
    "Customer": {
        "id": 1,
        "username": "Rapunzel",
        "email": "rapunzel@castel.com",
        "password": "$2a$08$znNofJqPcgEkyRa.YGwqN.SlipAD4T1WOZfOgDVJyRBEdzY8Ycanm",
        "address": "kastil disney",
        "createdAt": "2022-09-14T17:49:09.912Z",
        "updatedAt": "2022-09-14T17:49:09.913Z"
    },
    "OrderItems": [
        ...
    ],
    "Plans": [
        ...
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```
&nbsp;


Description:
- Delete selected wishlist (with wishlist id as per request params) from Database. Allowed only when the user is login, and the deleted row's value of key 'CustomerId' is match with payload customer from access token. **Only Allowed to visitor that already login**

Request:
- Headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "CustomerId":1,
  "TransportationiD": 1
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Data Not Fond"
}

```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}

```

&nbsp;



```txt
link deploy:
URL DEPLOY SERVER : "https://transport-app-rmt27inez.herokuapp.com"

URL DEPLOY CLIENT : "https://transportapp-360416.web.app/"
```