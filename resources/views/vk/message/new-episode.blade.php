{{ $title }} [FireDub.net]

Смотрите на нашем сайте: {{ $uri }}

Роли озвучивали: {{ implode(', ', $voicers) }}
@if (isset($timers) && count($timers))
Работа со звуком: {{ implode(', ', $timers) }}
@endif
@if (isset($translaters) && count($translaters))
Перевод: {{ implode(', ', $translaters) }}
@endif

{{ implode(' ', array_map(function ($v) { return "#" . $v; }, $hashtags)) }}