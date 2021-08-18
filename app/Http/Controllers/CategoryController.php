<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Eloquents\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryController extends ResourceController
{
    protected $class = Category::class;

    protected function getNotFoundMessage()
    {
        return 'Нет такой категории.';
    }

    /**
     * Returns category via alt_name (uri)
     *
     * @param string $uri
     * @return Category
     */
    public function getByUri($uri)
    {
        return $this->getByField('alt_name', $uri);
    }

    public function beforeSending()
    {
        if ($this->object instanceof Collection) {
            $this->object = $this->object->filter(function (Category $c) {
                return $c->posts()->count() > 0;
            })->values();
        }
    }
}
