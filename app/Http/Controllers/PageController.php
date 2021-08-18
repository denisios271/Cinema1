<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Eloquents\Post;
use App\Eloquents\Category;
use App\Eloquents\Article;

class PageController extends Controller
{
    protected $data = [];

    /**
     * Sets title of the page (head)
     *
     * @param string $title
     * @return void
     */
    protected function title(string $title)
    {
        $this->data['title'] = $title;
    }

    /**
     * Sets keywords of the page (head)
     *
     * @param array $keywords
     * @return void
     */
    protected function keywords(array $keywords)
    {
        $this->data['keywords'] = implode(", ", $keywords);
    }

    /**
     * Sets description of the page (head)
     *
     * @param string $desc
     * @return void
     */
    protected function description(string $desc)
    {
        $this->data['description'] = strlen($desc) > 325 ? substr($desc, 0, 322) . '...' : $desc;
    }
    
    /**
     * Renders page (with sending data inside view)
     *
     * @return view
     */
    protected function render()
    {
        return view('welcome', $this->data);
    }

    /**
     * Renders error (sending view with the http status error code)
     *
     * @param integer $code
     * @return view
     */
    protected function error($code = 404)
    {
        return response()->view('welcome', $this->data, $code);
    }

    /**
     * Renders home page (seo)
     *
     * @return view
     */
    public function homePage()
    {
        $this->title('FireDub.Net - новинки Аниме и Дорам');
        $this->description('Смотреть аниме и дорамы онлайн в хорошем качестве без регистрации');
        return $this->render();
    }

    /**
     * Renders post page (seo)
     *
     * @param string $alt_name
     * @return view
     */
    public function postPage($alt_name)
    {
        $post = Post::where('alt_name', $alt_name)->first();
        if (!$post) {
            return redirect('/', 301);
        }

        if ($post->keywords) {
            $keys = explode(', ', $post->keywords);
            $this->keywords($keys);
        }
        $category = $post->categories()->whereIn('category_id', [2, 3, 4])->first();
        $this->title("{$category->category->name} {$post->title} смотреть онлайн");
        $this->description("Смотреть онлайн {$category->category->name} {$post->title} - {$post->full_story}");
        return $this->render();
    }

    /**
     * Renders posts page (seo)
     *
     * @param string $categoryUri
     * @param integer $page
     * @return view
     */
    public function postsByCategoryPage($categoryUri, $page = 1)
    {
        $category = Category::with('posts')->where('alt_name', $categoryUri)->first();
        if (!$category || !$category->posts->count()) {
            return redirect('/', 301);
        }

        if ($category->parentid) {
            $this->title(
                $page > 1 ?
                "{$category->parent->name} в жанре {$category->name} смотреть онлайн страница {$page}" :
                "{$category->parent->name} в жанре {$category->name} смотреть онлайн"
            );
            $this->description("Смотреть онлайн {$category->parent->name} в жанре {$category->name}");
        } else {
            $this->title(
                $page > 1 ?
                "{$category->name} смотреть онлайн страница {$page}" :
                "{$category->name} смотреть онлайн"
            );
            $this->description("Смотреть онлайн {$category->name}");
        }
        return $this->render();
    }

    /**
     * Renders posts page (seo)
     *
     * @param string $title
     * @param integer $page
     * @return view
     */
    public function postsByNamePage($title, $page = 1)
    {
        $posts = Post::where('title', 'like', "%{$title}%")->orWhere('alt_name', 'like', "%{$title}%");
        if (!$posts) {
            $this->title('Релизы не найдены');
            return $this->error(404);
        }

        $title = [$title];
        if ($page > 1) {
            $title[] = "Страница {$page}";
        } else {
            $title[] = "Поиск";
        }
        $title[] = 'FireDub.Net';
        $title = implode(' - ', $title);
        $this->title($title);
        return $this->render();
    }

    /**
     * Renders profile page (seo)
     *
     * @return view
     */
    public function profilePage()
    {
        $this->title('Личный кабинет');
        return $this->render();
    }

    /**
     * Renders about page (seo)
     *
     * @return view
     */
    public function aboutPage()
    {
        $this->title('О нас - FireDub.Net');
        return $this->render();
    }

    /**
     * Renders catalog page (seo)
     *
     * @return view
     */
    public function catalogPage()
    {
        $this->title('Каталог релизов - FireDub.Net');
        return $this->render();
    }

    /**
     * Renders articles page (seo)
     *
     * @return view
     */
    public function articlesPage()
    {
        $this->title('Статьи - FireDub.Net');
        return $this->render();
    }

    /**
     * Renders article page (seo)
     *
     * @param string $uri
     * @return view
     */
    public function articlePage($uri)
    {
        $article = Article::where('uri', $uri)->first();
        if (!$article) {
            return redirect('/', 301);
        }

        if ($article->hashtags) {
            $keys = explode(', ', $article->hashtags);
            $this->keywords($keys);
        }
        $this->title($article->title);
        $this->description($article->content);
        return $this->render();
    }
}
