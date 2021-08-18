<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
	<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>@yield('head-title', config('app.name', 'FireDub.Net'))</title>
    <meta name="description" content="@yield('head-description', 'FireDub.Net - озвучание аниме и дорам онлайн.')"/>
    <meta name="keywords" content="@yield('head-keywords', 'firedub, firedub.net, firedub net, фаердаб, аниме онлайн, скачать аниме бесплатно, аниме сезон, лучшее аниме, смотреть лучшее аниме, аниме 2 сезон, аниме 1 сезон, бесплатное скачать аниме, смотреть аниме онлайн бесплатно отаку, онгоинг')"/>

	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" href="/css/font-awesome.min.css" />
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="{{ asset('css/app.css') }}?t={{ time() }}" rel="stylesheet">
	{{--  <link href="{{ mix('css/app.css') }}?t={{ time() }}" rel="stylesheet">  --}}
</head>

<body>
    <noscript>
        <style>body{background: #000 !important}</style>
        <div class = "container">
            <div class = "row">
                <div class = "col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                    <div class = "alert alert-danger text-center" style = "margin-top: 50%; padding-top: -26px">
                        Пожалуйста, включите поддержку JavaScript для просмотра сайта.
                    </div>
                </div>
            </div>
        </div>
    </noscript>

    @yield('content')

    <div id=app></div>
    <div id="vk_community_messages"></div>

    <script src="{{ asset('js/app.js') }}?t={{ time() }}"></script>
    {{--  <script src="{{ mix('js/app.js') }}?t={{ time() }}"></script>  --}}
    <!-- <script src="//vk.com/js/api/openapi.js" defer></script> -->
    <script src="{{ asset('js/vk_loader.js') }}" defer></script>

    <!-- Google Analytics -->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-92249964-1', 'auto');
        ga('send', 'pageview');
    </script>

</body>

</html>