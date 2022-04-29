<?php

namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use App\Models\User;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class CustomResolver
{
    function resolveGetDrivers($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
        return User::whereHas(
            'roles', function($q) {
                $q->where('title', 'Worker');
            }
        )->get();
    }
}
