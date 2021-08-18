<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Eloquents\Series;
use App\Eloquents\Series_content;
use Carbon\Carbon;
use App\Eloquents\Post;
use App\Eloquents\Category;
use App\Eloquents\Redirect;
use Illuminate\Support\Facades\DB;

class AnalyticController extends Controller
{
    public static function generateUri(string $path)
    {
        $url = url("analytic/{$path}");
        return "<a target='_blank' href='{$url}'>{$url}</a>";
    }

    public function menu()
    {
        return view('analytic.table', [
            'data' => [[
                'title' => 'Список сериалов по годам',
                'uri' => self::generateUri('serials-by-years'),
            ], [
                'title' => 'Список сериалов с несколькими типами серий (тв1, тв2...)',
                'uri' => self::generateUri('serials-with-many-types'),
            ], [
                'title' => 'Неправильные ссылки',
                'uri' => self::generateUri('incorrect-uris'),
            ], [
                'title' => 'Зарегистрированные пользователи по дням',
                'uri' => self::generateUri('registered-users/daily'),
            ], [
                'title' => 'Зарегистрированные пользователи по месяцам',
                'uri' => self::generateUri('registered-users/monthly'),
            ], [
                'title' => 'Зарегистрированные пользователи по годам',
                'uri' => self::generateUri('registered-users/yearly'),
            ], [
                'title' => 'Список серий с неправильными именами',
                'uri' => self::generateUri('incorrect-episode-names'),
            ], [
                'title' => 'Список релизов с частотой просмотров',
                'uri' => self::generateUri('releases-with-watchers-count'),
            ]],
            'keys' => [
                'title',
                'uri',
            ],
        ]);
    }

    public function serialsByYears()
    {
        dd(Post::groupByYears()->map(function ($a) {
            return $a->map(function ($v) {
                return json_decode(json_encode($v));
            })->all();
        })->all());
    }

    public function serialsWithManyTypes()
    {
        dd(Post::get()->filter(function (Post $p) {
            return $p->series->groupBy('type_id')->count() > 1;
        })->map(function ($v) {
            return json_decode(json_encode($v));
        })->all());
    }

    public function players($urlPart = 'sibnet')
    {
        echo 'Searching by: ' . $urlPart;

        $allSeriesWithThePlayer = Series_content::select('seria_id')
            ->where('url', 'like', "%{$urlPart}%")
            ->groupBy('seria_id')
            ->get()
            ->map(function ($v) {
                return $v->seria_id;
            });

        $allSeries = Series::whereNotIn('id', $allSeriesWithThePlayer->all())->get()->unique();
        $allSeries = $allSeries->map(function ($seria) {
            $seria->post_title = $seria->post['title'];
            // $seria->post_title = 'asdasd';
            return $seria;
        });

        return view('analytic.table', [
            'data' => $allSeries,
            'keys' => [
                'id',
                'name',
                'post_id',
                'post_title',
            ],
        ]);

        return null;
    }

    public function incorrectUris()
    {
        $uriRegexp = '^[a-z0-9\-]+$';
        $data = collect([]);

        // incorrect categories
        $data = $data->concat(Category::where('alt_name', 'not REGEXP', $uriRegexp)->get()->map(function (Category $v) {
            return [
                'resource_id' => $v->id,
                'type' => 'category',
                'uri' => "<a href='" . route('category', $v->alt_name, false) . "' target='_blank'>" . route('category', $v->alt_name, false) . "</a>",
            ];
        }));
        
        // incorrect releases
        $data = $data->concat(Post::where('alt_name', 'not REGEXP', $uriRegexp)->get()->map(function (Post $v) {
            return [
                'resource_id' => $v->id,
                'type' => 'post',
                'uri' => "<a href='" . route('post', $v->alt_name, false) . "' target='_blank'>" . route('category', $v->alt_name, false) . "</a>",
            ];
        }));

        $data->push([
            'resource_id' => 'NULL',
            'type' => 'link',
            'uri' => "<a href='/analytic/fix-incorrect-uris' target='_blank'>Fix URIS</a>",
        ]);

        // print results
        return view('analytic.table', [
            'data' => $data,
            'keys' => [
                'resource_id',
                'type',
                'uri',
            ],
        ]);
    }

    public function fixIncorrectUris()
    {
        $uriRegexp = '^[a-z0-9\-]+$';
        $replaceRegexp = '/[^a-z0-9\-]/';
        $data = collect([]);

        // incorrect categories
        $data = $data->concat(Category::where('alt_name', 'not REGEXP', $uriRegexp)->get()->map(function (Category $v) use ($replaceRegexp) {
            $oldUri = route('category', $v->alt_name, false);
            $v->alt_name = preg_replace($replaceRegexp, '-', $v->alt_name);
            $v->save();
            $newUri = route('category', $v->alt_name, false);

            $redirect = new Redirect;
            $redirect->from = $oldUri;
            $redirect->to = $newUri;
            $redirect->save();

            return [
                'resource_id' => $v->id,
                'redirect_id' => $redirect->id,
                'type' => 'category',
                'from' => "<a href='{$oldUri}' target='_blank'>{$oldUri}</a>",
                'to' => "<a href='{$newUri}' target='_blank'>{$newUri}</a>",
            ];
        }));
        
        // incorrect releases
        $data = $data->concat(Post::where('alt_name', 'not REGEXP', $uriRegexp)->get()->map(function (Post $v) use ($replaceRegexp) {
            $oldUri = route('post', $v->alt_name, false);
            $v->alt_name = preg_replace($replaceRegexp, '-', $v->alt_name);
            $v->save();
            $newUri = route('post', $v->alt_name, false);

            $redirect = new Redirect;
            $redirect->from = $oldUri;
            $redirect->to = $newUri;
            $redirect->save();

            return [
                'resource_id' => $v->id,
                'redirect_id' => $redirect->id,
                'type' => 'post',
                'from' => "<a href='{$oldUri}' target='_blank'>{$oldUri}</a>",
                'to' => "<a href='{$newUri}' target='_blank'>{$newUri}</a>",
            ];
        }));

        // print replaced entities
        return view('analytic.table', [
            'data' => $data,
            'keys' => [
                'resource_id',
                'redirect_id',
                'type',
                'from',
                'to',
            ],
        ]);
    }

    public function registeredUsersDaily()
    {
        return $this->printRegisteredUsers(DB::table('users')->select(
            DB::raw('count(*) as cnt, YEAR(created_at) as year, MONTH(created_at) month, DAY(created_at) day')
        )->groupBy('year', 'month', 'day')->orderBy('year', 'desc')->orderBy('month', 'desc')->orderBy('day', 'desc')->get()->map(function ($v) {
            return [
                'date' => $v->year . '/' . $v->month . '/' . $v->day,
                'count' => $v->cnt,
            ];
        }));
    }

    public function registeredUsersMonthly()
    {
        return $this->printRegisteredUsers(DB::table('users')->select(
            DB::raw('count(*) as cnt, YEAR(created_at) as year, MONTH(created_at) month')
        )->groupBy('year', 'month')->orderBy('year', 'desc')->orderBy('month', 'desc')->get()->map(function ($v) {
            return [
                'date' => $v->year . '/' . $v->month,
                'count' => $v->cnt,
            ];
        }));
    }

    public function registeredUsersYearly()
    {
        return $this->printRegisteredUsers(DB::table('users')->select(
            DB::raw('count(*) as cnt, YEAR(created_at) as year')
        )->groupBy('year')->orderBy('year', 'desc')->get()->map(function ($v) {
            return [
                'date' => $v->year,
                'count' => $v->cnt,
            ];
        }));
    }

    public function printRegisteredUsers($data)
    {
        return view('analytic.table', [
            'data' => $data,
            'keys' => [
                'date',
                'count',
            ],
        ]);
    }

    public static function getFixedEpisodeName(string $episodeName)
    {
        $fixedName = $episodeName;
        $fixedNameParts = explode('/', $fixedName);
        $fixedName = $fixedNameParts[count($fixedNameParts) - 1];
        $fixedName = preg_replace([
            "/\d+ (S|s)eason/",
            "/.+ -/",
            "/[^0-9]/",
        ], '', $fixedName);
        $fixedName = (int) $fixedName;
        if (!$fixedName) {
            $fixedName = $episodeName;
        }

        if (strpos($episodeName, 'Спешл') !== false) {
            $fixedName = 'Спешл';
        }
        if (strpos($episodeName, 'OVA') !== false) {
            $fixedName = 'OVA';
        }
        if (strpos($episodeName, 'Фильм') !== false) {
            $fixedName = 'Фильм';
        }

        return $fixedName;
    }

    public static function getEpisodesWithIncorrectName()
    {
        return Series::whereNotIn('name', [
                'OVA',
                'Спешл',
                'Фильм',
            ])->whereRaw('LENGTH(name) > 2')->get();
    }

    public function incorrectEpisodeNames()
    {
        return view('analytic.table', [
            'data' => self::getEpisodesWithIncorrectName()->map(function (Series $e) {
                return [
                    'name' => $e->name,
                    'fixedName' => self::getFixedEpisodeName($e->name),
                ];
            })->push([
                'name' => '',
                'fixedName' => self::generateUri('fix-incorrect-episode-names'),
            ]),
            'keys' => [
                'name',
                'fixedName',
            ],
        ]);
    }

    public function fixIncorrectEpisodeNames()
    {
        self::getEpisodesWithIncorrectName()->each(function (Series $e) {
            $e->name = self::getFixedEpisodeName($e->name);
            $e->save();
        });
        return redirect(self::generateUri('incorrect-episode-names'));
    }

    public function releasesWithWatchersCount()
    {
        return view('analytic.table', [
            'data' => Post::orderBy('requests', 'desc')->get()->map(function (Post $v) {
                return [
                    'id' => $v->id,
                    'title' => $v->title,
                    'requests' => $v->requests,
                    'link' => "<a href='" . route('post', $v->alt_name) . "' target='_blank'>" . route('post', $v->alt_name) . "</a>",
                ];
            }),
            'keys' => [
                'id',
                'title',
                'requests',
                'link',
            ],
        ]);
    }
}
