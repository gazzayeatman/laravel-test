@extends('index')
@section('content')
    <div class="container">
        <h1>
            Users Dashboard
        </h1>
        <div class="action-panel">
            <a href="/users/add-user" class="btn btn-primary">
                Add User
            </a>
        </div>
        <div class="grid-view__wrapper">
            @foreach($users as $user)
                <div class="grid-view">
                    <div class="grid-view__information">
                        <div class="grid-view__id">
                            {{ $user->id }}
                        </div>
                        <div class="grid-view__column">
                            {{ $user->email }}
                        </div>
                        <div class="grid-view__column">
                            {{ $user->name }}
                        </div>
                    </div>
                    <div class="grid-view__actions">
                        <button class="btn btn-primary">
                            Edit
                        </button>
                        <form action="/users/delete-user/{{ $user->id }}" method="POST">
                            @csrf
                            @method('delete')
                            <button type="submit" class="btn btn-primary btn--danger">
                                Delete
                            </button>
                        </form>
                        
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection