<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::prefix('password')->group(function () {
        Route::get('reset', function () {
            return redirect('/profile');
        })->name('password.request');
        Route::post('email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
        Route::get('reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
        Route::post('reset', 'Auth\ResetPasswordController@reset');
    });
});

Route::get("/", 'PageController@homePage');
Route::get("/post/{alt_name}", 'PageController@postPage')->name('post');
Route::get("/category/{value}/{page_num?}", 'PageController@postsByCategoryPage')->name('category');
Route::get("/search/{value}/{page_num?}", 'PageController@postsByNamePage')->name('search');
Route::get("/profile", 'PageController@profilePage')->name('profile');
Route::get("/about", 'PageController@aboutPage')->name('about');
Route::get("/catalog", 'PageController@catalogPage')->name('catalog');
Route::get("/articles", 'PageController@articlesPage')->name('articles');
Route::get("/article/{uri}", 'PageController@articlePage')->name('article');

Route::prefix("analytic")->group(function () {
    Route::get('/', 'AnalyticController@menu');
    Route::get('serials-by-years', 'AnalyticController@serialsByYears');
    Route::get('serials-with-many-types', 'AnalyticController@serialsWithManyTypes');
    Route::get("players/{urlPart?}", "AnalyticController@players");
    Route::get('incorrect-uris', 'AnalyticController@incorrectUris');
    Route::get('fix-incorrect-uris', 'AnalyticController@fixIncorrectUris');
    Route::get('incorrect-episode-names', 'AnalyticController@incorrectEpisodeNames');
    Route::get('fix-incorrect-episode-names', 'AnalyticController@fixIncorrectEpisodeNames');
    Route::prefix('registered-users')->group(function () {
        Route::get('daily', 'AnalyticController@registeredUsersDaily');
        Route::get('monthly', 'AnalyticController@registeredUsersMonthly');
        Route::get('yearly', 'AnalyticController@registeredUsersYearly');
    });
    Route::get('releases-with-watchers-count', 'AnalyticController@releasesWithWatchersCount');
});

Route::get("sitemap/generate", 'Seo\Sitemap@generate');

Route::get('generate', 'GenerateInterfaces@generate');

Route::get('privacy-policy/web', function () {
    return view('privacy-policy.general');
});

Route::get('privacy-policy/ios', function () {
    return view('privacy-policy.general');
});

Route::get('privacy-policy/android', function () {
    return view('privacy-policy.general');
});

Route::get('sitemap.xml', 'Seo\Sitemap@get');

Route::any('{all}', function () {
    return view('welcome');
})->where('all', '.*');
