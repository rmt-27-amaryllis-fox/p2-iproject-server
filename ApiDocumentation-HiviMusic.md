## Endpoints

List of Available Endpoints:

- `GET /tweets`
- `GET /photos`

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

## 1. GET /tweets

#### Description

- Get the user's tweet based on tweet id

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
