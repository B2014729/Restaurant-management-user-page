<template>
    <div class="menu">
        <div class="row h-100 me-0">
            <div class="col-md-3 col-12 d-flex justify-content-end align-items-center">
                <h3>
                    <a href="#home">
                        Beach Restaurant
                    </a>
                </h3>
            </div>
            <div class="col-md-9 col-12 d-flex justify-content-end">
                <ul class="h-100 d-flex align-items-center">
                    <a href="#home">
                        <li> <i class="fa-solid fa-house me-1"></i> HOME</li>
                    </a>
                    <a href="#about">
                        <li> ABOUT</li>
                    </a>
                    <a href="#menu">
                        <li>MENU</li>
                    </a>
                    <a href="#reservation">
                        <li>RESERVATIONS</li>
                    </a>
                    <a href="#location">
                        <li>LOCATION</li>
                    </a>
                    <a href="#order">
                        <li>ORDER NOW</li>
                    </a>
                </ul>
                <div class="d-flex align-items-center ms-5">
                    <button class="btn btn-outline-warning me-2">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button v-if="!isLogin" class="btn btn-outline-warning" @click="register">
                        Register
                    </button>
                    <p v-else class="mt-3 px-2 text-warning">{{ $store.state.staff.tendangnhap }}</p>

                    <button v-if="!isLogin" class="btn btn-warning mx-2" @click="login">
                        <i class="fa-solid fa-right-to-bracket"></i>
                    </button>
                    <button v-else class="btn btn-outline-warning mx-2" @click="logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isLogin: {
            type: Boolean,
        }
    },

    methods: {
        login() {
            this.$emit('onLogin');
        },

        logout() {
            this.$emit('onLogout');
        },

        register() {
            this.$emit('onRegister');
        }
    },
}
</script>
<style scoped>
.menu {
    height: 80px;
    background-color: rgba(21, 21, 21, 0.799);
}

h3>a {
    color: orange;
    font-style: italic;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}

a {
    text-decoration: none;
}

ul li {
    list-style: none;
    margin: 0px 14px;
    font-weight: bold;
    font-size: 15px;
    color: antiquewhite;
}

ul li:hover {
    color: orange;
}
</style>