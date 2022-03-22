@extends('index')
@section('content')
    <div class="container">
        <div class="form__wrapper">
            <form class="form" method="POST" action="{{ route('login') }}">
                @csrf
                <h1 class="form__title">
                    Login
                </h1>
                <div class="form__input-field">
                    <label class="form__input-label" for="email">
                        Email Address
                    </label>
                    <input id="email" type="email" class="input input--text @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus />
                    @error('email')
                        <span class="input__message input__message--error" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="password">
                        Password
                    </label>
                    <input id="password" type="password" class="input input--text @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                    @error('password')
                        <span class="input__message input__message--error" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form__input-field form__input-field--horizontal">
                    <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    <label for="remember">
                        {{ __('Remember Me') }}
                    </label>
                    
                </div>
                <div class="form__action-panel">
                    <div class="form__action-panel-group">
                        @if (Route::has('password.request'))
                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                    <div class="form__action-panel-group">
                        <button type="submit" class="btn btn-primary">
                            {{ __('Login') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
