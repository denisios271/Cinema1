<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Eloquents\Post;
use App\Eloquents\Category;
use App\Eloquents\PostsCategories;
use App\Eloquents\Type;

const DEFAULT_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 12;

class SearchController extends Controller
{
    protected $queryInstance = null;
    protected $page = DEFAULT_PAGE;
    protected $perPage = DEFAULT_ITEMS_PER_PAGE;

    public function searchPostsByCategory($categoryUri, $page = DEFAULT_PAGE, $perPage = DEFAULT_ITEMS_PER_PAGE)
    {
        $this->page = $page;
        $this->perPage = $perPage;
        return $this->getPostsByCategory($categoryUri);
    }
    
    public function searchPostsByTitle($title, $page = DEFAULT_PAGE, $perPage = DEFAULT_ITEMS_PER_PAGE)
    {
        $this->page = $page;
        $this->perPage = $perPage;
        return $this->getPostsByTitle($title);
    }
    
    protected function getPostsByCategory($categoryUri)
    {
        $category = Category::where('alt_name', $categoryUri)->take(1)->first();
        if (!$category) {
            return response("Данной категории не существует", 404);
        }
    
        $postIds = PostsCategories::where('category_id', $category->id)->get()->map(function ($item, $key) {
            return $item->post_id;
        });
        $this->queryInstance = Post::whereIn('id', $postIds);
        
        return $this->getPosts();
    }

    protected function getPostsByTitle($title)
    {
        $this->queryInstance = Post::where('title', 'like', "%{$title}%")   
            ->orWhere('alt_name', 'like', "%{$title}%");
        
        return $this->getPosts();
    }

    protected function getPosts()
    {
        $posts = $this->queryInstance->with(['publisher'])->orderBy('id', 'DESC')
            ->paginate($this->perPage, ['*'], 'page', $this->page);

        if (!$posts) {
            return response("Релизы не найдены", 404);
        }
        return response($posts, 200);
    }
}
