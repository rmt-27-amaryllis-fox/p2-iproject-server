# Individual Project API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /employees`
- `POST /employees`
- `PUT /employees/:id`
- `DELETE /employees/:id`
- `GET /employees:id`
- `GET /inventories`
- `POST /inventories`
- `PUT /inventories/:id`
- `DELETE /inventories/:id`
- `GET /inventories/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "role": "string"
}
```

_Response (201 - Created)_

```json
{
  "email": "string",
  "username": "string"
}
```

_Response (201 - Created)_

```json
    akan mendapat email registrasi
```

_Response (400 - Bad Request)_

```json
{
  "message": "email cannot empty!"
}
OR
{
  "message": "email sudah digunakan !"
}
OR
{
  "message": "password cannot empty!"
}
OR
{
  "message": "username cannot empty!"
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

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password !"
}
```

&nbsp;

## 3. GET/employees

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OKE )_

```json
[
    {
        "id": "integer",
        "name": "string",
        "imageUrl": "string",
        "birthDate": "string",
        "status": "string",
        "department": "string",
        "cloudinary_id": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    {
        "id": "integer",
        "name": "string",
        "imageUrl": "string",
        "birthDate": "string",
        "status": "string",
        "department": "string",
        "cloudinary_id": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    ...
]
```

&nbsp;

## 4. POST /employees

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "birthDate": "string",
  "imageUrl": "file",
  "status": "string",
  "department": "string",
  "cloudinary_id": "string"
}
```

_Response (201 - Created)_

```json
{
  "name": "string",
  "birthDate": "string",
  "imageUrl": "string",
  "status": "string",
  "department": "string",
  "cloudinary_id": "string",
  "updatedAt": "string",
  "createdAt": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  {
  "message": "department cannot empty!"
}
OR
{
  "message": "birthDate cannot empty!"
}
OR
{
  "message": "status cannot empty!"
}
OR
{
  "message": "name cannot empty!"
}
}
```

&nbsp;

&nbsp;

# 5. DELETE /employees/:id

Description:

- Delete employees

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
  "cloudinary_id": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": " success deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

&nbsp;

## 6. PUT /employees/:id

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
  "cloudinary_id": "string (required)"
}
```

- body:

```json
{
  "name": "string",
  "birthDate": "string",
  "imageUrl": "string",
  "status": "string",
  "department": "string"
}
```

_Response (200 - Success)_

```json
{
  "message": "succes edited"
}
```

_Response (401 - Unauthorized)_

```json
{
  {
  "message": "department cannot empty!"
}
OR
{
  "message": "birthDate cannot empty!"
}
OR
{
  "message": "status cannot empty!"
}
OR
{
  "message": "name cannot empty!"
}
}
```

&nbsp;

## 7. GET /employees/:id

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

_Response (200 - OKE )_

```json
{
  "id": "integer",
  "name": "string",
  "imageUrl": "string",
  "birthDate": "string",
  "status": "string",
  "department": "string",
  "cloudinary_id": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

&nbsp;

## 8. GET /inventories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OKE )_

```json
{
  "id": "integer",
  "name": "string",
  "image": "string",
  "stock": "integer",
  "CategoryId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
