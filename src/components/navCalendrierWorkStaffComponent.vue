<template>
    <div class="menu">
        <div class="row h-100 me-0">
            <div class="col-md-6 col-12 d-flex justify-content-start">
                <div class="d-flex justify-content-start align-items-center">
                    <h3 class="ps-3 w-75 text-center">Beach Restaurant</h3>
                </div>
                <ul class="h-100 d-flex align-items-end">
                    <a href="#" @click="clickCalendrier">
                        <li class="active" :class="{ 'bg-danger': menuActive == 'calendrier' }">
                            <i class="fa-solid fa-table"></i> LỊCH LÀM VIỆC
                        </li>
                    </a>
                    <a href="#" @click="clickRegister">
                        <li class="active" :class="{ 'bg-danger': menuActive == 'register' }">
                            <i class="fa-solid fa-file-pen"></i> ĐĂNG KÍ CA
                        </li>
                    </a>
                </ul>
            </div>
            <div class="col-md-6 col-12 d-flex justify-content-end h-100 align-items-center">
                <button class="btn btn-warning h-50" @click="goBack">Back</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    emits: ['onChange'],
    setup(props, context) {
        let menuActive = ref('calendrier');

        function clickCalendrier() {
            menuActive.value = 'calendrier';
            sendEmit(menuActive.value);
        }

        function clickRegister() {
            menuActive.value = 'register';
            sendEmit(menuActive.value);
        }

        function sendEmit(menuactive) {
            context.emit('onChange', menuactive);
        }

        return {
            menuActive, clickCalendrier, clickRegister,
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}


</script>

<style scoped>
.menu {
    height: 80px;
    background-color: rgba(21, 21, 21, 0.799);
}

h3 {
    color: orange;
    font-style: italic;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}

a {
    text-decoration: none;
}

ul li {
    list-style: none;
    font-weight: bold;
    font-size: 15px;
    color: antiquewhite;
}

.active {
    padding: 6px 15px;
    border-radius: 6px 6px 0px 0px;
}

ul li:hover {
    color: orange;
}

.dropdown-item:focus {
    background-color: rgba(49, 49, 49, 0.767) !important;
}
</style>