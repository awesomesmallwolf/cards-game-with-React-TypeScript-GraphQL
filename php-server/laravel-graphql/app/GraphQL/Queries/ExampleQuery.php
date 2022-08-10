<?php

namespace App\GraphQL\Queries;

class ExampleQuery {

    public function __construct()
    {

    }

    public function helloWorld($_, array $args)
    {

        return 'Hello World';

    }

}
