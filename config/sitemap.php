<?php

use GuzzleHttp\RequestOptions;
use Spatie\Sitemap\Crawler\Profile;

return [


    // 'default' => [
    //     'url' => config('http://127.0.0.1:8000/generate-sitemap'), // Base URL for your sitemap
    //     'use_cache' => true, // Whether to use cache for the sitemap
    //     'cache_key' => 'laravel-sitemap', // Cache key
    //     'cache_duration' => 3600, // Cache duration in seconds
    // ],

    'guzzle_options' => [
        RequestOptions::COOKIES => true,
        RequestOptions::CONNECT_TIMEOUT => 10,
        RequestOptions::TIMEOUT => 10,
        RequestOptions::ALLOW_REDIRECTS => false,
    ],

    'execute_javascript' => false,
    'chrome_binary_path' => '',
    'crawl_profile' => Profile::class,



    // 'groups' => [
    //     'posts' => [
    //         'urls' => [
    //             '/dashboard', // Assuming 'dashboard' is a route or URL
    //             // Add more URLs as needed
    //         ],
    //     ],

    //     // Add more groups as needed
    // ],

];
