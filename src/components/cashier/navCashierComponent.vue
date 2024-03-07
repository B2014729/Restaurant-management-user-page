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
                            :class="{ 'bg-danger': menuActive == 'dishlist' || menuActive == 'order' || menuActive == 'orderInfor' }">
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
                    <div>
                        <button class="btn btn-outline-warning my-2 mx-2 rounded-circle" @click="addOrder">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <button class="btn btn-outline-warning my-2" @click="login">
                            User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    emit: ['onChange'],
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


        function sendEmit(menuactive) {
            context.emit('onChange', menuactive);
        }

        return {
            menuActive, clickDishList, clickBill, clickMap, addOrder, orderListNew
        };
    },

    methods: {

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
</style>