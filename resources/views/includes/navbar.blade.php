<nav class="navbar__wrapper">
    <ul class="navbar"> 
        @guest
            @if (Route::has('login'))
                <li class="navbar__item">
                    <a class="navbar__link" href="{{ route('login') }}">{{ __('Login') }}</a>
                </li>
            @endif

            @if (Route::has('register'))
                <li class="navbar__item">
                    <a  class="navbar__link" href="{{ route('register') }}">{{ __('Register') }}</a>
                </li>
            @endif
        @else
            <li class="navbar__item">
                <a href="#" class="navbar__link">
                    Calendar
                </a>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link">
                    Trucks
                </a>
            </li>
            <li class="navbar__item">
                <a href="/customers" class="navbar__link">
                    Customers
                </a>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link">
                    Workers
                </a>
            </li>
            <li class="navbar__item">
                <a href="/locations" class="navbar__link">
                    Locations
                </a>
            </li>
            <li class="navbar__item">
                <a href="/users" class="navbar__link">
                    Users
                </a>
            </li>
            <li class="navbar__item navbar__item--auth-panel">
                <a class="navbar__link" href="{{ route('logout') }}"
                    onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();
                ">
                    {{ __('Logout') }}
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
            </li>
        @endguest
    </ul>
</nav>
