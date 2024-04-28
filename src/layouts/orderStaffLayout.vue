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

        <navOrderStaffComponent @onChange="onChange($event)" @logout="toggleModalConfirm"
            @personnal="toggleModalPersonnal">
        </navOrderStaffComponent>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <div class="container">
            <calendrierWorkStaffPage v-if="calendrier"> </calendrierWorkStaffPage>
            <registerWorkStaffPage v-if="register"></registerWorkStaffPage>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import navOrderStaffComponent from '@/components/orderStaff/navOrderStaffComponent.vue'

import detailPersonnalModal from '@/components/modals/detailPersonnalModal.vue';
import changePassModal from '@/components/modals/changePassModal.vue';
import confirmPaymentModal from '@/components/modals/confirmPayment.vue';

import calendrierWorkStaffPage from '@/pages/staff/calendrierWorkStaffPage.vue';
import registerWorkStaffPage from '@/pages/staff/registerWorkStaffPage.vue';

import alertMessage from '@/components/alertMessage/alertMessage.vue';
import accountService from '@/services/account.service';


export default {
    components: {
        navOrderStaffComponent,
        detailPersonnalModal,
        changePassModal,
        confirmPaymentModal,
        alertMessage,
        calendrierWorkStaffPage,
        registerWorkStaffPage
    },

    setup() {
        // Quan  li trang thai trang
        let calendrier = ref(true);
        let register = ref(false);

        const onChange = (data) => {
            switch (data) {
                case 'calendrier':
                    calendrier.value = true;
                    register.value = false;
                    break;
                case 'register':
                    calendrier.value = false;
                    register.value = true;
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
            calendrier, register,
            onChange,
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