# TravelWeather API

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`

&nbsp;

## 1. POST /weathers

Description
- Get weather data from array of coordinates

Request:

- body:

```json
{
  "coord":[
      {
          "lat": -7.01737,
          "lng": 110.44277
      },
      {
          "lat": -7.08463,
          "lng": 110.43038
      },
      {
          "lat": -7.17426,
          "lng": 110.433
      },
      {
          "lat": -7.24302,
          "lng": 110.44961
      },
      {
          "lat": -7.28931,
          "lng": 110.46491
      },
      {
          "lat": -7.33063,
          "lng": 110.50841
      }
  ]
}
```

_Response (200 - OK)_

```json
[
    {
        "coord": {
            "lon": 110.5075,
            "lat": -7.3272
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 26.18,
            "feels_like": 26.18,
            "temp_min": 25.15,
            "temp_max": 26.18,
            "pressure": 1014,
            "humidity": 57,
            "sea_level": 1014,
            "grnd_level": 948
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.54,
            "deg": 148,
            "gust": 3.69
        },
        "clouds": {
            "all": 81
        },
        "dt": 1663211044,
        "sys": {
            "type": 2,
            "id": 2076575,
            "country": "ID",
            "sunrise": 1663194706,
            "sunset": 1663238113
        },
        "timezone": 25200,
        "id": 1629131,
        "name": "Salatiga",
        "cod": 200
    },
    {
        "coord": {
            "lon": 110.5321,
            "lat": -7.3437
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 25.94,
            "feels_like": 26.1,
            "temp_min": 24.92,
            "temp_max": 25.94,
            "pressure": 1014,
            "humidity": 58,
            "sea_level": 1014,
            "grnd_level": 944
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.75,
            "deg": 154,
            "gust": 3.81
        },
        "clouds": {
            "all": 80
        },
        "dt": 1663211453,
        "sys": {
            "type": 2,
            "id": 2076575,
            "country": "ID",
            "sunrise": 1663194700,
            "sunset": 1663238106
        },
        "timezone": 25200,
        "id": 1629131,
        "name": "Salatiga",
        "cod": 200
    },
    {
        "coord": {
            "lon": 110.4633,
            "lat": -7.258
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 26.66,
            "feels_like": 26.66,
            "temp_min": 25.63,
            "temp_max": 26.66,
            "pressure": 1014,
            "humidity": 53,
            "sea_level": 1014,
            "grnd_level": 956
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.24,
            "deg": 139,
            "gust": 3.43
        },
        "clouds": {
            "all": 80
        },
        "dt": 1663211453,
        "sys": {
            "type": 2,
            "id": 2076575,
            "country": "ID",
            "sunrise": 1663194716,
            "sunset": 1663238124
        },
        "timezone": 25200,
        "id": 1651555,
        "name": "Ambarawa",
        "cod": 200
    },
    {
        "coord": {
            "lon": 110.4234,
            "lat": -7.1666
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 25.76,
            "feels_like": 25.8,
            "temp_min": 25.76,
            "temp_max": 26.78,
            "pressure": 1013,
            "humidity": 54,
            "sea_level": 1013,
            "grnd_level": 957
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.03,
            "deg": 138,
            "gust": 3.4
        },
        "clouds": {
            "all": 81
        },
        "dt": 1663211453,
        "sys": {
            "type": 1,
            "id": 9362,
            "country": "ID",
            "sunrise": 1663194724,
            "sunset": 1663238135
        },
        "timezone": 25200,
        "id": 1622636,
        "name": "Ungaran",
        "cod": 200
    },
    {
        "coord": {
            "lon": 110.4359,
            "lat": -7.0741
        },
        "weather": [
            {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 28.12,
            "feels_like": 30.9,
            "temp_min": 28.12,
            "temp_max": 29.14,
            "pressure": 1012,
            "humidity": 70
        },
        "visibility": 7000,
        "wind": {
            "speed": 2.57,
            "deg": 360
        },
        "clouds": {
            "all": 20
        },
        "dt": 1663211453,
        "sys": {
            "type": 1,
            "id": 9362,
            "country": "ID",
            "sunrise": 1663194720,
            "sunset": 1663238133
        },
        "timezone": 25200,
        "id": 1622636,
        "name": "Ungaran",
        "cod": 200
    },
    {
        "coord": {
            "lon": 110.4424,
            "lat": -7.0178
        },
        "weather": [
            {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 28.8,
            "feels_like": 32.3,
            "temp_min": 28.8,
            "temp_max": 29.82,
            "pressure": 1012,
            "humidity": 70
        },
        "visibility": 7000,
        "wind": {
            "speed": 2.57,
            "deg": 360
        },
        "clouds": {
            "all": 20
        },
        "dt": 1663211453,
        "sys": {
            "type": 1,
            "id": 9362,
            "country": "ID",
            "sunrise": 1663194717,
            "sunset": 1663238132
        },
        "timezone": 25200,
        "id": 1627896,
        "name": "Semarang",
        "cod": 200
    },
    {
        "coord": {
            "lon": 110.4383,
            "lat": -7.0052
        },
        "weather": [
            {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 28.96,
            "feels_like": 32.64,
            "temp_min": 28.96,
            "temp_max": 29.99,
            "pressure": 1012,
            "humidity": 70
        },
        "visibility": 7000,
        "wind": {
            "speed": 2.57,
            "deg": 360
        },
        "clouds": {
            "all": 20
        },
        "dt": 1663211453,
        "sys": {
            "type": 1,
            "id": 9362,
            "country": "ID",
            "sunrise": 1663194718,
            "sunset": 1663238133
        },
        "timezone": 25200,
        "id": 1627896,
        "name": "Semarang",
        "cod": 200
    }
]
```

_Response (400 - Bad Request)_

```json
{
    "message": "Coordinate needs to be an array!"
}
OR
{
    "message": "Coordinate required!"
}
```

&nbsp;

## 2. POST /forecasts

Description
- Get forecasts data from array of coordinates

Request:

- body:

```json
{
  "coord":[
      {
          "lat": -7.01737,
          "lng": 110.44277
      },
      {
          "lat": -7.08463,
          "lng": 110.43038
      },
      {
          "lat": -7.17426,
          "lng": 110.433
      },
      {
          "lat": -7.24302,
          "lng": 110.44961
      },
      {
          "lat": -7.28931,
          "lng": 110.46491
      },
      {
          "lat": -7.33063,
          "lng": 110.50841
      }
  ]
}
```

_Response (200 - OK)_

```json
[
  {
    "cod": "200",
    "message": 0,
    "cnt": 16,
    "list": [
        {
            "dt": 1663221600,
            "main": {
                "temp": 26.98,
                "feels_like": 27.78,
                "temp_min": 26.98,
                "temp_max": 28.57,
                "pressure": 1013,
                "sea_level": 1013,
                "grnd_level": 945,
                "humidity": 56,
                "temp_kf": -1.59
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 71
            },
            "wind": {
                "speed": 2.94,
                "deg": 145,
                "gust": 2.8
            },
            "visibility": 10000,
            "pop": 0.3,
            "rain": {
                "3h": 0.64
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-09-15 06:00:00"
        }, ...
      ],
      "city": {
          "id": 1629131,
          "name": "Salatiga",
          "coord": {
              "lat": -7.3306,
              "lon": 110.5084
          },
          "country": "ID",
          "population": 172645,
          "timezone": 25200,
          "sunrise": 1663194706,
          "sunset": 1663238112
      }
  }, ...
]
```

_Response (400 - Bad Request)_

```json
{
    "message": "Coordinate needs to be an array!"
}
OR
{
    "message": "Coordinate required!"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```