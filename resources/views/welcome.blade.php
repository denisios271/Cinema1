@extends('layouts.app')

@if (isset($title))
    @section('head-title', $title)
@endif

@if (isset($description))
    @section('head-description', $description)
@endif

@if (isset($keywords))
    @section('head-keywords', is_array($keywords) ? implode(', ', $keywords) : $keywords)
@endif

@section('content')
@endsection