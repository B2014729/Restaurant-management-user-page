<template>
    <div class="menu">
        <div class="row h-100 me-0">
            <div class="col-md-6 col-12 d-flex justify-content-start">
                <div class="d-flex justify-content-start align-items-center">
                    <h3 class="ps-3 w-75 text-center">Beach Restaurant</h3>
                </div>
                <ul class="h-100 d-flex align-items-end">
                    <a href="#" @click="clickDishList">
                        <li class="active"
                            :class="{ 'bg-danger': menuActive == 'dishlist' || menuActive == 'order' || menuActive == 'orderInfor' || menuActive == 'personnal' || menuActive == 'workWeek' }">
                            <i class="fa-solid fa-table"></i> THỰC ĐƠN
                        </li>
                    </a>
                    <a href="#" @click="clickMap">
                        <li class="active" :class="{ 'bg-danger': menuActive == 'map' }">
                            <i class="fa-solid fa-map"></i> SƠ ĐỒ
                        </li>
                    </a>
                    <a href="#" @click="clickBill">
                        <li class="active" :class="{ 'bg-danger': menuActive == 'bill' }">
                            <i class="fa-solid fa-money-bills"></i> HÓA ĐƠN
                        </li>
                    </a>
                </ul>
            </div>
            <div class="col-md-6 col-12 d-flex justify-content-between">
                <div class="w-100 d-flex align-items-end justify-content-between">
                    <div>
                        <a href="#" @click="orderListNew">
                            <h6 class="m-0 active fw-bold p-2"
                                style="background-color: rgba(188, 188, 188, 0.726); color:black;">
                                Thông tin Order
                            </h6>
                        </a>
                    </div>
                    <div class="d-flex mb-2">
                        <button class="btn btn-outline-warning mx-2 rounded-circle" @click="addOrder">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <div class="dropdown">
                            <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{ username }}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" @click="personnalInfor" href="#">Thông tin cá nhân</a>
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
        let menuActive = ref('dishlist');

        function clickDishList() {
            menuActive.value = 'dishlist';
            sendEmit(menuActive.value);
        }

        function clickMap() {
            menuActive.value = 'map';
            sendEmit(menuActive.value);
        }

        function clickBill() {
            menuActive.value = 'bill';
            sendEmit(menuActive.value);
        }

        function addOrder() {
            menuActive.value = 'order';
            sendEmit(menuActive.value);
        }

        function orderListNew() {
            menuActive.value = 'orderInfor';
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
            menuActive, clickDishList, clickBill, clickMap, addOrder, orderListNew, personnalInfor,
        };
    },

    data() {
        return {
            username: this.$store.state.staff.tendangnhap,
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