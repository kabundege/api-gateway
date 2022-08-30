# Description

API documentation for UAM - API Gateway( Signup & Verification ) microservice 


## Installation

> Run
-  Yarn or npm install
-  touch .env

```env

DB_URL = XXXXXXXXXXXXXXXXX
MONGO_USERNAME = XXXXXXXXX
MONGO_PASSWORD = XXXXXXXXX
MONGO_URL =  XXXXXXXXXXXXX
JWT_SECRET = XXXXXXXXXXXXX
EMAIL = XXXXXXXXXXXXXXXXXX
PASSWORD = XXXXXXXXXXXXXXX

```

## Quick find

### Gateway

- [API_Gateway Welcome Route](#1)

### Main

- [Main Welcome Route](#2)

- [Enrollment verification](#3)
### 

- [Enrollment verification](#3)

## Endpoints

### 1. Api Gateway ~ ( Home Route )

Endpoint

```text
/
```
Response:

```json
{
  "status": 200,
  "message": "Welcome to API Gateway",
}
```
### 2. Main api ~ ( Home Route )

Endpoint

```text
/uam
```
Response:

```json
{
  "status": 200,
  "message": "Welcome to main service",
}
```
### 3. Enrollment api ~ ( Home Route )

Endpoint

```text
/enroll
```
Response:

```json
{
  "status": 200,
  "message": "Welcome to enrollment microservice",
}
```
