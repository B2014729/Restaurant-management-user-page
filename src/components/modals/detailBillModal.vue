<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Thanh toán hóa đơn {{ idBill }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4" style="min-height: 510px;">
                    <div class="d-flex justify-content-between">
                        <div class="float-start">
                            <h6 class="text-dark fw-bold text-start">Mã HĐ: {{ billInfor.idhoadon }}</h6>
                            <h6 class="text-dark fw-bold text-start">Nhân viên: {{ billInfor.tennhanvien }}</h6>
                        </div>
                        <div class="me-2">
                            <h6 class="text-dark fw-bold text-start">Bàn số: {{ billInfor.idban }}</h6>
                            <h6 class="text-dark fw-bold">Giờ vào: {{ formatDateTime(billInfor.ngaygiotao) }}</h6>
                        </div>
                    </div>
                    <div>
                        <h6 class="fw-bold text-warning">Danh sách món đã dùng</h6>
                        <div>
                            <table class="table table-bordered table-hover">
                                <!-- <thead>
                                    <tr>
                                        <th scope="col" style="width: 20px;">STT</th>
                                        <th scope="col">Tên món</th>
                                        <th scope="col" style="width: 100px;">Số lượng</th>
                                        <th scope="col">Đơn giá (vnd)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in billInfor.chitietdatmon" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ item.tenmon }}</td>
                                        <td>{{ item.soluong }}</td>
                                        <td>{{ formatNumber(item.gia) }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="fw-bold text-end bg-warning">Tổng cộng</td>
                                        <td class="fw-bold">{{ formatNumber(billInfor.thanhtoan) }}</td>
                                    </tr>
                                </tbody> -->
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
                                        <td>{{ formatNumber(item.gia) }}</td>
                                        <td>{{ formatNumber(item.giamgia) }}</td>
                                    </tr>
                                    <hr>
                                    <tr>
                                        <td colspan="5" class="fw-bold text-end bg-warning">Giảm: </td>
                                        <td class="fw-bold">{{ formatNumber(billInfor.giamgia) }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" class="fw-bold text-end bg-success">Tổng cộng:</td>
                                        <td class="fw-bold">{{ formatNumber(billInfor.thanhtoan) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end">
                            <div class="input-group input-group-sm mb-3" style="width: 46%;">
                                <span class="input-group-text fw-bold" id="inputGroup-sizing-sm">
                                    Chiết khấu combo (%):</span>
                                <input type="number" class="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" v-model="reduced">
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <div class="input-group input-group-sm mb-3" style="width: 29%;">
                                <span class=" input-group-text fw-bold" id="inputGroup-sizing-sm"
                                    style="font-size: 16px;">
                                    Thanh toán :
                                    {{ formatNumber(billInfor.thanhtoan) }}
                                    vnd
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-success ms-2" @click="onPrint">In hóa đơn</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import billService from '@/services/bill.service';

export default {
    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }

        function formatDateTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds} ${dateIn}/${month}/${year}`;
        }

        return {
            closeModal, formatDateTime, formatNumber
        };
    },

    props: {
        idBill: {
            type: Number,
        }
    },

    data() {
        return {
            reduced: 0,
            billInfor: {},
            listDish: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.billInfor = await billService.FindOneById(this.idBill);
                let dish = {};
                this.billInfor.chitietdatmon.forEach(element => {
                    if (Object.keys(element.khuyenmai).length == 0) {
                        dish = element.mon;
                        dish.id = element.mon.idmon;
                        dish.soluong = element.soluong;
                        dish.giamgia = 0;
                        this.listDish.push(dish);
                    } else {
                        this.reduced = element.khuyenmai.giatrikhuyenmai
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
                console.log(error);
            }
        },

        onPrint() {
            window.print();
        },
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
    margin: 20px 0px 20px 0px;
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

.status-busy {
    background-color: rgba(190, 0, 0, 0.926);
    padding: 10px;
    border-radius: 20px;
}
</style>