# magic-embed

## Requirements
- NodeJS >= 14
- Postgres 13.4

## Install
To install dependencies by running:
```bash
$ npx lerna bootstrap
$ npx lerna run build
```

## Setup db
You will need to create a database for this project, in order to do so you can run:
```bash
$ psql postgres
$ CREATE DATABASE magic-embed-db;
$ CREATE USER dev WITH PASSWORD 'dev0000';
$ GRANT ALL PRIVILEGES ON DATABASE magic-embed-db TO dev;
$ \q
```

Once you have created a db, you will need to run the migrations:
```bash
$ npx lerna run --scope @magic-embed/db up
```
