<template>
    <div>
        <confirmPaymentModal v-if="modalActiveConfirmLogout" message="Bạn muốn đăng xuất khỏi hệ thống ?"
            @close="toggleModalConfirm" @onActive="logout">
        </confirmPaymentModal>

        <detailPersonnalModal v-if="modalActivePersonnal" @close="toggleModalPersonnal"
            @changePass="toggleModalChangePass" @UpdateSuccess="UpdateSuccess($event)">
        </detailPersonnalModal>
        <changePassModal v-if="modalActiveChangePass" @close="toggleModalChangePass" @onActive="changePass($event)">
        </changePassModal>

        <navKitchenComponent @onChange="onChange($event)" @logout="toggleModalConfirm">
        </navKitchenComponent>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <div class="container w-75" style="padding: 0px 60px; min-height: 600px;">
            <listOrderPage v-if="order"></listOrderPage>
            <listOrderPaidPage v-if="orderpaid"></listOrderPaidPage>
            <depotManagerPage v-if="depot"></depotManagerPage>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import navKitchenComponent from '@/components/kitchen/navKitchenComponent.vue';

import detailPersonnalModal from '@/components/modals/detailPersonnalModal.vue';
import changePassModal from '@/components/modals/changePassModal.vue';
import confirmPaymentModal from '@/components/modals/confirmPayment.vue';

import listOrderPage from '@/pages/staff/kitchen/listOrderPage.vue';
import listOrderPaidPage from '@/pages/staff/kitchen/listOrderPaidPage.vue';
import depotManagerPage from '@/pages/staff/kitchen/depotManagerPage.vue';

import alertMessage from '@/components/alertMessage/alertMessage.vue';
import accountService from '@/services/account.service';


export default {
    components: {
        navKitchenComponent,
        detailPersonnalModal,
        changePassModal,
        confirmPaymentModal,
        alertMessage,
        listOrderPage, listOrderPaidPage, depotManagerPage
    },

    setup() {
        // Quan  li trang thai trang
        let order = ref(true);
        let orderpaid = ref(false);
        let depot = ref(false);

        const onChange = (data) => {
            switch (data) {
                case 'order':
                    order.value = true;
                    orderpaid.value = false;
                    depot.value = false;
                    break;
                case 'orderpaid':
                    order.value = false;
                    orderpaid.value = true;
                    depot.value = false;
                    break;
                case 'depot':
                    order.value = false;
                    orderpaid.value = false;
                    depot.value = true;
                    break;
                case 'personnal':
                    order.value = true;
                    toggleModalPersonnal();
                    break;
                default:
                    break;
            }
        }

        //  Quan li modal thong tin ca nhan
        let modalActivePersonnal = ref(false);

        const toggleModalPersonnal = () => {
            modalActivePersonnal.value = !modalActivePersonnal.value;
            modalActiveChangePass.value = false;
            modalActiveConfirmLogout.value = false;
        }

        // Quan li modal cap nhat thong tin tai khoan
        let modalActiveChangePass = ref(false);

        const toggleModalChangePass = () => {
            modalActivePersonnal.value = false;
            modalActiveConfirmLogout.value = false;
            modalActiveChangePass.value = !modalActiveChangePass.value;
        }

        //Quan li trang thai modal confirm logout
        let modalActiveConfirmLogout = ref(false);

        const toggleModalConfirm = () => {
            modalActivePersonnal.value = false;
            modalActiveChangePass.value = false;
            modalActiveConfirmLogout.value = !modalActiveConfirmLogout.value;
        }

        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        return {
            order, orderpaid, depot, onChange,
            modalActivePersonnal, toggleModalPersonnal,
            modalActiveChangePass, toggleModalChangePass,
            showAlert, status, messageAlert,
            modalActiveConfirmLogout, toggleModalConfirm,
        };
    },

    methods: {
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
                })
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