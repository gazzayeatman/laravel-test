<?php

namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class CustomResolver
{
    function resolveGetDrivers($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
        echo var_dump($rootValue);
        echo var_dump($args);
        echo var_dump($context);
        echo var_dump($resolveInfo);
    }
}
