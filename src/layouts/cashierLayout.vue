<template>
    <div>
        <detailPersonnalModal v-if="modalActivePersonnal" @close="toggleModalPersonnal"></detailPersonnalModal>
        <calendierWorkStaffModal v-if="modalActiveWorkWeek" @close="toggleModalWorkWeek">
        </calendierWorkStaffModal>

        <navCashierComponent @onChange="onChange($event)" @logout="logout">
        </navCashierComponent>
        <div class="row">
            <div class="col-md-6 col-12">
                <listDishPage v-if="dishList" @addDish="addProductInOrder($event)"></listDishPage>
                <mapPage v-if="map"></mapPage>
                <billPage v-if="bill"></billPage>
            </div>
            <div class="col-md-6 col-12" style="background-color: rgba(188, 188, 188, 0.726); min-height: 649px">
                <orderNewPage v-if="orderListNew"></orderNewPage>
                <orderCreatePage v-if="createOrder" :listDishOrder="listDish" @removeDish="removeDish($event)"
                    @order="Order($event)">
                </orderCreatePage>
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

import detailPersonnalModal from '@/components/modals/detailPersonnalModal.vue';
import calendierWorkStaffModal from '@/components/modals/calendierWorkStaffModal.vue';

import orderService from '@/services/order.service';

export default {
    components: {
        navCashierComponent,
        orderNewPage,
        orderCreatePage,
        listDishPage,
        mapPage,
        billPage,
        detailPersonnalModal,
        calendierWorkStaffModal,
    },

    setup() {
        // Quan  li trang thai trang
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
                case 'personnal':
                    dishList.value = true;
                    toggleModalPersonnal();
                    break;
                case 'workWeek':
                    dishList.value = true;
                    toggleModalWorkWeek();
                    break;
                default:
                    break;
            }
        }

        // Quan li modal thong tin ca nhan
        let modalActivePersonnal = ref(false);

        const toggleModalPersonnal = () => {
            modalActivePersonnal.value = !modalActivePersonnal.value;
        }

        // Quan li modal lich lam viec
        let modalActiveWorkWeek = ref(false);

        const toggleModalWorkWeek = () => {
            modalActiveWorkWeek.value = !modalActiveWorkWeek.value;
        }

        //Luu danh sach san pham order
        let listDish = ref([]);
        const addProductInOrder = (data) => {
            let dishOrder = {
                idmon: data.idmon,
                tenmon: data.tenmon,
                gia: data.gia,
                soluong: 1,
            }

            let checkIsset = false;
            for (let index = 0; index < listDish.value.length; index++) {
                const element = listDish.value[index];
                if (element.idmon == dishOrder.idmon) {
                    element.soluong += 1;
                    checkIsset = true;
                    break;
                }
            }
            if (!checkIsset) {
                listDish.value.push(dishOrder);
            }
        }

        const removeDish = (idDish) => {
            listDish.value.forEach((element) => {
                if (element.idmon == idDish) {
                    listDish.value.pop(element);
                }
            });
        }

        return {
            dishList, map, bill, listDish, orderListNew, createOrder, onChange,
            addProductInOrder, removeDish,
            modalActivePersonnal, toggleModalPersonnal, modalActiveWorkWeek, toggleModalWorkWeek,
        };
    },

    methods: {
        async Order(data) {
            let dataFormated = {
                token: data.token,
                status: data.status,
                idTable: data.idTable,
                idDish: data.dishId,
                quantity: data.quantity,
                note: data.note,
            }
            await orderService.Create(dataFormated).then((result) => {
                if (result.statusCode == 200) {
                    //Thong  bao order thanh cong
                    this.listDish = [];
                }
            })
        },

        logout() {
            this.$cookies.remove('jwt');
            this.$store.dispatch('staff', null);
            this.$router.push('/');
        },
    }
}
</script>