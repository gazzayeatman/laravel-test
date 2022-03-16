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
                <a href="#" class="navbar__link">
                    Customers
                </a>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link">
                    Workers
                </a>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link">
                    Sites
                </a>
            </li>
            <li class="navbar__item">
                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                    {{ Auth::user()->name }}
                </a>

                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="{{ route('logout') }}"
                        onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                    </a>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </li>
        @endguest
    </ul>
</nav>
