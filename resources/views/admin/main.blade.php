@extends('layouts.admin')

@section('admin-page')
    <div class="row">
        <div class="col">
            <h4>Туториалы:</h4>
            <div id="accordion-tutorials" role="tablist">

                @foreach(\App\Admin_tutorial::where('type', 'tutorial')->orderBy('id', 'desc')->get() as $item)
                <div class="card mb-2">
                    <div class="card-header" role="tab" id="heading-{{ $item->id }}">
                        <h5 class="mb-0">
                            <a data-toggle="collapse" href="#collapse-{{ $item->id }}" aria-expanded="false" aria-controls="collapse-{{ $item->id }}">
                                {!! $item->title !!}
                            </a>
                        </h5>
                    </div>

                    <div id="collapse-{{ $item->id }}" class="collapse" role="tabpanel" aria-labelledby="heading-{{ $item->id }}" data-parent="#accordion-tutorials">
                        <div class="card-body">
                            {!! $item->message !!}
                        </div>
                    </div>
                </div>
                @endforeach

            </div>
        </div>
        <div class="col">
            <h4>Новости:</h4>
            <div id="accordion-news" role="tablist">

                @foreach(\App\Admin_tutorial::where('type', 'news')->orderBy('id', 'desc')->get() as $item)
                <div class="card mb-2">
                    <div class="card-header" role="tab" id="heading-{{ $item->id }}">
                        <h5 class="mb-0">
                            <a data-toggle="collapse" href="#collapse-{{ $item->id }}" aria-expanded="false" aria-controls="collapse-{{ $item->id }}">
                                {!! $item->title !!}
                            </a>
                        </h5>
                    </div>

                    <div id="collapse-{{ $item->id }}" class="collapse" role="tabpanel" aria-labelledby="heading-{{ $item->id }}" data-parent="#accordion-news">
                        <div class="card-body">
                            {!! $item->message !!}
                        </div>
                    </div>
                </div>
                @endforeach

            </div>
        </div>
    </div>
@endsection