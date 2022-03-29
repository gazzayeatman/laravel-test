<template>
    <nav class="navbar__wrapper">
        <ul class="navbar"> 
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
               <router-link class="navbar__link" :to="{ path: '/customers' }">
                    Customers
                </router-link>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link">
                    Workers
                </a>
            </li>
            <li class="navbar__item">
                <router-link class="navbar__link" :to="{ path: '/users' }">
                    Users
                </router-link>
            </li>
            <!-- <li class="navbar__item navbar__item--auth-panel">
                <a class="navbar__link" href="{{ route('logout') }}"
                    onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();
                ">
                    {{ __('Logout') }}
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
            </li> -->
        </ul>
    </nav>
</template>
<script>
</script>
