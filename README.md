## API Spec

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `GET /news`
- `GET /tickers`
- `POST /calculators/lumpsum`
- `POST /payments/:packageId`
- `GET /packages`
- `GET /users`
- `GET /watchlists`

### POST /login

#### Description

- Login user

#### Request :

- Method : POST
- Endpoint : `/login`
- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response :

200 - OK

```json
{
  "name": "string",
  "access_token": "string",
  "premium": "integer"
}
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

### POST /register

#### Description

- Register user

#### Request :

- Method : POST
- Endpoint : `/register`
- Body :

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Response :

201 - Created

```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "premium": "integer"
}
```

400 - Bad Request

```json
{
  "message": "string"
}
```

### GET /news

#### Description

- Get trending news

#### Request :

- Method : GET
- Endpoint : `/news`
-

#### Response :

200 - OK

```json
[
  {
    "__typename": "string",
    "id": "integer",
    "headline": "string",
    "shorterHeadline": "string",
    "dateLastPublished": "date",
    "description": "string",
    "pageName": "string",
    "relatedTagsFilteredFormatted": "string",
    "dateFirstPublished": "date",
    "sectionHierarchyFormatted": "string",
    "authorFormatted": "string",
    "shortDateFirstPublished": "date",
    "shortDateLastPublished": "date",
    "url": "string",
    "type": "string",
    "premium": "boolean",
    "promoImage": {
      "__typename": "string",
      "id": "integer",
      "url": "string"
    },
    "featuredMedia": {
      "__typename": "string",
      "url": "string",
      "type": "string"
    },
    "section": {
      "__typename": "string",
      "id": "integer",
      "shortestHeadline": "string",
      "tagName": "string",
      "url": "string",
      "premium": "boolean"
    }
  }
]
```

### GET /tickers

#### Description

- Get company information, financial information, news information by ticker

#### Request :

- Method : GET
- Endpoint : `/tickers`
- Query : ticker="string"

#### Response :

200 - OK

```json
{
  "tickerFinancialInfo": {
    "financials": {
      "cash_flow_statement": {},
      "comprehensive_income": {
        "other_comprehensive_income_loss_attributable_to_parent": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "comprehensive_income_loss": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "other_comprehensive_income_loss": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "comprehensive_income_loss_attributable_to_parent": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        }
      },
      "income_statement": {
        "income_loss_from_continuing_operations_after_tax": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "net_income_loss_available_to_common_stockholders_basic": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "benefits_costs_expenses": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "nonoperating_income_loss": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "income_tax_expense_benefit": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "net_income_loss_attributable_to_noncontrolling_interest": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "operating_income_loss": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "preferred_stock_dividends_and_other_adjustments": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "diluted_earnings_per_share": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "net_income_loss": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "basic_earnings_per_share": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "operating_expenses": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "income_loss_from_continuing_operations_before_tax": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "gross_profit": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "interest_expense_operating": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "net_income_loss_attributable_to_parent": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "cost_of_revenue": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "revenues": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "costs_and_expenses": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        }
      },
      "balance_sheet": {
        "noncurrent_assets": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "fixed_assets": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "other_than_fixed_noncurrent_assets": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "equity_attributable_to_parent": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "equity_attributable_to_noncontrolling_interest": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "current_assets": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "assets": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "liabilities_and_equity": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "liabilities": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "noncurrent_liabilities": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "current_liabilities": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        },
        "equity": {
          "label": "string",
          "value": "integer",
          "unit": "string",
          "order": "integer"
        }
      }
    },
    "start_date": "date",
    "end_date": "date",
    "filing_date": "date",
    "cik": "string",
    "company_name": "string",
    "fiscal_period": "string",
    "fiscal_year": "string",
    "source_filing_url": "string",
    "source_filing_file_url": "string"
  },
  "tickerDetailInfo": {
    "ticker": "string",
    "name": "string",
    "market": "string",
    "locale": "string",
    "primary_exchange": "string",
    "type": "string",
    "active": "boolean",
    "currency_name": "string",
    "cik": "string",
    "composite_figi": "string",
    "share_class_figi": "string",
    "market_cap": "integer",
    "phone_number": "string",
    "address": {
      "address1": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string"
    },
    "description": "string",
    "sic_code": "string",
    "sic_description": "string",
    "ticker_root": "string",
    "homepage_url": "string",
    "total_employees": "integer",
    "list_date": "string",
    "branding": {
      "logo_url": "string",
      "icon_url": "string"
    },
    "share_class_shares_outstanding": "integer",
    "weighted_shares_outstanding": "integer"
  },
  "tickerNews": [
    {
      "id": "string",
      "publisher": {
        "name": "string",
        "homepage_url": "string",
        "logo_url": "string",
        "favicon_url": "string"
      },
      "title": "string",
      "author": "string",
      "published_utc": "date",
      "article_url": "string",
      "tickers": [
        "string",
        "string"
      ],
      "amp_url": "string",
      "image_url": "string",
      "description": "string"
    }
  ]
}
```

400 - Bad Request

```json
{
  "message": "string"
}
```

### POST /calculators/lumpsum

#### Description

- Calculate future value using lumpsum

#### Request :

- Method : POST
- Endpoint : `/calculators/lumpsum`
- Body :

```json
{
  "investmentFund": "integer",
  "period": "integer",
  "annualReturn": "integer"
}
```

200 - OK

```json
{
  "result": "integer"
}
```

### POST /payments/:packageId

#### Description

- Create payment using midtrans

#### Request :

- Method : POST
- Endpoint : `/payments/:packageId`
- Header :
    - access_token : "string"

#### Response :

200 - OK

```json
{
  "transactionToken": "string"
}
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

404 - Not Found

```json
{
  "message": "string"
}
```

### GET /packages

#### Description

- Get all premium packages

#### Request :

- Method : GET
- Endpoint : `/packages`

#### Response :

200 - OK

```json
[
  {
    "id": "integer",
    "name": "string",
    "price": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### GET /users

#### Description

- Get user profile

#### Request :

- Method : GET
- Endpoint : `/users`
- Header :
    - access_token : "string"

#### Response :

200 - OK

```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "premium": "integer"
}
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

### GET /watchlists

#### Description

- Get all watchlists

#### Request :

- Method : GET
- Endpoint : `/watchlists`
- Header :
    - access_token : "string"

#### Response :

200 - OK

```json
[
  {
    "id": "integer",
    "ticker": "string",
    "company": "string",
    "targetPrice": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

401 - Unauthorized

```json
{
  "message": "string"
}
```

### Global Error

#### Response :

500 - Internal Server Error

```json
{
  "error": {
    "message": "Internal Server Error"
  }
}
```