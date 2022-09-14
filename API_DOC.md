# CRYPTOVERSE IPROJECT

## ENDPOINTS

### User endpoint
- POST /user/register
- POST /user/login

### Coin endpoint
- GET /coin/coins
- GET /coin/coin/:uuid
- GET /coin/rupiah

### Wallet endpoint
- POST /wallet/:uuid
- GET /wallet

# User Endpoint

## POST /users/register

`Description` : 

Creating a new user

`Request` : 
- Body : 
```json
{
    "username"      : "string",
    "email"         : "string",
    "password"      : "string",
}
```

`Response` : 

- 201 (Created)
```json
{
    "message": "Success created new user with id ${id}",
    "data": {
        "id": "integer",
        "email": "string",
        "username": "string"
    }
}
```

- 400 (Bad Request)
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email should be in email format !"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Please create a password that is more than 5 but less than 16 characters !"
}
```

## POST /users/login

`Request`:
- Body : 
```json
{
    "email"     : "string",
    "password"  : "string"
}
```

`Response`:

- 200 (OK)
```json
{
    "access_token": "string"
}
```

- 401 (Unauthorized)
```json
{
   "message": "Invalid email / password"
}
```

# Coin Endpoint

## GET /coin/coins

`Description` : 
- Get all coins from 3rd party API (CoinRanking API -> https://developers.coinranking.com/api/documentation)

`Request`: 
- Headers : 
```json
{
    "x-access-token": "API_KEY"
}
```
- Query 
```json
{
    "page" : "integer"
}
```

`Response` : 

- 200 (OK)
```json
[
    {
        "uuid": "Qwsogvtv82FCd",
        "symbol": "BTC",
        "name": "Bitcoin",
        "color": "#f7931A",
        "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
        "marketCap": "382038209145",
        "price": "19949.040476359674",
        "listedAt": 1330214400,
        "tier": 1,
        "change": "-1.62",
        "rank": 1,
        "sparkline": [
            "20246.895124319253",
            "20131.20970264565",
            "20203.460391661993",
            "20172.24634445825",
            "20225.235100509643",
            "20335.651834132404",
            "20385.46895252552",
            "20342.476103705303",
            "20363.614741281173",
            "20316.871952163034",
            "20279.14225142611",
            "20252.701114867046",
            "20355.994968778767",
            "20354.44812145049",
            "20344.62510044496",
            "20249.2071200032",
            "20262.288661222392",
            "20302.838196452332",
            "20241.660351887775",
            "20251.881588642722",
            "20191.37077428065",
            "20183.059765449263",
            "19997.257029218774",
            "19840.789425370935",
            "19926.97795085789"
        ],
        "lowVolume": false,
        "coinrankingUrl": "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc",
        "24hVolume": "43527693818",
        "btcPrice": "1"
    },
    {
        "uuid": "razxDUgYGNAdQ",
        "symbol": "ETH",
        "name": "Ethereum",
        "color": "#3C3C3D",
        "iconUrl": "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
        "marketCap": "195108658977",
        "price": "1599.20698737778",
        "listedAt": 1438905600,
        "tier": 1,
        "change": "-1.26",
        "rank": 2,
        "sparkline": [
            "1606.7407609451586",
            "1591.3382011557126",
            "1582.0826534522496",
            "1571.565503603286",
            "1573.1866367997538",
            "1585.020688658507",
            "1599.6145215851668",
            "1602.2525968566633",
            "1618.2698096579409",
            "1614.393655362907",
            "1611.9668831637246",
            "1603.0108582311234",
            "1601.7659335800183",
            "1602.4381040923822",
            "1601.1374689236745",
            "1597.4889398684338",
            "1601.360987509179",
            "1603.4842236346572",
            "1598.538466637171",
            "1598.2066970176966",
            "1592.0777371225188",
            "1593.282203439969",
            "1587.7034297016935",
            "1583.0320414781354",
            "1595.2047457925096"
        ],
        "lowVolume": false,
        "coinrankingUrl": "https://coinranking.com/coin/razxDUgYGNAdQ+ethereum-eth",
        "24hVolume": "20885781073",
        "btcPrice": "0.08016460687785447"
    },
    ...
]

```

## GET /coin/coin/:uuid

`Description`:

Get a specific data of coin based on given uuid (unique id possessed by each coins)

`Request`:
- Headers : 
```json
{
    "x-access-token": "API_KEY"
}
```
- Params
```json
{
    "uuid" : "string"
}
```

`Response`:
- 200 (OK)
```json
{
    {
    "coin": {
        "uuid": "Qwsogvtv82FCd",
        "symbol": "BTC",
        "name": "Bitcoin",
        "description": "<p>Bitcoin is the first digital currency that allows users to send and receive money, without the interference of a central bank or government. Instead, a network of thousands of peers is controlling the transactions; a decentralized system.</p>\n\n<h3>Why does bitcoin have value?</h3>\n\n<p>Bitcoin&rsquo;s useful qualities (decentralized, borderless, secure) aren&rsquo;t the only reason the coin is worth so much. Due to its scarcity (and it&rsquo;s hard to produce), Bitcoin is often nicknamed &lsquo;Digital Gold&rsquo;, in reference to &lsquo;classic&rsquo; physical gold. Like gold, Bitcoin also has a finite supply of coins available; there will only ever be 21 million bitcoin. And now you know why the creation of new bitcoins is also called mining.</p>\n\n<h3>No inflation in bitcoin</h3>\n\n<p>Bitcoin was invented in response to a few concerns the inventor(s) had, such as inflation. Its supply is limited, so one cannot just devalue the currency by printing more, as governments often do with fiat currencies (USD, EUR, etc.).</p>\n\n<p>As people look for alternative places to keep their money rather than losing value in a negative interest rate account, Bitcoin becomes more appealing. Big global companies, such as Tesla and MicroStrategy already purchased serious amounts of Bitcoin. And it&#39;s only a matter of time that other companies will follow. This also ensures that the value remains or continues to increase.</p>\n\n<h3>Who built Bitcoin</h3>\n\n<p>In 2008, Bitcoin was invented by an anonymous person or group named Satoshi Nakamoto. In 2009, Bitcoin was released as open-source software. Nakamoto&rsquo;s real identity is still unknown, although there are many theories about who it might be. Decentralization is one of Bitcoin&rsquo;s most important principles, and that&rsquo;s why this anonymity is perfectly in line.</p>\n\n<h3>The technology of Bitcoin</h3>\n\n<p>The Bitcoin blockchain is a database, the so-called &lsquo;ledger&rsquo;, that consists of bitcoin transaction records. For new transactions to be added to the ledger, the nodes must agree that the transaction is real and valid. The blockchain is public and contains records of all the transactions taking place.</p>\n\n<h3>How to buy bitcoin?</h3>\n\n<p>Continue reading <a href=\"https://coinranking.com/blog/how-to-buy-your-first-bitcoin/\" rel=\"nofollow noopener\" target=\"_blank\">this blog article</a> on how to buy your first bitcoin.</p>\n",
        "color": "#f7931A",
        "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
        "websiteUrl": "https://bitcoin.org",
        "links": [
            {
                "name": "bitcoin.org",
                "type": "website",
                "url": "https://bitcoin.org"
            },
            {
                "name": "bitcoinmagazine.com",
                "url": "https://bitcoinmagazine.com/",
                "type": "website"
            },
            {
                "name": "bitcointalk.org",
                "url": "https://bitcointalk.org/",
                "type": "bitcointalk"
            },
            {
                "name": "blockchain.com",
                "url": "https://www.blockchain.com/explorer",
                "type": "explorer"
            },
            {
                "name": "bitcoin/bitcoin",
                "url": "https://github.com/bitcoin/bitcoin",
                "type": "github"
            },
            {
                "name": "r/bitcoin",
                "url": "https://www.reddit.com/r/bitcoin/",
                "type": "reddit"
            },
            {
                "name": "Bitcoin_Magazine",
                "url": "https://t.me/Bitcoin_Magazine",
                "type": "telegram"
            },
            {
                "name": "bitcoin",
                "url": "https://t.me/bitcoin",
                "type": "telegram"
            },
            {
                "name": "Bitcoin Whitepaper",
                "url": "https://bitcoin.org/bitcoin.pdf",
                "type": "whitepaper"
            }
        ],
        "supply": {
            "confirmed": true,
            "supplyAt": 1663146840,
            "max": "21000000",
            "total": "19150281",
            "circulating": "19150281"
        },
        "numberOfMarkets": 5151,
        "numberOfExchanges": 153,
        "24hVolume": "50859916742",
        "marketCap": "389522583430",
        "fullyDilutedMarketCap": "427146434667",
        "price": "20340.306412721933",
        "btcPrice": "1",
        "priceAt": 1663146780,
        "change": "-8.68",
        "rank": 1,
        "sparkline": [
            "22368.24682592273",
            "22483.913549998742",
            "22586.923172737923",
            "22031.183470549433",
            "21374.446104876442",
            "21125.169059464693",
            "20901.330141716073",
            "20787.57092766873",
            "20799.734408214503",
            "20575.837916849454",
            "20253.087447007143",
            "20277.939042439037",
            "20151.323514274023",
            "20181.62581302773",
            "20184.74086169838",
            "20174.627269705576",
            "20245.478487023473",
            "20353.698543956085",
            "20384.74768899778",
            "20342.19683563623",
            "20361.394868027808",
            "20328.581934084745",
            "20290.293095276847",
            "20251.731507888184",
            "20314.93035358289"
        ],
        "allTimeHigh": {
            "price": "68763.41083248306",
            "timestamp": 1636502400
        },
        "coinrankingUrl": "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc",
        "tier": 1,
        "lowVolume": false,
        "listedAt": 1330214400
    }
}
}
```

- 404 (Not Found)
```json
{
    "message" : "Data not found"
}
```

## GET /coin/rupiah

`Description`:

Get the current convert value of idr from usd by 3rd party api (ExchangeRate API -> https://www.exchangerate-api.com/docs/overview )

`Request`:
- Headers: 
```json
{
    "Authorization" : "Bearer EXCHANGE_API"
}
```

`Response`:
- 200 (OK)
```json
{
    "curs": "float"
}
```

# Wallet Endpoint

## POST /wallet/:uuid

`Description`:

Buy a coin and add it to the wallet (integrate with 3rd party : coin ranking and exchangerate api)

`Request`:
- Headers 
```json
{
    "access_token" : "string",
    "Authorization" : "Bearer EXCHANGE_API",
    "x-access-token": "API_KEY"
}
```

- Params
```json
{
    "uuid" : "string"
}
```

- Query
```json
{
    "quantity" : "integer"
}
```

`Response`:
- 201 (Created)
```json
{
    "message": "Successfully added asset to wallet !",
    "addAsset": {
        "id": 22,
        "UserId": 2,
        "uuid": "Qwsogvtv82FCd",
        "name": "Bitcoin",
        "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
        "price": 295367840,
        "quantity": 1,
        "updatedAt": "2022-09-14T19:44:59.749Z",
        "createdAt": "2022-09-14T19:44:59.749Z"
    }
}
```

- 400 (Bad Request)
```json
{
  "message": "UserId is required"
}
OR
{
  "message": "UUID is required"
}
OR
{
  "message": "Coin Name is required"
}
OR
{
  "message": "Icon URL is required"
}
OR
{
  "message": "Coin Price is required"
}
OR
{
  "message": "Coin quantity is required"
}
```
## GET /wallet

`Description`:

Get all the assets stored inside the wallet based on logged user 

`Request`:
- Headers: 
```json
{
    "access_token": "string"
}
```

`Response`:
- 200 (OK)
```json
[
    {
        "id": 1,
        "UserId": 2,
        "uuid": "Qwsogvtv82FCd",
        "name": "Bitcoin",
        "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
        "price": 20183,
        "quantity": 2,
        "createdAt": "2022-09-14T00:47:41.879Z",
        "updatedAt": "2022-09-14T00:47:41.879Z"
    },
    {
        "id": 3,
        "UserId": 2,
        "uuid": "razxDUgYGNAdQ",
        "name": "Ethereum",
        "iconUrl": "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
        "price": 1597,
        "quantity": 4,
        "createdAt": "2022-09-14T15:34:57.185Z",
        "updatedAt": "2022-09-14T15:34:57.185Z"
    },
    ...
]
```

