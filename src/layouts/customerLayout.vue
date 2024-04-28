<template>
    <div class="container-customer">
        <!-- Modal login and register -->
        <loginModal v-if="modalLoginActive" @close="toggleModalLogin" @onRegister="toggleModalRegister"
            @login="login($event)" :message="message" :errorMessage="errorMessage">
        </loginModal>
        <registerModal v-if="modalRegisterActive" @close="toggleModalRegister" @register="register($event)">
        </registerModal>

        <!-- Modal confirm logout -->
        <confirmPayment v-if="modalConfirmLogoutActive" :message="messageModalConfirm" @close="toggleModalConfirmLogout"
            @onActive="logout">
        </confirmPayment>

        <!-- Modal show evaluate and create evaluate -->
        <showEvaluateModal v-if="modalShowEval" @close=toggleModalShowEval></showEvaluateModal>
        <createEvaluateModal v-if="modalCreateEval" @close="toggleModalCreateEval" @send="sendEvaluate($event)">
        </createEvaluateModal>

        <navCustomerComponent :isLogin="isLogin" class="menu-parent" @onLogin="toggleModalLogin"
            @onRegister="toggleModalRegister" @onLogout="toggleModalConfirmLogout">
        </navCustomerComponent>

        <homePage id="home"></homePage>
        <aboutPage id="about"></aboutPage>
        <openInforPage></openInforPage>
        <menuPage id="menu"></menuPage>
        <orderPage id="order" @onLogin="toggleModalLogin" :isLogin="isLogin">
        </orderPage>
        <listBookingsPage v-if="isLogin" @show="toggleModalShowEval" @create="toggleModalCreateEval"
            :listbookings="listBooking">
        </listBookingsPage>
        <div id="location">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.63879223682!2d105.75757034999998!3d10.034186950000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ-G6p24gVGjGoSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1709003116908!5m2!1svi!2s"
                width="100%" height="450" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <footer id="footer">
            <div class="bg-dark">
                <div class="py-5">
                    <button class="btn">
                        <i class="fa-brands fa-facebook text-secondary fs-1"></i>
                    </button>
                    <button class="btn">
                        <i class="fa-brands fa-square-twitter text-secondary fs-1"></i>
                    </button>
                    <button class="btn">
                        <i class="fa-brands fa-google-plus text-secondary fs-1"></i>
                    </button>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { ref } from 'vue';

import navCustomerComponent from '@/components/customer/navCustomerComponent.vue';

import homePage from "@/pages/customer/homePage.vue";
import aboutPage from "@/pages/customer/aboutPage.vue";
import openInforPage from "@/pages/customer/openInforPage.vue";
import orderPage from "@/pages/customer/orderPage.vue";
import menuPage from "@/pages/customer/menuPage.vue";
import listBookingsPage from '@/pages/customer/listBookingsPage.vue';

import loginModal from "@/components/modals/loginModal.vue";
import registerModal from "@/components/modals/registerModal.vue";
import showEvaluateModal from "@/components/modals/showEvaluateModal.vue";
import createEvaluateModal from "@/components/modals/createEvaluateModal.vue";
import confirmPayment from '@/components/modals/confirmPayment.vue';

import accountService from '@/services/account.service';
import evaluateService from '@/services/evaluate.service';

export default {
    name: 'App',
    components: {
        navCustomerComponent,
        homePage, aboutPage, openInforPage, listBookingsPage,
        orderPage, menuPage, loginModal, registerModal, confirmPayment, showEvaluateModal, createEvaluateModal
    },

    setup() {
        let isLogin = ref(false);
        let modalLoginActive = ref(false);
        let modalRegisterActive = ref(false);
        let modalConfirmLogoutActive = ref(false);
        let message = ref('');
        let errorMessage = ref(false);
        let messageModalConfirm = 'You want to log out of the system';
        const toggleModalLogin = () => {
            modalRegisterActive.value = false;
            modalConfirmLogoutActive.value = false;
            modalLoginActive.value = !modalLoginActive.value;
        }
        const toggleModalRegister = () => {
            modalLoginActive.value = false;
            modalConfirmLogoutActive.value = false;
            modalRegisterActive.value = !modalRegisterActive.value;
        }

        const toggleModalConfirmLogout = () => {
            modalLoginActive.value = false;
            modalRegisterActive.value = false;
            modalConfirmLogoutActive.value = !modalConfirmLogoutActive.value;
        }

        let modalShowEval = ref(false);
        let modalCreateEval = ref(false);

        const toggleModalShowEval = () => {
            modalShowEval.value = !modalShowEval.value;
            modalCreateEval.value = false;
        }

        const toggleModalCreateEval = () => {
            modalShowEval.value = false;
            modalCreateEval.value = !modalCreateEval.value;
        }


        return {
            isLogin, modalLoginActive, modalRegisterActive, modalConfirmLogoutActive,
            toggleModalLogin, toggleModalRegister, toggleModalConfirmLogout, messageModalConfirm,
            message, errorMessage, modalCreateEval, modalShowEval, toggleModalCreateEval, toggleModalShowEval
        };
    },

    data() {
        return {
            listBooking: [''],
        };
    },

    async created() {
        if (this.$store.state.staff != null) {
            this.isLogin = true;
        }
    },

    methods: {
        async login(data) {
            try {
                let result = await accountService.Login(data);
                if (result.status == 200) {
                    this.isLogin = true;
                    this.message = '';
                    this.errorMessage = false;

                    this.$cookies.set('jwt', result.headers.authorization);
                    this.$store.dispatch('staff',
                        {
                            token: result.headers.authorization,
                            tendangnhap: result.data.data[0].tendangnhap,
                            quyentruycap: result.data.data[0].quyen,
                        });
                    // console.log(this.$store.state.staff);
                    if (result.data.data[0].quyen == 1) {
                        this.$router.push('/nhan-vien/thu-ngan');
                    }
                    else if (result.data.data[0].quyen == 3) {
                        this.$router.push('/nhan-vien/bep');
                    }
                    else if (result.data.data[0].quyen == 0) {
                        this.$router.push('/nhan-vien/phuc-vu');
                    }
                    else if (result.data.data[0].quyen == 10) {
                        this.$router.push('/');
                        this.modalLoginActive = false;
                    } else {
                        throw '';//Gay phat sinh loi neu khong thay tai khoan dang nhap phu hop
                    }
                }
            } catch (error) {
                this.message = 'Login information is incorrect!';
                this.errorMessage = true;
                console.log(error);
            }
        },

        logout() {
            this.modalConfirmLogoutActive = false;
            this.isLogin = false
            this.$cookies.remove('jwt');
            this.$store.dispatch('staff', null);
            this.$router.push('/');
        },


        async register(data) {
            try {
                let dataFormat = {
                    username: data.username,
                    password: data.password,
                }
                let resultRegister = await accountService.Register(dataFormat);
                if (resultRegister.statusCode == 200) {
                    this.modalRegisterActive = false;
                    await this.login(dataFormat);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async sendEvaluate(data) {
            try {
                data.token = this.$store.state.staff.token;
                await evaluateService.Create(data).then((result) => {
                    if (result.statusCode == 200) {
                        this.modalCreateEval = false;
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
    }
}

</script>

<style scoped>
.container-customer {
    position: relative;
    width: 100%;
}

.menu-parent {
    width: 100%;
    position: fixed;
    top: 10px;
}
</style>