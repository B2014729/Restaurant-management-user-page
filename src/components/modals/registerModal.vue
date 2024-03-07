<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4">
                    <h4 class="mb-5">Register</h4>
                    <form @submit.prevent="submit" class="d-flex justify-content-center w-100">
                        <div class="content-form">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control"
                                    style="background-color: rgba(240, 248, 255, 0); color: goldenrod; border: none; border-bottom: 1px solid goldenrod;"
                                    id="floatingInput" placeholder="ksksk" v-model="data.username">
                                <label for="floatingInput" style="color: rgba(255, 166, 0, 0.693);">
                                    <i class="fa-solid fa-user"></i>
                                    Username
                                </label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control"
                                    style="background-color: rgba(240, 248, 255, 0); color: goldenrod; border: none; border-bottom: 1px solid goldenrod;"
                                    id="floatingPassword" placeholder="Password" v-model="data.password">
                                <label for="floatingPassword" style="color: rgba(255, 166, 0, 0.693);">
                                    <i class="fa-solid fa-lock"></i>
                                    Password
                                </label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control"
                                    style="background-color: rgba(240, 248, 255, 0); color: goldenrod; border: none; border-bottom: 1px solid goldenrod;"
                                    id="floatingPasswordConfirm" placeholder="Password" v-model="data.passwordConfirm">
                                <label for="floatingPasswordConfirm" style="color: rgba(255, 166, 0, 0.693);">
                                    <i class="fa-solid fa-lock"></i>
                                    Password confirm
                                </label>
                            </div>
                            <div v-if="false" class="my-2 w-100 d-flex justify-content-end">
                                <span class="text-danger" style="font-size: 13px;">
                                    Please check registration information!
                                </span>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-warning fw-bold fs-5" type="submit" style="border-radius: 30px;">
                                    Register now
                                </button>
                            </div>
                        </div>
                    </form>
                    <div class="my-3">
                        <span style="color: rgb(188, 188, 188); font-size: 13px;">Or use a social network</span>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn"><i class="fa-brands fa-google text-secondary fs-4"></i></button>
                        <button class="btn"><i class="fa-brands fa-twitter  text-secondary fs-4"></i></button>
                        <button class="btn"><i class="fa-brands fa-facebook  text-secondary fs-4"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        return { closeModal };
    },

    data() {
        return {
            data: {},
        };
    },

    async created() {

    },

    methods: {
        submit() {
            console.log(1);
            this.$emit('submit', this.data);
        }
    }
}
</script>
<style  scoped lang="css">
.modalBooking {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-booking-content {
    background-color: rgba(39, 38, 38, 0.875);
    width: 32%;
    margin: 50px 0px 110px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 50px;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

h4 {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: rgba(255, 166, 0, 0.999);
    font-weight: bold;
    font-size: 35px;
}

.content-form {
    width: 90%;
}
</style>