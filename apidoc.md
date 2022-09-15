# EndPoint

```
List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /webHook`
```

# 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "bank": "string"
}
```

_Response (201 - Created)_

```json
{
  "status_code": "201",
  "status_message": "Success, Bank Transfer transaction is created",
  "transaction_id": "bff90a2d-2ac4-47b1-a62b-d96f72bb5707",
  "order_id": "order-agassi.garry123@gmail.com",
  "merchant_id": "G424910317",
  "gross_amount": "50000.00",
  "currency": "IDR",
  "payment_type": "bank_transfer",
  "transaction_time": "2022-09-12 23:10:44",
  "transaction_status": "pending",
  "va_numbers": [
    {
      "bank": "bri",
      "va_number": "103170012345678901"
    }
  ],
  "fraud_status": "accept"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username harus diisi"
}
OR
{
  "message": "Email harus diisi"
}
OR
{
  "message": "password harus diisi"
}
OR
{
  "message": "password panjang minimal 5 maximal 15"
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
  "message": "invalid_email/password"
}
```

## 3. POST /webHook

```
respon di generate oleh webook dan di trigger oleh midtrans
```

link deploy firebase : https://anime-doro.netlify.com
link deploy heroku : https://anime-doro.herokuapp.com
