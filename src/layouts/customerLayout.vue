<template>
    <div class="container-customer">
        <loginModal v-if="modalLoginActive" @close="toggleModalLogin" @onRegister="toggleModalRegister"
            @submit="login($event)">
        </loginModal>
        <registerModal v-if="modalRegisterActive" @close="toggleModalRegister" @submit="register($event)">
        </registerModal>
        <navCustomerComponent class="menu-parent" @onLogin="toggleModalLogin" @onRegister="toggleModalRegister">
        </navCustomerComponent>
        <homePage id="home"></homePage>
        <aboutPage id="about"></aboutPage>
        <openInforPage></openInforPage>
        <menuPage id="menu"></menuPage>
        <orderPage id="reservation"></orderPage>
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
import loginModal from "@/components/modals/loginModal.vue";
import registerModal from "@/components/modals/registerModal.vue";

export default {
    name: 'App',
    components: {
        navCustomerComponent,
        homePage, aboutPage, openInforPage,
        orderPage, menuPage, loginModal, registerModal
    },

    setup() {
        let modalLoginActive = ref(false);
        let modalRegisterActive = ref(false);

        const toggleModalLogin = () => {
            modalRegisterActive.value = false;
            modalLoginActive.value = !modalLoginActive.value;
        }
        const toggleModalRegister = () => {
            modalLoginActive.value = false;
            modalRegisterActive.value = !modalRegisterActive.value;
        }

        return {
            modalLoginActive, modalRegisterActive, toggleModalLogin, toggleModalRegister,
        };
    },

    methods: {
        login(data) {
            console.log(data.username, data.password);
        },

        register(data) {
            console.log(data.username, data.password, data.passwordConfirm);
        }
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