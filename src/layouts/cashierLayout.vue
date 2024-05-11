<template>
    <div>
        <confirmPaymentModal v-if="modalActiveConfirmLogout" message="Bạn muốn đăng xuất khỏi hệ thống ?"
            @close="toggleModalConfirm" @onActive="logout"></confirmPaymentModal>
        <detailPersonnalModal v-if="modalActivePersonnal" @close="toggleModalPersonnal"
            @changePass="toggleModalChangePass" @UpdateSuccess="UpdateSuccess($event)">
        </detailPersonnalModal>
        <detailPromotionModal v-if="modalActiveDetailPromotion" :id="idPromotion"
            @close="toggleModalDetailPromotion(0)">
        </detailPromotionModal>
        <changePassModal v-if="modalActiveChangePass" @close="toggleModalChangePass" @onActive="changePass($event)">
        </changePassModal>

        <navCashierComponent @onChange="onChange($event)" @logout="toggleModalConfirm">
        </navCashierComponent>

        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="row">
            <div class="col-md-6 col-12">
                <listDishPage v-if="dishList" @addDish="addProductInOrder($event)"
                    @onDetailPromotion="toggleModalDetailPromotion($event)"></listDishPage>
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

import alertMessage from '@/components/alertMessage/alertMessage.vue';

import navCashierComponent from '@/components/cashier/navCashierComponent.vue';
import listDishPage from '@/pages/staff/cashier/listDishPage.vue';
import mapPage from '@/pages/staff/cashier/mapPage.vue';
import billPage from '@/pages/staff/cashier/billPage.vue';

import orderNewPage from '@/pages/staff/cashier/orderNewPage.vue';
import orderCreatePage from '@/pages/staff/cashier/orderCreatePage.vue';

import detailPersonnalModal from '@/components/modals/detailPersonnalModal.vue';
import changePassModal from '@/components/modals/changePassModal.vue';
import detailPromotionModal from '@/components/modals/detailPromotionModal.vue';
import confirmPaymentModal from '@/components/modals/confirmPayment.vue';

import orderService from '@/services/order.service';
import accountService from '@/services/account.service';

export default {
    components: {
        alertMessage,
        navCashierComponent,
        orderNewPage,
        orderCreatePage,
        listDishPage,
        mapPage,
        billPage,
        detailPersonnalModal,
        changePassModal,
        detailPromotionModal,
        confirmPaymentModal
    },

    setup() {
        // Quan li trang thai trang
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
                default:
                    break;
            }
        }

        // Quan li modal thong tin ca nhan
        let modalActivePersonnal = ref(false);

        const toggleModalPersonnal = () => {
            modalActivePersonnal.value = !modalActivePersonnal.value;
            modalActiveChangePass.value = false;
            modalActiveDetailPromotion.value = false;
            modalActiveConfirmLogout.value = false;
        }
        // Quan li modal cap nhat thong tin tai khoan
        let modalActiveChangePass = ref(false);

        const toggleModalChangePass = () => {
            modalActivePersonnal.value = false;
            modalActiveConfirmLogout.value = false;
            modalActiveDetailPromotion.value = false;
            modalActiveChangePass.value = !modalActiveChangePass.value;
        }

        //Quan li trang thai chi tiet khuyen mai
        let modalActiveDetailPromotion = ref(false);

        let idPromotion = ref('');
        const toggleModalDetailPromotion = (id) => {
            idPromotion.value = id;
            modalActivePersonnal.value = false;
            modalActiveChangePass.value = false;
            modalActiveConfirmLogout.value = false;
            modalActiveDetailPromotion.value = !modalActiveDetailPromotion.value;
        }

        //Quan li trang thai modal confirm logout
        let modalActiveConfirmLogout = ref(false);

        const toggleModalConfirm = () => {
            modalActivePersonnal.value = false;
            modalActiveChangePass.value = false;
            modalActiveDetailPromotion.value = false;
            modalActiveConfirmLogout.value = !modalActiveConfirmLogout.value;
        }

        //Luu danh sach san pham order
        let listDish = ref([]);
        const addProductInOrder = (data) => {
            let dishOrder = {};
            if (Object.prototype.hasOwnProperty.call(data, 'idmon')) {
                dishOrder = {
                    idmon: data.idmon,
                    tenmon: data.tenmon,
                    gia: data.gia,
                    soluong: 1,
                }
            } else {
                if (Object.prototype.hasOwnProperty.call(data, 'idkhuyenmai')) {
                    console.log(data);
                    dishOrder = {
                        idmon: data.idkhuyenmai,
                        tenmon: data.tenkhuyenmai,
                        gia: data.thanhtoan,
                        soluong: 1,
                    }
                }

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

        // Quan li trang thai message
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        return {
            dishList, map, bill, listDish, orderListNew, createOrder, onChange,
            addProductInOrder, removeDish,
            modalActivePersonnal, toggleModalPersonnal,
            modalActiveChangePass, toggleModalChangePass,
            idPromotion, modalActiveDetailPromotion, toggleModalDetailPromotion,
            modalActiveConfirmLogout, toggleModalConfirm,
            showAlert, status, messageAlert,
        };
    },

    methods: {
        async Order(data) {
            let dishId = [];
            let quantity = [];
            let note = [];
            this.listDish.forEach(element => {
                dishId.push(element.idmon);
                quantity.push(element.soluong);
                note.push('');
            });

            let dataFormated = {
                token: data.token,
                status: data.status,
                idTable: data.idTable,
                idDish: dishId,
                quantity: quantity,
                note: note,
            };

            try {
                await orderService.Create(dataFormated).then((result) => {
                    if (result.statusCode == 200) {
                        //Thong bao order thanh cong
                        this.listDish = [];
                        this.showAlert = true;
                        this.messageAlert = 'Order thành công!';
                        this.status = 'success';
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },

        logout() {
            this.$cookies.remove('jwt');
            this.$store.dispatch('staff', null);
            this.$router.push('/');
        },

        async changePass(data) {
            this.modalActiveChangePass = false;
            try {
                await accountService.Update(data.token, data).then(result => {
                    if (result.statusCode == 200) {
                        this.showAlert = true;
                        this.messageAlert = 'Đã cập nhật thông tin tài khoản!';
                        this.status = 'success';
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    }
                });
            } catch (error) {
                console.log(error);
                this.showAlert = true;
                this.messageAlert = 'Lỗi khi cập nhật thông tin tài khoản!';
                this.status = 'danger';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
        },

        UpdateSuccess(status) {
            console.log(status);
            this.modalActivePersonnal = false;
            if (status == 'success') {
                this.showAlert = true;
                this.messageAlert = 'Đã cập nhật thông tin cá nhân!';
                this.status = 'success';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            } else {
                this.showAlert = true;
                this.messageAlert = 'Chưa thay đổi thông tin để cập nhật!';
                this.status = 'warning';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
        }
    }
}
</script>