<template>
    <div>
        <navCashierComponent @onChange="onChange($event)"></navCashierComponent>
        <div class="row">
            <div class="col-md-6 col-12">
                <listDishPage v-if="dishList" @addDish="addProductInOrder($event)"></listDishPage>
                <mapPage v-if="map"></mapPage>
                <billPage v-if="bill"></billPage>
            </div>
            <div class="col-md-6 col-12" style="background-color: rgba(188, 188, 188, 0.726); min-height: 649px">
                <orderNewPage v-if="orderListNew"></orderNewPage>
                <orderCreatePage v-if="createOrder" :listDishOrder="listDish"></orderCreatePage>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import navCashierComponent from '@/components/cashier/navCashierComponent.vue';
import listDishPage from '@/pages/staff/cashier/listDishPage.vue';
import mapPage from '@/pages/staff/cashier/mapPage.vue';
import billPage from '@/pages/staff/cashier/billPage.vue';

import orderNewPage from '@/pages/staff/cashier/orderNewPage.vue';
import orderCreatePage from '@/pages/staff/cashier/orderCreatePage.vue';

export default {
    components: {
        navCashierComponent,
        orderNewPage,
        orderCreatePage,
        listDishPage,
        mapPage,
        billPage
    },

    setup() {
        let dishList = ref(true);
        let map = ref(false);
        let bill = ref(false);
        let orderListNew = ref(true);
        let createOrder = ref(false);

        const onChange = (data) => {
            switch (data) {
                case 'dishlist':
                    dishList.value = true;
                    map.value = false;
                    bill.value = false;
                    break;
                case 'map':
                    dishList.value = false;
                    map.value = true;
                    bill.value = false;
                    break;
                case 'bill':
                    dishList.value = false;
                    map.value = false;
                    bill.value = true;
                    break;
                case 'order':
                    dishList.value = true;
                    createOrder.value = true;
                    orderListNew.value = false;
                    map.value = false;
                    bill.value = false;
                    break;
                case 'orderInfor':
                    createOrder.value = false;
                    orderListNew.value = true;
                    break;
                default:
                    break;
            }
        }

        let listDish = ref([]);//Luu danh sach san pham order
        const addProductInOrder = (data) => {
            console.log(data);
            let dishOrder = {
                idmon: data.idmon,
                tenmon: data.tenmon,
                gia: data.gia,
                soluong: 1,
            }
            if (listDish.value.length > 0) {
                listDish.value.forEach((element) => {
                    console.log(element);
                    if (element.idmon == dishOrder.idmon) {
                        element.soluong += 1;
                    } else {
                        listDish.value.push(dishOrder);
                    }
                });
            } else {
                listDish.value.push(dishOrder);
            }
        }

        return {
            onChange, dishList, map, bill, listDish, addProductInOrder, orderListNew, createOrder
        };
    },

    methods: {

    }
}
</script>