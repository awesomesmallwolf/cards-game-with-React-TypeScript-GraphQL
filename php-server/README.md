# PHP Laravel GraphQL API

## Docker Commands

### Setup and launch

```shell
cp laravel-graphql/.env.example laravel-graphql/.env
```

```shell
make php-start
```

### Test

```shell
make php-test
```

## Interface

http://localhost:5001/graphql-playground

## Code

### Dependencies

If you have PHP and Composer installed locally, install the packages to enable IDE code hinting.

```shell
cd laravel-graphql
composer install
```

The pre-included dependencies beyond Laravel itself are:

- [Lighthouse](https://lighthouse-php.com)
- [Laravel GraphQL Playground](https://github.com/mll-lab/laravel-graphql-playground)

You are not required to use them.

### Logic

You should define your GraphQL schema here:

[./laravel-graphql/graphql/schema.graphql](laravel-graphql/graphql/schema.graphql)

Your code will live primarily in this directory:

[./laravel-graphql/app](laravel-graphql/app)

GraphQL resolvers live in the [corresponding directory](./laravel-graphql/app/GraphQL). Otherwise, arrange your project as required.

### Tests

Place your PhpUnit tests in the existing directories.

[./laravel-graphql/tests](laravel-graphql/tests)

### PHP Version

The Dockerfile currently pulls PHP 8.0.

### Maintenance (for Uplift team only)

This setup may be regularly updated using `composer update`, and in some cases `npm` as well. See PR #33 for additional details on the setup.

Note the use of `interview@uplift.agency` in [DatabaseSeeder.php](./laravel-graphql/database/seeders/DatabaseSeeder.php)