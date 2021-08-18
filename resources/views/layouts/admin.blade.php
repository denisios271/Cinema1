@extends('layouts.app')

@section('content')
@include('topbar')
<div class = "container-fluid">
    <div class = "row">
        <main class = "col bg-light">
            <div class = "row">
                <aside class = "col">
                    <div class="list-group">
                    @foreach(\App\Admin_page::where('parent_id', null)->where('is_hidden', 0)->get() as $adminPage)
                        <?php
                        $childs = \App\Admin_page::where('parent_id', $adminPage->id)->where('is_hidden', 0)->get();
                        ?>
                        @if ($childs->count())
                            <div class="list-group-item dropdown">
                                <a href="" id="dropdownMenuButton-{{ $adminPage->id }}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{ $adminPage->title }} (Dropdown)
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    @foreach($childs as $child)
                                        <a class="dropdown-item" href="{{ $child->uri }}?token={{ config('token') }}">{{ $child->title }}</a>
                                    @endforeach
                                </div>
                            </div>
                        @else
                            <a href="{{ $adminPage->uri }}?token={{ config('token') }}" class="list-group-item">
                                {{ $adminPage->title }}
                            </a>
                        @endif
                    @endforeach
                    </div>
                </aside>
                <div class = "col-xs-12 col-sm-12 col-md-9 bg-light">
                    @yield('admin-page')
                </div>
            </div>
        </main>
    </div>
</div>
@include('footer.block')
@endsection
