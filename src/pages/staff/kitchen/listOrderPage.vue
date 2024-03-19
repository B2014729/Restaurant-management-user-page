<template>
    <h5 class="text-dark text-start fw-bold mt-2">Món đang đợi:</h5>
    <div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" style="width: 20px;">STT</th>
                    <th scope="col">Mã món</th>
                    <th scope="col" class="bg-secondary">Bàn</th>
                    <th scope="col">Tên món</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col" style="width: 80px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in queueDish" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td style="width: 90px;">{{ item.mon.idmon }}</td>
                    <td style="width: 90px;" class="bg-secondary fw-bold">{{ item.idban }}</td>
                    <td style="width: 250px;">{{ item.mon.tenmon }}</td>
                    <td style="width: 90px;">{{ item.soluong }}</td>
                    <td>{{ item.ghichu }}</td>
                    <td>
                        <button class="btn-infor" @click="DishPaid(item.iddatmon, item.mon.idmon)"><i
                                class="fa-solid fa-check-to-slot text-success"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import orderService from '@/services/order.service';
import { io } from "socket.io-client";

export default {
    data() {
        return {
            listOrder: [],
            queueDish: [],
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
                if (this.listOrder.length > 0) {
                    this.listOrder.forEach((element) => {
                        if (element.trangthaiguibep == 1) {
                            element.thongtinchitiet.forEach((item) => {
                                if (item.trangthai == 0) {
                                    item.idban = element.idban;
                                    item.iddatmon = element.iddatmon;
                                    this.queueDish.push(item);
                                }
                            });
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        async DishPaid(idorder, iddish) {
            try {
                await orderService.DishPaid(idorder, iddish, this.$store.state.staff.token).then((result) => {
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