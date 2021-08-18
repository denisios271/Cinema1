<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MovePostExtraFieldsToHashtags extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $fixString = function ($str) {
            $str = utf8_encode($str);
            $str = str_replace(' ', '', $str);
            $str = preg_replace('/[^A-Za-zА-Яа-я0-9]/u', '', $str);
            $str = preg_replace('/^( +)|( +)$/u', '', $str);
            $str = ucfirst(strtolower($str));
            return $str;
        };
        $allPosts = \App\Post::get();
        foreach ($allPosts as $post) {
            $tags = [];
            $tags[] = $post->year;
            $tags[] = $post->type;
            $tags[] = $post->editor;
            $tags[] = $post->manga;
            $tags[] = $post->author;
            $tags[] = $post->roles;
            $tags[] = $post->seriesCount;

            $newTags = [];
            $newLength = 0;
            foreach ($tags as $i => $tag) {
                $newStr = $fixString($tag);
                if ($newStr) {
                    $newLength += strlen($newStr);
                    if ($newLength < 130) {
                        $newTags[] = $newStr;
                    }
                }
            }
            $newTags = array_filter($newTags, function ($v) {
                return strlen($v) > 0;
            });
            $post->tags = implode(',', $newTags);
            $post->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
