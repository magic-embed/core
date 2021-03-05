# db

Repository to hold all migrations and seeds for the database.

## Migrations

### Create a Migration

```bash
npm run create:migration --name=<name-of-the-migration>
```

## Running a migration

If running the migration library in local, remember to `export` or set as an `ENV` variable `DB_CONNECTION_STRING` in the following format -> `postgres://<user>:<password>@<host>:381/<database>`.

### Up

#### Run all migrations

```bash
npm run up
```

#### Run a single migration
```bash
npm run up:single --name=<migration_name>
```

### Down

#### Rollback all migrations

```bash
npm run down
```

#### Rollback a single migration
```bash
npm run down:single --name=<migration_name>
```

## Seeds

### Create a seed

```bash
npm run create:seed --name=<seed_name>
```

### Execute all seeds

```bash
npm run seed:up
```

### Execute a single seed

```bash
npm run seed:up --name=[seed_file.ts]
```
