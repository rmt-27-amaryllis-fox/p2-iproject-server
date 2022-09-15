# MidTrans

MidTrans is an automated payment services that accepts various payment methods. This project uses MidTrans to enable users make a fake transaction.

## API Key

### server side:

```
SERVER_KEY = "VT-server-xxxxxxxxxxx"
```

### client side:

```
CLIENT_KEY = ""SB-Mid-client-xxxxxxx"
```

## Request

request used in this project are as follow:
```js
{
    transaction_details: {
        order_id: `${new Date().valueOf()}`,
        gross_amount: integer,
    },
    credit_card: {
        secure: true,
    },
    item_details: {
        id: integer,
        name: string,
        quantity: 1,
        price: integer
    },
    customer_details: {
        email,
    },
};
```

## response

```js
{
    "transactionToken": "8ddd8e69-c51e-461b-aa86-xxxxxx",
    "redirectUrl": "https://app.sandbox.midtrans.com/snap/v2/vtweb/8ddd8e69-c51e-461b-aa86-xxxxxx"
}
```

# metmuseum

metmuseum is a 3rd party API provided by The Metropolitan Museum of Art, New York. It has a vast collection ranging from prehistoric to modern art. We are able to use GET endpoint to access the database. Endpoints used in this project are as follows:


## GET objectIDs /search?hasImages=true&q=${name} 

* request
```js
name = "van gogh" | "da vinci" | "rembrandt" | "cezanne" | "vermeer"

{
    method: "GET",
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${name}`
}
```

* response (200) - OK
```js
{
    "total": 38,
    "objectIDs": [
        436535,
        436528,
        436532,
        459123,
        459193,
        336327,
        749639,
        437097,
        438816,
        436121,
        437835,
        .
        .
        .
    ]
}
  
```

# GET images /objects/${id}`

* request
```js
//this method is repeated using iteration in order to generate a maximum of 6 images at a time

{
    method: "GET",
    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
}
```

* response (200)-OK 

```js
{
    "objectID": 36535,
    "isHighlight": false,
    "accessionNumber": "JP56",
    "accessionYear": "1914",
    "isPublicDomain": true,
    "primaryImage": "https://images.metmuseum.org/CRDImages/as/original/DP123730.jpg",
    "primaryImageSmall": "https://images.metmuseum.org/CRDImages/as/web-large/DP123730.jpg",
    "additionalImages": [],
    "constituents": [
        {
            "constituentID": 164764,
            "role": "Artist",
            "name": "Utagawa Hiroshige",
            "constituentULAN_URL": "http://vocab.getty.edu/page/ulan/500019641",
            "constituentWikidata_URL": "
            .
            .
            .
            .
```

# Global Error

## Response

***500 - Internal Server Error***
```js
"message": "internal server error!!"
```