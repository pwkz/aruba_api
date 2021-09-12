# aruba_api

## Installation

Use the npm to install packages

In root directory:

```bash
npm install
```
In the client directory:

```bash
cd client npm install
```

## Creating database:

```bash
node createDatabase.js testDatabase.xlsx <buildingName>
```


## Running database:

```bash
.\neo4j.bat console
```

## Create .env file that contains:

```bash
SERVER_PORT=
DB_USER=neo4j
DB_PASS=mynewpass
DB_URL='neo4j://localhost'
ARUBA_LOGIN={ "userName":"user","password": "password" }

```

## Running server:

```bash
npm start
```

or in dev mode (auto restarting):

```bash
npm run devStart
```

## Running react:

Inside client directory:

```bash
npm start
```

