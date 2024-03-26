<template>
    <div class="menu">
        <div class="row h-100 me-0">
            <div class="col-md-6 col-12 d-flex justify-content-start">
                <div class="d-flex justify-content-start align-items-center">
                    <h3 class="ps-3 w-75 text-center">Beach Restaurant</h3>
                </div>
                <ul class="h-100 d-flex align-items-end">
                    <a href="#" @click="order">
                        <li class="active"
                            :class="{ 'bg-danger': menuActive == 'order' || menuActive == 'personnal' || menuActive == 'workWeek' }">
                            <i class="fa-brands fa-first-order-alt"></i> ORDER
                        </li>
                    </a>
                    <a href="#" @click="orderPaid">
                        <li class="active" :class="{ 'bg-danger': menuActive == 'orderpaid' }">
                            <i class="fa-solid fa-square-check"></i> ĐÃ TRẢ MÓN
                        </li>
                    </a>
                    <a href="#" @click="depot">
                        <li class="active" :class="{ 'bg-danger': menuActive == 'depot' }">
                            <i class="fa-solid fa-landmark"></i> QL. KHO
                        </li>
                    </a>
                </ul>
            </div>
            <div class="col-md-6 col-12 d-flex justify-content-between">
                <div class="w-100 d-flex align-items-end justify-content-end">
                    <div class="d-flex mb-2">
                        <div class="dropdown">
                            <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{ username }}
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item" @click="personnalInfor" href="#">Thông tin cá nhân</a>
                                </li>
                                <router-link :to="{ name: 'calendrier-work-page' }">
                                    <li><a class="dropdown-item" href="#">Lịch làm việc</a></li>
                                </router-link>
                                <li><a class="dropdown-item" @click="logout" href="#">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    emits: ['onChange'],
    setup(props, context) {
        let menuActive = ref('order');

        function order() {
            menuActive.value = 'order';
            sendEmit(menuActive.value);
        }

        function orderPaid() {
            menuActive.value = 'orderpaid';
            sendEmit(menuActive.value);
        }

        function depot() {
            menuActive.value = 'depot';
            sendEmit(menuActive.value);
        }

        function personnalInfor() {
            menuActive.value = 'personnal';
            sendEmit(menuActive.value);
        }

        function sendEmit(menuactive) {
            context.emit('onChange', menuactive);
        }

        return {
            menuActive, order, depot, orderPaid, personnalInfor,
        };
    },

    data() {
        return {
            username: 'thanhthuy'
        }
    },

    methods: {
        logout() {
            this.$emit('logout');
        }
    },
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