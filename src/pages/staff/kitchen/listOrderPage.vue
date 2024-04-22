<template>
    <h5 class="text-dark text-start fw-bold mt-2">Món đang đợi: {{ formatDate(date) }}</h5>
    <div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" style="width: 20px;">STT</th>
                    <th scope="col">Mã món</th>
                    <th scope="col" class="bg-secondary">Bàn</th>
                    <th scope="col">Tên món</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col" style="width: 80px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in queueDish" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td style="width: 90px;">{{ item.idmon }}</td>
                    <td style="width: 90px;" class="bg-secondary fw-bold">{{ item.idban }}</td>
                    <td style="width: 170px;">{{ item.tenmon }}</td>
                    <td style="width: 90px;">{{ item.soluong }}</td>
                    <td style="width: 90px;">{{ formatTime(item.thoidiemdat) }}</td>
                    <td>{{ item.ghichu }}</td>
                    <td>
                        <button class="btn-infor" @click="DishPaid(item.iddatmon, item.idmon)"><i
                                class="fa-solid fa-check-to-slot text-success"></i>
                        </button>
                    </td>
                </tr>
                <tr v-for="(item, index) in queueCombo" :key="index">
                    <th scope="row" style="background-color: rgb(70, 200, 0);">{{ index + 1 }}</th>
                    <td style="width: 90px; background-color: rgb(70, 200, 0);">{{ item.idcombo }}</td>
                    <td style="width: 90px; background-color: rgb(70, 200, 0);" class="bg-secondary fw-bold">{{
                        item.idban }}</td>
                    <td style="width: 170px; background-color: rgb(70, 200, 0);">{{ item.tencombo }}</td>
                    <td style="width: 90px; background-color: rgb(70, 200, 0);">{{ item.soluong }}</td>
                    <td style="width: 90px; background-color: rgb(70, 200, 0);">{{ formatTime(item.thoidiemdat) }}</td>
                    <td style="background-color: rgb(70, 200, 0);">
                        <ul>
                            <li class="text-start" v-for="(e, i) in queueCombo[index].chitiet" :key="i">
                                <span style="display: inline-block; width: 260px;">{{ e.tenmon }} </span>- SL:
                                {{ e.soluong * item.soluong }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <button class="btn-infor" @click="ComboPaid(item.iddatmon, item.idcombo)"><i
                                class="fa-solid fa-check-to-slot text-success"></i>
                        </button>
                    </td>
                </tr>
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import orderService from '@/services/order.service';
import { io } from "socket.io-client";

export default {
    setup() {
        function formatTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;

            return `${hours}:${minutes}:${seconds}`;
        }

        function formatDate(date) {
            let newDate = new Date(date);

            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            formatTime, formatDate
        }
    },

    data() {
        return {
            listOrder: [],
            queueDish: [],
            queueCombo: [],
            date: new Date(),
        };
    },

    async created() {
        await this.fetchData();
        const socket = io('http://localhost:8000');

        await socket.on('sendToKitchen', () => {
            this.fetchData();
        })
    },

    methods: {
        async fetchData() {
            try {
                this.listOrder = await orderService.FindAll();
                this.queueDish = [];
                this.queueCombo = [];
                if (this.listOrder.length > 0) {
                    this.listOrder.forEach((element) => {
                        if (element.trangthaiguibep == 1) {
                            element.thongtinchitiet.forEach((item) => {
                                if (item.trangthai == 0) {
                                    if (!Object.prototype.hasOwnProperty.call(item, 'khuyenmai')) {
                                        let dish = {};
                                        dish = item.mon;
                                        dish.thoidiemdat = element.thoidiemdat;
                                        dish.idban = element.idban;
                                        dish.iddatmon = element.iddatmon;
                                        dish.soluong = item.soluong;
                                        dish.ghichu = element.ghichu;
                                        this.queueDish.push(dish);
                                    } else {
                                        let itemCombo = {};
                                        itemCombo.thoidiemdat = element.thoidiemdat;
                                        itemCombo.iddatmon = element.iddatmon;
                                        itemCombo.soluong = item.soluong;
                                        itemCombo.idcombo = item.khuyenmai.idkhuyenmai;
                                        itemCombo.tencombo = item.khuyenmai.tenkhuyenmai;
                                        itemCombo.ghichu = element.ghichu;
                                        itemCombo.idban = element.idban;
                                        itemCombo.chitiet = item.chitiet;
                                        this.queueCombo.push(itemCombo);
                                    }
                                }
                            });
                        }
                    });
                }
                // console.log(this.queueDish);
            } catch (error) {
                console.log(error);
            }
        },

        async DishPaid(idorder, iddish) {
            try {
                console.log(idorder, iddish);
                await orderService.DishPaid(idorder, iddish, '100', this.$store.state.staff.token).then((result) => {
                    if (result.statusCode == 200) {
                        this.fetchData();
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        async ComboPaid(idorder, idcombo) {
            try {
                console.log(idorder, idcombo);
                await orderService.DishPaid(idorder, 100, idcombo, this.$store.state.staff.token).then((result) => {
                    if (result.statusCode == 200) {
                        this.fetchData();
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped></style>