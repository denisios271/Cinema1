<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Eloquents\Post;
use App\Eloquents\Type;
use App\Eloquents\Category;
use App\Eloquents\PostsCategories;
use App\Eloquents\FavoritePost;
use App\Http\Controllers\ImageController;
use App\Http\Requests\CreatePostVoteRequest;
use Illuminate\Support\Facades\Auth;
use App\Services\PostVoteService;
use App\Eloquents\PostComment;
use App\Services\PostCommentService;
use App\Http\Requests\CreateCommentForPostRequest;

class PostController extends ResourceController
{
    /**
     * Here will be stored categories.
     * It should works after succesfully changed general information (like adding/editing).
     *
     * @var array Category ids.
     */
    protected $savedCategories = [];

    protected $class = Post::class;

    protected $validationRules = [
        'title' => 'required|string|between:6,150|unique:posts',
        'alt_name' => 'required|string|between:3,40|unique:posts',
        'full_story' => 'required|string|between:16,2000',
        'keywords' => 'required|array|between:1,50',
        'tags' => 'required|array|between:3,80',
        'poster' => 'required|string|between:10,150',
        'trailer' => 'nullable|string|between:10,150',
        'voicers' => 'required|array|between:1,60',
        'translaters' => 'required|array|between:1,20',
        'timers' => 'nullable|array|between:1,20',
        'categories' => 'required|array|between:1,15',
        'has_public_access' => 'boolean',
    ];

    public function __construct()
    {
        $this->relationships = [
            'publisher',
            'series' => function ($query) {
                $query->where('requested_adding', 0);
            },
            'series.type',
            'series.players',
            'series.players.player',
            'categories.category',
        ];
        parent::__construct();
    }

    protected function modifyValidationRules($exludeId)
    {
        $this->validationRules['title'] = 'required|string|between:6,150|unique:posts,title,' . $exludeId;
        $this->validationRules['alt_name'] = 'required|string|between:3,40|unique:posts,alt_name,' . $exludeId;
    }

    protected function beforeSending()
    {
        $this->object->requests++;
        $this->object->save();
        
        $this->object->categories->transform(function ($v) {
            return $v->category;
        });
        $this->object->seriesGroupedByTypes = $this->object->series->groupBy('type_id');
        $seriesTypes = [];
        $this->object->seriesGroupedByTypes = $this->object->series->groupBy(function ($item) use (&$seriesTypes) {
            if (!in_array($item['type_id'], $seriesTypes)) {
                $seriesTypes[] = $item['type_id'];
            }
            return $item['type_id'];
        });
        $this->object->seriesTypes = Type::whereIn('id', $seriesTypes)->get();
    }

    protected function getNotFoundMessage()
    {
        return [
            'error' => 'Нет такого релиза.',
        ];
    }

    /**
     * Returns post via alt_name (uri)
     *
     * @param string $uri
     * @return Post
     */
    public function getByUri($uri)
    {
        return $this->getByField('alt_name', $uri);
    }

    public function getFuture($count = 12)
    {
        $categoryFutureId = Category::where('alt_name', 'announcement')->first()->id;

        if ($count > 24) {
            $count = 24;
        }
        if ($count < 1) {
            $count = 1;
        }
        return Post::whereHas('categories', function ($query) use ($categoryFutureId) {
            $query->where('category_id', $categoryFutureId);
        })->where('requested_adding', 0)->latest()->limit($count)->get();
    }

    public function getNew($count = 12)
    {
        $categoryFutureId = Category::where('alt_name', 'new')->first()->id;

        if ($count > 24) {
            $count = 24;
        }
        if ($count < 1) {
            $count = 1;
        }
        return Post::whereHas('categories', function ($query) use ($categoryFutureId) {
            $query->where('category_id', '!=', $categoryFutureId);
        })->where('requested_adding', 0)->latest()->limit($count)->get();
    }

    public function getPopular($count = 12)
    {
        $categoryFutureId = Category::where('alt_name', 'new')->first()->id;

        if ($count > 24) {
            $count = 24;
        }
        if ($count < 1) {
            $count = 1;
        }
        return Post::whereHas('categories', function ($query) use ($categoryFutureId) {
            $query->where('category_id', '!=', $categoryFutureId);
        })->where('requested_adding', 0)->orderBy('requests', 'DESC')->limit($count)->get();
    }

    /**
     * Returns random post
     *
     * @return Post
     */
    public function getRandom()
    {
        $this->object = Post::where('requested_adding', 0)->inRandomOrder()->first();
        return $this->successfulResponse();
    }

    protected function beforeInserting()
    {
        $this->object->publisher = \Auth::user()->id;
        $this->prepareData();
    }
    
    protected function beforeUpdating()
    {
        $this->object->publisher = \Auth::user()->id;
        $this->prepareData();
    }

    protected function afterInserting()
    {
        $this->updateCategories();
        $this->fixImage();
    }

    protected function afterUpdating()
    {
        $this->updateCategories();
        $this->fixImage();
    }

    protected function afterRemoving()
    {
        PostsCategories::where('post_id', $this->object->id)->delete();
    }
    
    protected function fixImage()
    {
        if (strpos($this->object->poster, '://') === false) {
            return;
        }
        $imageName = ImageController::download($this->object->poster);
        $this->object->poster = ImageController::IMAGE_PATH . $imageName;
        $this->object->save();
    }

    protected function updateCategories()
    {
        PostsCategories::where('post_id', $this->object->id)->delete();
        foreach ($this->categories as $categoryId) {
            if (Category::find($categoryId)) {
                $pc = new PostsCategories;
                $pc->post_id = $this->object->id;
                $pc->category_id = $categoryId;
                $pc->save();
            }
        }
    }
    
    protected function prepareData()
    {
        if (isset($this->object->categories)) {
            $this->categories = $this->object->categories;
            unset($this->object->categories);
        }
        if (is_array($this->object->keywords)) {
            $this->object->keywords = implode(', ', $this->object->keywords);
        }
        if (is_array($this->object->tags)) {
            $this->object->tags = implode(', ', $this->object->tags);
        }
        if (is_array($this->object->voicers)) {
            $this->object->voicers = implode(', ', $this->object->voicers);
        }
        if (is_array($this->object->translaters)) {
            $this->object->translaters = implode(', ', $this->object->translaters);
        }
        if (is_array($this->object->timers)) {
            $this->object->timers = implode(', ', $this->object->timers);
        }
    }

    public function addToFavorite(Request $request)
    {
        $data = $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
        ]);
        $uId = \Auth::user()->id;

        if (FavoritePost::where('post_id', $data['post_id'])->where('user_id', $uId)->first()) {
            abort(400, 'Релиз уже в избранном');
        }

        return FavoritePost::create([
            'post_id' => $data['post_id'],
            'user_id' => $uId,
        ]);
    }

    public function removeFromFavorite(Request $request)
    {
        $data = $request->validate([
            'post_id' => 'required|integer|exists:posts,id'
        ]);
        $uId = \Auth::user()->id;

        $favorite = FavoritePost::where('post_id', $data['post_id'])->where('user_id', $uId)->first();
        if (!$favorite) {
            abort(404, 'Релиз не в избранном');
        }

        $favorite->delete();
        
        return response()->json([
            'status' => 'removed',
        ], 200);
    }

    public function getFavorites()
    {
        return \Auth::user()->favoritePosts()->with('post')->get();
    }

    public function createVote(CreatePostVoteRequest $request)
    {
        return PostVoteService::voteFor(Auth::user(), Post::find($request->post_id), $request->vote);
    }

    public function getActiveVotes()
    {
        return Auth::user()->votes()->whereIsOld(false)->get();
    }

    public function loadComments($postId)
    {
        return Post::findOrFail($postId)->comments()->latest()->paginate(20);
    }

    public function comment(CreateCommentForPostRequest $request)
    {
        $user = Auth::user();
        $post = Post::find($request->post_id);
        abort_if(
            !PostCommentService::canUserComment($user, $post),
            400,
            'Подождите 5 минут перед добавлением комментария'
        );
        return PostCommentService::comment($user, $post, $request->body);
    }
}
