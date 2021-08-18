<?php

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Vk\Service\SendNewEpisode;
use App\Eloquents\TeamMember;
use App\Eloquents\Admin_page;
use App\Eloquents\Admin_tutorial;
use App\Eloquents\FriendsBlock;
use App\Eloquents\Post;
use App\Http\Controllers\ImageController;
use App\Eloquents\Series;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::prefix('auth')->middleware('api')->group(function () {
    // Register Routes
    Route::post('register', 'Auth\RegisterController@register')->name('register');

    // Password Reset Routes...
    Route::prefix('password')->group(function () {
        // Route::post('forgot', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.forgot');
        // Route::get('reset', 'Auth\ResetPasswordController@reset')->name('password.reset');
        // Route::post('reset', 'Auth\ResetPasswordController@register')->name('password.reset.api');

        Route::post('email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    });

    // Logging in Routes
    Route::post('login', 'Auth\LoginController@login')->name('login');
    Route::post('login/vk', 'Auth\SocialNetworks\Vk@auth')->name('login-vk');

    // Logging out Routes
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');

    // Refresh token Routes
    Route::post('refresh', 'Auth\LoginController@refresh')->name('token-refresh');
    
    // Getting user's information Routes
    Route::post('me', 'Auth\LoginController@me')->name('user-info');
});

Route::prefix('category')->group(function () {
    Route::get('all', 'CategoryController@getAll');
    Route::get('id/{id}', 'CategoryController@getById');
    Route::get('alt_name/{uri}', 'CategoryController@getByUri');
    Route::post('/', 'CategoryController@add');
    Route::put('id/{id}', 'CategoryController@edit');
    Route::delete('id/{id}', 'CategoryController@remove');
});

Route::prefix('post')->group(function () {
    Route::get('future/{count?}', 'PostController@getFuture');
    Route::get('new/{count?}', 'PostController@getNew');
    Route::get('popular/{count?}', 'PostController@getPopular');
    Route::get('id/{id}', 'PostController@getById');
    Route::get('alt_name/{uri}', 'PostController@getByUri');
    Route::get('random', 'PostController@getRandom');
    Route::get('requested/adding', 'PostController@getRequestedForAdding');
    Route::get('requested/removing', 'PostController@getRequestedForRemoving');
    Route::get('favorite', 'PostController@getFavorites')->middleware('auth');
    Route::get('active-votes', 'PostController@getActiveVotes')->middleware('auth');
    Route::get('comments/{id}', 'PostController@loadComments');

    Route::post('/', 'PostController@add');
    Route::post('id/{id}/accept/adding', 'PostController@acceptAddingRequest');
    Route::post('id/{id}/decline/removing', 'PostController@declineRemovingRequest');
    Route::post('favorite', 'PostController@addToFavorite')->middleware('auth');
    Route::post('vote', 'PostController@createVote')->middleware('auth');
    Route::post('comment', 'PostController@comment')->middleware('auth');

    Route::put('id/{id}', 'PostController@edit');

    Route::delete('id/{id}', 'PostController@sendRequestForRemoving');
    Route::delete('id/{id}/accept', 'PostController@remove');
    Route::delete('favorite', 'PostController@removeFromFavorite')->middleware('auth');
});

Route::prefix('article')->group(function () {
    Route::get('list/new/{page?}/{perPage?}', 'ArticleController@getNew');
    Route::get('list/popular/{page?}/{perPage?}', 'ArticleController@getPopular');
    Route::get('id/{id}', 'ArticleController@getById');
    Route::get('uri/{uri}', 'ArticleController@getByUri');
    Route::get('requested/adding', 'ArticleController@getRequestedForAdding');
    Route::get('requested/removing', 'ArticleController@getRequestedForRemoving');
    Route::get('favorite', 'ArticleController@getFavorites')->middleware('auth');

    Route::post('/', 'ArticleController@create');
    Route::post('id/{id}/accept/adding', 'ArticleController@acceptAddingRequest');
    Route::post('id/{id}/decline/removing', 'ArticleController@declineRemovingRequest');
    Route::post('favorite', 'ArticleController@addToFavorite')->middleware('auth');
    Route::post('search/{page?}/{per_page?}', 'ArticleController@search');

    Route::put('id/{id}', 'ArticleController@update');

    Route::delete('id/{id}', 'ArticleController@sendRequestForRemoving');
    Route::delete('id/{id}/accept', 'ArticleController@remove');
    Route::delete('favorite', 'ArticleController@removeFromFavorite')->middleware('auth');
});

Route::prefix('series')->group(function () {
    Route::get('id/{id}', 'SeriesController@getById');
    Route::get('requested/adding', 'SeriesController@getRequestedForAdding');
    Route::get('requested/removing', 'SeriesController@getRequestedForRemoving');

    Route::post('/', 'SeriesController@add');
    Route::post('id/{id}/accept/adding', 'SeriesController@acceptAddingRequest');
    Route::post('id/{id}/decline/removing', 'SeriesController@declineRemovingRequest');

    Route::put('id/{id}', 'SeriesController@edit');

    Route::delete('id/{id}', 'SeriesController@sendRequestForRemoving');
    Route::delete('id/{id}/accept', 'SeriesController@remove');
});

Route::prefix('search')->group(function () {
    Route::get('category/{alt_name}/{page?}/{per_page?}', 'SearchController@searchPostsByCategory');
    Route::get('name/{title}/{page?}/{per_page?}', 'SearchController@searchPostsByTitle');
});

Route::get('team', function () {
    $aboutText = '
        <p>FireDub – это уютный некоммерческий проект озвучания ваших любимых мультфильмов, аниме, дорам и сериалов.</p>
        <p>Мы – команда! Мы смело смотрим в жизнь и стремимся к своей мечте. Наша мечта – это проект FireDub, звучащий для вас со всех высот этого прекрасного и огромного мира.</p>
        <p>Хочешь быть на шаг впереди? Хочешь знать о выходе новых любимых серий и получать качественный контент? Тогда, добро пожаловать в нашу дружную семью!</p>
        <center>
        <p><h3>Здесь вы всегда найдете тепло и понимание.</h3></p>
        <p><h2>Проект FireDub – Наши голоса согреют вас теплом огня.</h2></p>
        </center>';
    $members = TeamMember::orderBy('order', 'desc')->orderBy('id')->get();

    $members = $members->map(function ($member, $i) {
        $allLinks = collect(explode('||', $member->links))->map(function ($link, $linkNumber) {
            $splitedLink = explode('|', $link);
            return (object) [
                'title' => $splitedLink[0],
                'uri' => $splitedLink[1],
            ];
        });
        $member->links = $allLinks;
        return $member;
    });
    
    return [
        'about' => $aboutText,
        'team' => $members,
    ];
});

Route::get('friends', function () {
    return FriendsBlock::with('data')->get();
});

Route::prefix('admin')->middleware(['api', 'requiredUserRight:3'])->group(function () {
    Route::get('menu', 'AdminController@getMenu');
    Route::get('series-information', 'SeriesInformationController@all');
    Route::get('tutorials', 'AdminController@getTutorials');
    Route::post('mute-user/{minutes?}', 'AdminController@muteUser');
    Route::post('unmute-user', 'AdminController@unmuteUser');
});

Route::get('admin/logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

Route::prefix('issue')->group(function () {
    Route::post('website', 'Issue@website');
});

Route::get('download/all/images', function () {
    $posts = Post::where('poster', 'like', '%://%')->get();
    $posts->each(function ($post) {
        $imageName = ImageController::download($post->poster);
        $post->poster = ImageController::IMAGE_PATH . $imageName;
        $post->save();
    });
    return $posts->map(function ($post) {
        return $post->title;
    });
});

// Route::get('vk/message', function (Request $r) {
//     SendNewEpisode::toUsers($r, Series::find(7537));
// });

Route::get('vk/wall/episode/{episodeId}', function (Request $r, $episodeId) {
    $episode = Series::findOrFail($episodeId);
    SendNewEpisode::toGroupWall($r, $episode);
})->middleware('vkAccessToken');

Route::prefix('blackjack')->group(function () {
    Route::prefix('games')->namespace('Games')->group(function () {
        Route::get('current', 'BlackJackController@getCurrentGame');
        Route::post('/', 'BlackJackController@createAndStartGame');
        Route::post('{gameId}/hit', 'BlackJackController@hit');
        Route::post('{gameId}/stand', 'BlackJackController@stand');
    });
});
