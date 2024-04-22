<template>
    <div>
        <alertMessage style="margin-top: 220px;" v-if="showAlert" :status="status" :message="messageAlert">
        </alertMessage>

        <confirmPayment v-if="modalConfirm" :message="messageModalConfirm" @close="toggleModal" @onActive="submit">
        </confirmPayment>
        <div style="min-height: 700px;" class="mt-4">
            <div class="d-flex justify-content-center">
                <div class="d-flex mt-2">
                    <i class="fa-solid fa-grip-lines"></i>
                    <i class="fa-solid fa-grip-lines"></i>
                    <i class="fa-solid fa-grip-lines"></i>
                </div>
                <h4 class="mx-3 fw-bold">MAKE A RESERVATION</h4>
                <div class="d-flex mt-2">
                    <i class="fa-solid fa-grip-lines"></i>
                    <i class="fa-solid fa-grip-lines"></i>
                    <i class="fa-solid fa-grip-lines"></i>
                </div>
            </div>
            <div class="d-flex justify-content-center my-4">
                <div>
                    <span class="text-black fs-4" style="font-family: 'Times New Roman', Times, serif;">
                        __________________________________Open Hours__________________________________
                    </span>
                    <p class="hours-time">Monday to Sunday 11:30 - 22:00</p>
                    <p class="text-warning fw-bold">You must login with your account before booking a table</p>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-5">
                <div class="row" style="width: 900px;">
                    <form class="row">
                        <div class="col-md-6 col-12">
                            <p class="text-dark text-start fs-5">Book a table</p>
                            <div class="mb-3">
                                <input type="date" class="form-control rounded-0" id="date" placeholder="Date"
                                    v-model="data.date">
                            </div>
                            <div class="mb-3">
                                <input type="time" class="form-control rounded-0" id="time" v-model="data.time">
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control rounded-0" id="quantity" placeholder="Quantity"
                                    v-model="data.quantity">
                            </div>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="text-dark text-start fs-5">Contact details</p>
                            <div class="mb-3">
                                <input type="text" class="form-control rounded-0" id="name" placeholder="Name"
                                    v-model="data.name">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control rounded-0" id="phone" placeholder="Phone"
                                    v-model="data.phone">
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control rounded-0" id="email" placeholder="Email">
                            </div>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="5"
                                placeholder="Message" v-model="data.note">
                        </textarea>
                        </div>
                    </form>

                    <div>
                        <div v-if="errorNotifycation" class="my-2 w-100 d-flex justify-content-center">
                            <span class="text-danger" style="font-size: 14px;">
                                Please check booking information!
                            </span>
                        </div>
                        <button v-if="isLogin" class="btn btn-outline-warning rounded-0 fw-bold py-3 px-5"
                            @click="toggleModal">
                            SEND RESQUEST
                        </button>
                        <button v-else class="btn btn-outline-warning rounded-0 fw-bold py-3 px-5" @click="onLogin">
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bookingService from '@/services/booking.service';
import confirmPayment from '@/components/modals/confirmPayment.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import { ref } from 'vue';

export default {
    components: {
        confirmPayment, alertMessage
    },

    props: {
        isLogin: {
            type: Boolean,
        }
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        let errorNotifycation = ref(false);
        let modalConfirm = ref(false);
        let messageModalConfirm = 'Bookings a table now!';

        const toggleModal = () => {
            modalConfirm.value = !modalConfirm.value;
        }

        return {
            errorNotifycation, modalConfirm, messageModalConfirm, toggleModal, showAlert, status, messageAlert,
        }
    },

    data() {
        return {
            data: {},
        };
    },

    methods: {
        onLogin() {
            this.$emit('onLogin');
        },

        async submit() {
            this.modalConfirm = false;
            if (!this.data.name || !this.data.phone || !this.data.quantity || !this.data.time || !this.data.date) {
                this.errorNotifycation = true;
            } else {
                this.errorNotifycation = false;
                try {
                    this.data.token = this.$store.state.staff.token;
                    await bookingService.Create(this.data).then((result) => {
                        if (result.statusCode == 200) {
                            this.showAlert = true;
                            this.messageAlert = 'You have successfully booked a table';
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                            this.status = 'success';
                            this.data = {};

                        } else {
                            this.showAlert = true;
                            this.messageAlert = 'Error when booking your table';
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                            this.status = 'danger';
                        }
                    });
                } catch (error) {
                    this.showAlert = true;
                    this.messageAlert = 'Error when booking your table';
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                    this.status = 'danger';
                    console.log(error);
                }
            }
        }
    },
}
</script>

<style scoped>
i {
    color: orange;
}

h4 {
    color: black;
    font-family: 'Times New Roman', Times, serif;
}

.hours-time {
    color: rgb(74, 94, 0);
    font-weight: bold;
}
</style>