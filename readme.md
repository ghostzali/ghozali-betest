# ms-ghozali-betest

Beckend Test to build Microservice

## author

Akhmad Ghozali Amrulloh

## Features

### Issue Token

```curl
curl --location --request GET 'http://localhost:3000/issue-token' \
--header 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM0'
```

### User CRUD

- Create

```curl
curl --location --request POST 'http://localhost:3030/user' \
--header 'Authorization: Bearer {jwtToken}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "string",
    "accountNumber": "string",
    "emailAddress": "string",
    "identityNumber": "string"
}'
```

- Get by Account Number or Identity Number or both

```curl
curl --location --request GET 'http://localhost:3030/v1/user?accountNumber={optional string}&identityNumber={optional string}' \
--header 'Authorization: Bearer {jwtToken}'
```

- Get by Id

```curl
curl --location --request GET 'http://localhost:3030/user/:userId' \
--header 'Authorization: Bearer {jwtToken}'
```

- Update

```curl
curl --location --request PATCH 'http://localhost:3030/user/:userId' \
--header 'Authorization: Bearer {jwtToken}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "string",
    "accountNumber": "string",
    "emailAddress": "string",
    "identityNumber": "string"
}'
```

- Delete

```curl
curl --location --request DELETE 'http://localhost:3030/user/:userId' \
--header 'Authorization: Bearer {jwtToken}'
```

- List

```curl
curl --location --request GET 'http://localhost:3030/users?keyword={string|empty}' \
--header 'Authorization: Bearer {jwtToken}'
```

### Produce kafka message by event

- User Create
- User Update
- User Delete

## Run project

### Development

- Setup environment variable:
  1. `cp .env.example .env`
  2. edit `.env` file
- Start docker compose: `docker compose up -d`
