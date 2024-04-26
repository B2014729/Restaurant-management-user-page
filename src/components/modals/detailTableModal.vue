<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Thông tin dùng món</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4" style="min-height: 530px;">
                    <div class="d-flex justify-content-between">
                        <div class="float-start">
                            <h6 class="text-dark fw-bold text-start">Bàn số: {{ idTable }}</h6>
                            <h6 class="text-dark fw-bold">Giờ vào: {{ formatDateTime(billInfor.ngaygiotao) }}</h6>
                        </div>
                        <div class="py-2">
                            <span v-if="checkTableIsEating()" class="status-busy">Đang ăn</span>
                            <span v-else class="status-free">Bàn trống</span>
                        </div>
                    </div>
                    <div class="d-flex flex-column h-100">
                        <div>
                            <h6 class="fw-bold text-warning text-start">Danh sách món đã dùng</h6>
                            <div>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" style="width: 20px;">STT</th>
                                            <th scope="col" style="width: 100px;">Mã số</th>
                                            <th scope="col">Tên món</th>
                                            <th scope="col" style="width: 100px;">Số lượng</th>
                                            <th scope="col">Đơn giá (vnd)</th>
                                            <th scope="col">Giảm giá (vnd)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in listDish" :key="index">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>{{ item.id }}</td>
                                            <td>{{ item.tenmon }}</td>
                                            <td>{{ item.soluong }}</td>
                                            <td>{{ formatNumber(item.gia + item.giamgia) }}</td>
                                            <td>{{ formatNumber(item.giamgia) }}</td>
                                        </tr>
                                        <hr>
                                        <tr>
                                            <td colspan="4" class="fw-bold text-end bg-warning">Tổng:</td>
                                            <td class="fw-bold">
                                                {{ formatNumber(billInfor.thanhtoan + billInfor.giamgia) }} vnđ
                                            </td>
                                            <td class="fw-bold">{{ formatNumber(billInfor.giamgia) }} vnđ</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class="fw-bold text-end bg-success">Thanh toán:</td>
                                            <td class="fw-bold">{{ formatNumber(billInfor.thanhtoan) }} vnđ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="">
                            <h6 class="fw-bold text-warning text-start">Sắp diễn ra:</h6>
                            <ul>
                                <li class="text-dark text-start" v-for="(item, index) in listBookings" :key="index">
                                    {{ formatTime(item.ngaygio) }} ({{ item.cachgio }} giờ) | KH: {{
                                        item.thongtinkhachhang.hotenkhachhang }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-secondary ms-2" @click="closeModal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import billService from '@/services/bill.service';
import bookingService from '@/services/booking.service';

export default {
    emits: ['close'],

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        const formatNumber = (number) => {
            if (!number)
                return 0;
            return (new Intl.NumberFormat().format(number));
        }

        function formatDateTime(date) {
            if (!date) {
                return '____';
            }
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds} ${dateIn}/${month}/${year}`;
        }

        function formatTime(date) {
            if (!date) {
                return '____';
            }
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;

            return `${hours}:${minutes}`;
        }

        return {
            closeModal, formatNumber, formatDateTime, formatTime
        };
    },

    props: {
        idTable: {
            type: Number,
        }
    },

    data() {
        return {
            billInfor: {},
            listDish: [],
            listBookings: [],
        };
    },

    async created() {
        await this.fetchDataBill();
        await this.fetchDataBooking();
    },

    methods: {
        async fetchDataBill() {
            try {
                this.billInfor = await billService.FindOneByIdTable(this.idTable);
                let dish = {};
                this.billInfor.chitietdatmon.forEach(element => {
                    if (Object.keys(element.khuyenmai).length == 0) {
                        dish = element.mon;
                        dish.id = element.mon.idmon;
                        dish.soluong = element.soluong;
                        dish.giamgia = 0;
                        this.listDish.push(dish);
                    } else {
                        this.listDish.push({
                            id: element.khuyenmai.idkhuyenmai,
                            tenmon: element.khuyenmai.tenkhuyenmai,
                            soluong: element.soluong,
                            giamgia: element.khuyenmai.giamgia,
                            gia: element.khuyenmai.thanhtoan,
                        })
                    }
                });
            } catch (error) {
                this.billInfor = {};
                console.log(error);
            }
        },

        async fetchDataBooking() {
            try {
                let dateNow = new Date();
                let dateElementTomorrow = new Date();
                dateElementTomorrow.setDate(dateElementTomorrow.getDate() + 1);
                dateElementTomorrow.setHours(0, 0, 0);

                let listBookingsTable = await bookingService.GetBookingsTable(this.idTable);
                listBookingsTable.forEach(element => {
                    let dateElement = new Date(element.ngaygio);

                    if (dateElement > dateNow && dateElement < dateElementTomorrow) {
                        element.cachgio = dateElement.getHours() - dateNow.getHours();
                        this.listBookings.push(element);
                    }
                });
            } catch (error) {
                this.listBookings = [];
                console.log(error);
            }
        },

        checkTableIsEating() {
            if (Object.keys(this.billInfor) != 0) {
                return true;
            }
            return false;
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

.modal-booking-content {
    background-color: rgb(255, 255, 255);
    width: 50%;
    margin: 20px 0px 50px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
    overflow: auto;
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

.status-busy {
    background-color: rgba(190, 0, 0, 0.926);
    padding: 10px;
    border-radius: 20px;
}

.status-free {
    background-color: rgba(68, 209, 3, 0.908);
    padding: 10px;
    border-radius: 20px;
}
</style>