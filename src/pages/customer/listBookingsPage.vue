<template>
    <div class="block-booking mt-4">
        <div class="d-flex justify-content-center pt-4">
            <div class="d-flex mt-2">
                <i class="fa-solid fa-grip-lines text-warning"></i>
                <i class="fa-solid fa-grip-lines text-warning"></i>
                <i class="fa-solid fa-grip-lines text-warning"></i>
            </div>
            <h4 class="mx-3 fw-bold" style="font-family: 'Times New Roman', Times, serif;">
                YOUR TABLE RESERVATION LIST
            </h4>
            <div class="d-flex mt-2">
                <i class="fa-solid fa-grip-lines text-warning"></i>
                <i class="fa-solid fa-grip-lines text-warning"></i>
                <i class="fa-solid fa-grip-lines text-warning"></i>
            </div>
        </div>
        <div class="container">
            <div class="text-start mb-2">
                <span class="text-warning  fw-bold ">
                    <i class="fa-solid fa-star-of-david"></i> Upcoming:
                </span>
            </div>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" style="width: 20px;">NOrder</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col" style="width: 100px;">Quantity</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status booking</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listBookingUpcoming" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ formatDateTime(item.ngaygio) }}</td>
                        <td>{{ item.soluongnguoi }}</td>
                        <td>{{ item.ghichu }}</td>
                        <td>
                            <span class="text-success fw-bold" v-if="item.trangthai == 1">Confirmed</span>
                            <span class="text-warning fw-bold" v-if="item.trangthai == 0">Wait for confirmation</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-start mb-2">
                <span class="text-warning  fw-bold ">
                    <button v-if="(onActiveHistory == false)" class="btn btn-outline-warning border-0 fw-bold"
                        @click="onHistory">View history</button>
                    <button v-else class="btn btn-outline-warning border-0 fw-bold" @click="onHistory">
                        Close
                    </button>
                </span>
            </div>
            <div v-if="onActiveHistory">
                <div class="text-start mb-2">
                    <span class="text-warning  fw-bold ">
                        <i class="fa-solid fa-star-of-david"></i> History:
                    </span>
                </div>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col" style="width: 20px;">NOrder</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col" style="width: 100px;">Quantity</th>
                            <th scope="col">Message</th>
                            <th scope="col">Status booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in listBookingHistory" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ formatDateTime(item.ngaygio) }}</td>
                            <td>{{ item.soluongnguoi }}</td>
                            <td>{{ item.ghichu }}</td>
                            <td>
                                <span class="text-success fw-bold" v-if="item.trangthai == 1">Confirmed</span>
                                <span class="text-warning fw-bold" v-if="item.trangthai == 0">
                                    Wait for confirmation
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-secondary me-3" @click="showEvaluate">See reviews</button>
                <a class="mt-2" @click="createEvaluate">Create reviews</a>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { io } from "socket.io-client";
import bookingService from '@/services/booking.service';

export default {
    setup() {
        let onActiveHistory = ref(false);

        function formatDateTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds}, ${dateIn}/${month}/${year}`;
        }

        const onHistory = () => {
            onActiveHistory.value = !onActiveHistory.value;
        }

        return {
            formatDateTime, onHistory, onActiveHistory
        }
    },

    data() {
        return {
            dateNow: new Date(),
            listBookings: [],
            listBookingUpcoming: [],
            listBookingHistory: [],
        };
    },


    async created() {
        await this.fetchData();
        const socket = io('http://localhost:8000');

        await socket.on('bookingSuccess', () => {
            this.fetchData();
        })
    },


    methods: {
        async fetchData() {
            this.listBookings = [];
            this.listBookingHistory = [];
            this.listBookingUpcoming = [];
            try {
                let resultFetchData = await bookingService.GetBookings(this.$store.state.staff.token);
                this.listBookings = resultFetchData.thongtindatban;
                if (this.listBookings.length > 0) {
                    this.listBookings.forEach(element => {
                        let date = new Date(element.ngaygio);
                        if (date >= this.dateNow) {
                            this.listBookingUpcoming.push(element);
                        } else {
                            this.listBookingHistory.push(element)
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        showEvaluate() {
            this.$emit('show');
        },

        createEvaluate() {
            this.$emit('create');
        },
    }
}
</script>
<style scoped>
.block-booking {
    min-height: 500px;
    background-color: #212529;
}
</style>