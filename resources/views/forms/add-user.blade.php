@extends('index')
@section('content')
    <div class="container">
        <div class="login-form__wrapper">
            <form class="login-form" method="POST" action="/users/add-user">
                @csrf
                <h1 class="login-form__title">
                    Add user
                </h1>
                <div class="login-form__input-field">
                    <label for="name" class="login-form__input-label">
                        {{ __('Name') }}
                    </label>
                    <input id="name" type="text" class="input input--text @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus />
                    @error('name')
                        <span class="input__message input__message--error" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="login-form__input-field">
                    <label for="email" class="login-form__input-label">
                        {{ __('Email Address') }}
                    </label>
                    <input id="email" type="email" class="input input--text @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" />
                    @error('email')
                        <span class="input__message input__message--error" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="login-form__input-field">
                    <label for="password" class="login-form__input-label">
                        {{ __('Password') }}
                    </label>
                    <input id="password" type="password" class="input input--text @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" />
                    @error('password')
                        <span class="input__message input__message--error" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="login-form__input-field">
                    <label for="password-confirm" class="login-form__input-label">
                        {{ __('Confirm Password') }}
                    </label>
                    <input id="password-confirm" type="password" class="input input--text" name="password_confirmation" required autocomplete="new-password">
                </div>
                <div class="login-form__action-panel login-form__action-panel--right">
                    <div class="login-form__action-panel-group">
                        <button type="submit" class="btn btn-primary">
                            {{ __('Save') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
