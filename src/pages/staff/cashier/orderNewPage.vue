<template>
    <div>
        <detailOrderModal v-if="modalActive" @close="toggleModal(0)" :idOrder="idOrder" @onActive="onSend">
        </detailOrderModal>
        <p class="text-success pt-3 m-0 fs-5 fw-bold">Order gần đây</p>
        <table class="table table-striped table-hover mx-1">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Bàn</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Nhân viên</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listOrder" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.idban }}</td>
                    <td>{{ formatDateTime(item.thoidiemdat) }}</td>
                    <td>{{ item.nhanvien.hoten }}</td>
                    <td><span class="bg-warning px-3 py-1 rounded-4" style="font-size:14px">Chưa gửi</span></td>
                    <td class="d-flex w-100 justify-content-between">
                        <button class="btn-infor" @click="toggleModal(item.iddatmon)">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import orderService from "@/services/order.service";
import { io } from "socket.io-client";
import { ref } from 'vue';

import detailOrderModal from "@/components/modals/detailOrderModal.vue";
export default {
    components: {
        detailOrderModal
    },

    setup() {
        let modalActive = ref(false);
        let idOrder = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idOrder.value = id;
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
            formatDateTime, toggleModal, idOrder, modalActive
        }
    },

    data() {
        return {
            listOrder: [],
        };
    },

    async created() {
        await this.fetchData();
        const socket = io('http://localhost:8000');

        await socket.on('newOrder', () => {
            this.fetchData();
        });
    },



    methods: {
        async fetchData() {
            try {
                let date = new Date();
                this.listOrder = await orderService.GetOrderNotSendKitChen(date);
            } catch (error) {
                console.log(error);
            }
        },

        async onSend() {
            try {
                await orderService.SendToKitchen(this.idOrder).then((result) => {
                    if (result.statusCode == 200) {
                        this.modalActive = false;
                        if (this.listOrder.length > 1) {
                            this.fetchData();
                        } else {
                            this.listOrder = [];
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }

        }
    },
}

</script>

<style scoped>
.btn-infor {
    border: none;
    background-color: rgba(255, 255, 255, 0);
}

.btn-infor:hover>i {
    color: rgba(255, 140, 0, 0.929);
}

.btn-send-check {
    border: 1px solid green;
    border-radius: 5px;
    background-color: rgba(180, 0, 0, 0);
    margin-right: 10px;
}

.btn-send-check:hover>i {
    color: rgba(255, 140, 0, 0.929);
}
</style>