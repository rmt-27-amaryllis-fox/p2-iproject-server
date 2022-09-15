# WeatherNow

This is a social application which allow user to share their weather update on their city location. User also can read information about their current city information.

List of API's used in this app:

- Openweather API
  API used to get current weather based on user city location or device location (lon and lat). This API needs API key to access.
- Country Flags API
  Get a country's flag via the country's name.
- MediaWiki API
  Get user city information, based on wikipedia database.

## Endpoints

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /users/profile`
- `PUT /users/editprofile`
- `POST /posts`
- `GET /posts`
- `GET /posts/:id`

### POST /users/register

#### Description

- Register new user

#### Request

- Body

  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "location": String,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "id": Integer,
    "username": String,
    "email": String,
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Username is required"
  }
  OR
  {
    "message": "Email is required"
  }
  OR
  {
    "message": "Password is required"
  }
  OR
  {
    "message": "Location is required"
  }
  OR
  {
    "message": "Email must be unique"
  }
  OR
  {
    "message": "Username must be unique"
  }
  OR
  {
    "message": "Invalid email format"
  }
  ```

### POST /users/login

#### Description

- User login based on username and encoded password in database
- Generate access token for user authentication

- Body

  ```json
  {
    "username": String,
    "password": String,
  }
  ```

#### Response

- Body

  ```json
  {
    "access token": String,
    "loggedInUsername": String,
    "profilePicture": String,
  }
  ```

### GET /users/profile

#### Description

- Get user data, including all user post
- Using authorization, only allows current user to access their own profile data

### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    [
      {
        "id": Integer,
        "username": String,
        "email": String,
        "profilePicture": String,
        "description": Text,
        "location": String,
        "createdAt": Date,
        "updatedAt": Date,
        "Posts": {
          "id": Integer,
          "imageUrl": String,
          "caption": String,
          "weatherMain": String,
          "weatherDescription": String,
          "weaterIcon": String,
          "country": String,
          "location": String,
          "UserId": Integer,
          "createdAt": Date,
          "updatedAt": Date,
        },
        ...
      }
    ]
  }
  ```

  _404 - Not Found_

- Body

  ```json
  {
    "message": "User not found"
  }
  ```

### PUT /users/editprofile

#### Description

- Update existing user data
- Using authorization, only allows current user to access their own profile data

### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "User data updated"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "message": "User not found"
  }
  ```

### POST /posts

#### Description

- Add new post

### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

- Body

  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "location": String,
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "imageUrl": String,
    "caption": String,
    "weatherMain": String,
    "weatherDescription": String,
    "weaterIcon": String,
    "country": String,
    "location": String,
    "UserId": Integer,
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Image URL is required"
  }
  OR
  {
    "message": "Main weather is required"
  }
  OR
  {
    "message": "Weather description is required"
  }
  OR
  {
    "message": "Weather icon is required"
  }
  OR
  {
    "message": "Country is required"
  }
  OR
  {
    "message": "Location is required"
  }
  OR
  {
    "message": "User ID is required"
  }
  ```

### GET /posts

#### Description

- Get post from all user

### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  [
    {
      "id": Integer,
      "imageUrl": String,
      "caption": String,
      "weatherMain": String,
      "weatherDescription": String,
      "weaterIcon": String,
      "country": String,
      "location": String,
      "UserId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "User": {
        "username": String,
        "profilePicture": String
      }
    },
    ...
  ]
  ```

### GET /posts?:id

#### Description

- Get user post based on post id

### Request

- Headers

  ```json
  {
    "access_token": String
  }
  ```

  #### Response

_200 - OK_

- Body

  ```json
  {
    "id": Integer,
    "imageUrl": String,
    "caption": String,
    "weatherMain": String,
    "weatherDescription": String,
    "weaterIcon": String,
    "country": String,
    "location": String,
    "UserId": Integer,
    "createdAt": Date,
    "updatedAt": Date,
    "User": {
      "username": String,
      "profilePicture": String
    }
  },
  ```

_404 - Not Found_

- Body

  ```json
  {
    "message": "Post not found"
  }
  ```

### Global Error

#### Response

_400 - SequelizeValidationError_ OR _400 - SequelizeUniqueConstraintError_

- Body
  ```json
  {
    "message": "Username is required"
  }
  OR
  {
    "message": "Email is required"
  }
  OR
  {
    "message": "Password is required"
  }
  OR
  {
    "message": "Location is required"
  }
  OR
  {
    "message": "Email must be unique"
  }
  OR
  {
    "message": "Username must be unique"
  }
  ```

_401 - Invalid username/password_

- Body
  ```json
  {
    "message": "Invalid username/password"
  }
  ```

_401 - JsonWebTokenError_ OR _401 - Invalid token_

- Body
  ```json
  {
    "message": "Invalid token"
  }
  ```

_403 - Unauthorized_

- Body
  ```json
  {
    "message": "Unauthorized activity"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
