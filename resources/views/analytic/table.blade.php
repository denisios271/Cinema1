@extends('layouts.analytic')

@section('content')
<div class="row">
    <div class="col">
        <div class="table-responsive">
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        @foreach($keys as $key)
                            <th scope="col">{{ $key }}</th>
                        @endforeach
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $value)
                        <tr>
                            @foreach($keys as $key)
                                <td>{!! $value[$key] !!}</td>
                            @endforeach
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection