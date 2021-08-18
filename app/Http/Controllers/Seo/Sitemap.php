<?php

namespace App\Http\Controllers\Seo;

// basic
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

// sitemap
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap as PackageSitemap;
use Spatie\Sitemap\Tags\Url;

// models
use App\Eloquents\Post;
use App\Eloquents\Category;
use App\Eloquents\Article;

class Sitemap extends Controller
{
    protected function priority($max, $min, $number, $count)
    {
        $step = ($max - $min) / ($count - 1);
        if (!$number) {
            return $max;
        }
        if ($number == $count - 1) {
            return $min;
        }
        return $max - $number * $step;
    }

    public function get()
    {
        $this->generate();
        header("Content-type: text/xml");
        echo file_get_contents(public_path('sitemap.generated.xml'));
    }

    public function generate()
    {
        // create instance
        $sitemap = PackageSitemap::create();

        // add basic links
        $uris = [
            '/',
            '/articles',
            '/category/anime',
            '/category/drama',
            '/catalog',
            '/about',
            '/profile',
        ];
        foreach ($uris as $uri) {
            $sitemap->add(Url::create(url($uri))
                ->setLastModificationDate(Carbon::yesterday())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)->setPriority(1));
        }
        
        // add all categories
        $categories = Category::where('alt_name', '!=', 'anime')->where('alt_name', '!=', 'drama')->get();
        foreach ($categories as $category) {
            $sitemap->add(Url::create(url("/category/{$category->alt_name}"))
                ->setLastModificationDate(Carbon::parse($category->updated_at))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.9));
        }

        // add all posts
        $posts = Post::orderBy('requests', 'DESC')->orderBy('id', 'DESC')->get();
        foreach ($posts as $i => $post) {
            $sitemap->add(Url::create(url("/post/{$post->alt_name}"))
                ->setLastModificationDate(Carbon::parse($post->updated_at))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority($this->priority(0.8, 0.7, $i, $posts->count())));
        }

        // add all articles
        $articles = Article::orderBy('requests', 'DESC')->orderBy('id', 'DESC')->get();
        foreach ($articles as $i => $article) {
            $sitemap->add(Url::create(url("/article/{$article->uri}"))
                ->setLastModificationDate(Carbon::parse($article->updated_at))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                ->setPriority($this->priority(0.7, 0.6, $i, $posts->count())));
        }

        // save to file
        $sitemap->writeToFile(public_path('sitemap.generated.xml'));

        // show message
        return [
            'status' => 'generated',
            'basicLinks' => count($uris),
            'categories' => $categories->count(),
            'posts' => $posts->count(),
            'articles' => $articles->count(),
        ];
    }
}
