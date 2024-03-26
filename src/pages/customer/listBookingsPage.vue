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
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" style="width: 20px;">NOrder</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col" style="width: 100px;">Quantity</th>
                        <th scope="col">Status booking</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listbookings.thongtindatban" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ formatDateTime(item.ngaygio) }}</td>
                        <td>{{ item.soluongnguoi }}</td>
                        <td>
                            <span class="text-success fw-bold" v-if="item.trangthai == 1">Confirmed</span>
                            <span class="text-warning fw-bold" v-if="item.trangthai == 0">Wait for confirmation</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-secondary me-3" @click="showEvaluate">Xem đánh giá</button>    
                <a class="mt-2" @click="createEvaluate">Viết đánh giá</a>   
            </div>
        </div>
    </div>
</template>
<script>
import bookingService from '@/services/booking.service';

export default {
    setup() {
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

        return {
            formatDateTime,
        }
    },

    data() {
        return {
            listbookings: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listbookings = await bookingService.GetBookings(this.$store.state.staff.token);
            } catch (error) {
                console.log(error);
            }
        },

        showEvaluate(){
            this.$emit('show');
        },

        createEvaluate(){
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