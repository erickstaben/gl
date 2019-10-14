<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'about' => $faker->sentence(10),
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Article::class, function (Faker\Generator $faker) {

    $title = $faker->sentence;

    return [
        'title' => $title,
        'slug' => str_slug($title),
        'description' => $faker->sentence(15),
        'content' => implode(' ', $faker->paragraphs(2)),
        'published' => true,
        'published_at' => \Carbon\Carbon::now(),
    ];
});

$factory->define(App\Event::class, function (Faker\Generator $faker) {

    return [
        'company_id' => $faker->numberBetween(1,2),
        'user_id' => $faker->numberBetween(1,3),
        'type' => 'atendimento',
        'duration' => $faker->randomDigit(),
        'created_at' => \Carbon\Carbon::now(),
    ];
});
