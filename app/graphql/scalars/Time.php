<?php

namespace App\GraphQL\Scalars;

use Illuminate\Support\Carbon;
use Nuwave\Lighthouse\Schema\Types\Scalars\DateScalar;

class Time extends DateScalar
{
    protected function format(Carbon $carbon): string
    {
        return $carbon->toTimeString();
    }

    protected function parse($value): Carbon
    {
        // @phpstan-ignore-next-line We know the format to be good, so this can never return `false`
        return Carbon::createFromFormat('H:i:s', $value);
    }
}
