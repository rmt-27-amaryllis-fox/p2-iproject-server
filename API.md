## endpoint

```
- POST ("/register")
- POST ("/login")
- GET ("/services")
- GET ("/category")
- POST ("/services")
- PATCH ("/services/:id")
- GET ("/myHistory")
```

## 1 POST ("/register")

- response(200), apabila berhasil register

```
{
    "id": 6,
    "email": "trial2@gmail.com"
}
```

- response(400), apabila gagal resgister karena email sudah terdaftar
```
{
    "message": "email was registered"
}
```

## 2 POST ("/login")
- response(200), apabila berhasil login

```
{
    "access_token": "string",
    "name": "sites",
    "role": "customer"
}
```

- response(400), apabila gagal login
```
{
    "message": "invalid email/password"
}
```

## 3 GET ("/services")
- response(200), apabila berhasil mengambil semua service

```
[
    {
        "id": 2,
        "UserId": 1,
        "status": "Booked",
        "ServiceDate": "2022-09-14T10:48:49.114Z",
        "CategoryId": 3,
        "createdAt": "2022-09-14T02:13:44.856Z",
        "updatedAt": "2022-09-14T02:13:44.856Z",
        "Category": {
            "id": 3,
            "name": "Folding Bike",
            "price": 30000,
            "createdAt": "2022-09-14T02:09:52.365Z",
            "updatedAt": "2022-09-14T02:09:52.365Z"
        }
    },
    ...
]
```

## 4 GET ("/category")
- response(200), apabila berhasil mendapatkan category

```
[
    {
        "id": 1,
        "name": "BMX",
        "price": 25000,
        "createdAt": "2022-09-14T02:09:52.365Z",
        "updatedAt": "2022-09-14T02:09:52.365Z"
    },
    ...
]
```

## 5 POST ("/services")
- request 
```
headers :{
    access_token: "string"
},

```
- response(200), apabila berhasil menambahkan data

```
{
    "id": 10,
    "UserId": 1,
    "status": "Booked",
    "ServiceDate": "2022-09-16T07:00:00.000Z",
    "CategoryId": 5,
    "updatedAt": "2022-09-15T02:48:56.262Z",
    "createdAt": "2022-09-15T02:48:56.262Z"
}
```

## 6 PATCH ("/services/:id")
- request 
```
headers :{
    access_token: "string"
},

```

- response(200), apabila berhasil menambahkan data

```
{
    "message": "You're bicycle has done become to awesome"
}
```

- response(401), apabila gagal melakukan edit data
```
{
    "message": "don't have authorization"
}
```

## 7 GET ("/myHistory")
- request 
```
headers :{
    access_token: "string"
},

```
- response(200), apabila berhasil mendapatkan history

```
[
    {
        "id": 2,
        "UserId": 1,
        "status": "Booked",
        "ServiceDate": "2022-09-14T10:48:49.114Z",
        "CategoryId": 3,
        "createdAt": "2022-09-14T02:13:44.856Z",
        "updatedAt": "2022-09-14T02:13:44.856Z",
        "Category": {
            "id": 3,
            "name": "Folding Bike",
            "price": 30000,
            "createdAt": "2022-09-14T02:09:52.365Z",
            "updatedAt": "2022-09-14T02:09:52.365Z"
        }
    },
]
```

## Global Error
- response(500), global error
```
{
    "message": "ISE"
}
```