@extends('layouts.app')

@section('content')
@include('topbar')

<div class = "container">

    <div class="row">
        <div class="col"></div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-6">

            <div class="card mt-4">

                <div class="card-body">
                    <h4 class="card-title">Сброс пароля</h4>
                    <div class="card-text">
                        <form class="form-horizontal" method="POST" action="{{ route('password.request') }}">
                            {{ csrf_field() }}

                            <input type="hidden" name="token" value="{{ $token }}">

                            <div class="form-group">
                                <label for="email">Введите свою почту</label>

                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email or old('email') }}" required autofocus aria-describedby="emailHelp">

                                @if ($errors->has('email'))
                                    <div class="invalid-feedback">
                                        {{ $errors->first('email') }}
                                    </div>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="password" class="control-label">Введите новый пароль</label>

                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required aria-describedby="passwordHelp">

                                @if ($errors->has('password'))
                                    <div class="invalid-feedback">
                                        {{ $errors->first('password') }}
                                    </div>
                                @endif
                            </div>

                            <div class="form-group">
                                <label for="password-confirm" class="control-label">Подтвердите новый пароль</label>
                                <input id="password-confirm" type="password" class="form-control{{ $errors->has('password_confirmation') ? ' is-invalid' : '' }}" name="password_confirmation" required aria-describedby="passwordConfirmationHelp">

                                @if ($errors->has('password_confirmation'))
                                    <div class="invalid-feedback">
                                        {{ $errors->first('password_confirmation') }}
                                    </div>
                                @endif
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">
                                    Обновить пароль
                                </button>
                            </div>
                        </form>
                    </div><!-- .card-text -->
                </div><!-- .card-body -->

            </div><!-- .card -->
        
        </div>
        <div class="col"></div>
    </div>

</div>
@endsection
