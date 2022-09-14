## Endpoints

List of Available Endpoints:

- `GET /tweets`
- `GET /photos`
- `POST /emails`

&nbsp;

## 1. GET /tweets

#### Description

- Get the user's tweet based on tweet id

#### Response

_200 - OK_

- Body

```json
  {
    "data": {
        "data": {
            "id": Sting,
            "text": String
        }
    }
  }
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

## 2. GET /photos

#### Description

- Get photos concert stage from pexels API

#### Response

_200 - OK_

- Body

```json
  {
    "data": Object
  }
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

## 3. POST /emails

#### Description

- Send emails to the band

#### Response

_200 - OK_

- Body

```json
  {
    "message": String
  }
```

_Response (400 - Bad Request)_

```json
{
  "message": "must fill message"
}
```

# Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
