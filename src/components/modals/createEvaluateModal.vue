<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Create reviews</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr class="text-dark">
                <div class="mt-4" style="min-height: 510px;">
                    <h5 class="text-secondary fw-bold text-start ms-2">{{ $store.state.staff.tendangnhap }}</h5>
                    <div class="w-25 my-2">
                        <div class="star-group">
                            <input type="radio" class="star text-warning" :value="1" id="one" name="star_rating"
                                v-model="quantityStar">
                            <input type="radio" class="star text-warning" :value="2" id="two" name="star_rating"
                                v-model="quantityStar" checked>
                            <input type="radio" class="star text-warning" :value="3" id="three" name="star_rating"
                                v-model="quantityStar">
                            <input type="radio" class="star text-warning" :value="4" id="four" name="star_rating"
                                v-model="quantityStar">
                            <input type="radio" class="star text-warning" :value="5" id="five" name="star_rating"
                                v-model="quantityStar">
                        </div>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="12"
                            placeholder="Message" v-model="message">
                        </textarea>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-outline-secondary" type="submit" @click="submit"> <i
                                class="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import evaluateService from '@/services/evaluate.service';

export default {
    data() {
        return {
            quantityStar: 2,
            message: '',
        };
    },
    emits: ['close', 'send'],
    methods: {
        closeModal() {
            this.$emit('close');
        },

        submit() {
            let data = {
                sosao: this.quantityStar,
                noidung: this.message,
            }
            this.$emit('send', data);
        }
    }

}
</script>
<style scoped lang="css">
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

.btn:hover {
    color: rgb(246, 156, 0);
}

.modal-booking-content {
    background-color: rgb(255, 255, 255);
    width: 65%;
    margin: 20px 0px 140px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 20px;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

.star-group {
    display: grid;
    font-size: clamp(2em, 10vw, 3em);
    grid-auto-flow: column;
}

/* reset native input styles */
.star {
    -webkit-appearance: none;
    align-items: center;
    appearance: none;
    cursor: pointer;
    display: grid;
    font: inherit;
    height: 1em;
    justify-items: center;
    margin: 0;
    place-content: center;
    position: relative;
    width: 1em;
}

@media (prefers-reduced-motion: no-preference) {
    .star {
        transition: all 0.25s;
    }

    .star:before,
    .star:after {
        transition: all 0.25s;
    }
}

.star:before,
.star:after {
    color: var(--star-primary-color);
    position: absolute;
}

.star:before {
    content: "☆";
}

.star:after {
    content: "✦";
    font-size: 25%;
    opacity: 0;
    right: 20%;
    top: 20%;
}

/* The checked radio button and each radio button preceding */
.star:checked:before,
.star:has(~ .star:checked):before {
    content: "★";
}

#two:checked:after,
.star:has(~ #two:checked):after {
    opacity: 1;
    right: 14%;
    top: 10%;
}

#three:checked:before,
.star:has(~ #three:checked):before {
    transform: var(--enlarge);
}

#three:checked:after,
.star:has(~ #three:checked):after {
    opacity: 1;
    right: 8%;
    top: 2%;
    transform: var(--enlarge);
}

#four:checked:before,
.star:has(~ #four:checked):before {
    text-shadow: 0.05em 0.033em 0px var(--star-secondary-color);
    transform: var(--enlarge);
}

#four:checked:after,
.star:has(~ #four:checked):after {
    opacity: 1;
    right: 8%;
    top: 2%;
    transform: var(--enlarge);
}

#five:checked:before,
.star:has(~ #five:checked):before {
    text-shadow: 0.05em 0.033em 0px var(--star-secondary-color);
    transform: var(--enlarge);
}

#five:checked:after,
.star:has(~ #five:checked):after {
    opacity: 1;
    right: 8%;
    text-shadow: 0.14em 0.075em 0px var(--star-secondary-color);
    top: 2%;
    transform: var(--enlarge);
}

.star-group:has(> #five:checked) {
    #one {
        transform: rotate(-15deg);
    }

    #two {
        transform: translateY(-20%) rotate(-7.5deg);
    }

    #three {
        transform: translateY(-30%);
    }

    #four {
        transform: translateY(-20%) rotate(7.5deg);
    }

    #five {
        transform: rotate(15deg);
    }
}

.star:focus {
    outline: none;
}

.star:focus-visible {
    border-radius: 8px;
    outline: 2px dashed var(--star-primary-color);
    outline-offset: 8px;
    transition: all 0s;
}
</style>