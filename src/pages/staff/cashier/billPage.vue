<template>
    <div>
        <detailBillModal v-if="modalActiveDetail" :idBill="idBillDetail" @close="toggleModalDetailBill(0)">
        </detailBillModal>
        <confirmPayment v-if="modalConfirm" :message="message" @close="toggleModalConfirm" @onActive="onConfirmPayment">
        </confirmPayment>

        <h6 class="text-warning text-start ms-2 mt-3 fw-bold">
            Danh sách hóa đơn trong hôm nay: 03/03/2024</h6>
        <div class="ms-2">
            <searchComponent class="mb-2" @submit="search($event)" v-model="searchText"></searchComponent>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" style="width: 20px;">STT</th>
                        <th scope="col">Mã HĐ</th>
                        <th scope="col">Bàn</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Thanh toán</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col" style="width: 80px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>234</td>
                        <td>12</td>
                        <td>18:34</td>
                        <td>240,000</td>
                        <td class="text-danger fw-bold">Chưa thu</td>
                        <td>
                            <button class="btn-infor" @click="toggleModalDetailBill(2)"><i
                                    class="fa-solid fa-circle-info text-warning"></i></button>
                            <button class="btn-infor" @click="toggleModalConfirm"><i
                                    class="fa-solid fa-check-to-slot text-success"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>234</td>
                        <td>12</td>
                        <td>18:34</td>
                        <td>240,000</td>
                        <td class="text-success fw-bold">Đã thu</td>
                        <td>
                            <button class="btn-infor"><i class="fa-solid fa-circle-info text-warning"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>234</td>
                        <td>12</td>
                        <td>18:34</td>
                        <td>240,000</td>
                        <td class="text-danger fw-bold">Chưa thu</td>
                        <td>
                            <button class="btn-infor"><i class="fa-solid fa-circle-info text-warning"></i></button>
                            <button class="btn-infor"> <i class="fa-solid fa-check-to-slot text-success"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>234</td>
                        <td>12</td>
                        <td>18:34</td>
                        <td>240,000</td>
                        <td class="text-success fw-bold">Đã thu</td>
                        <td>
                            <button class="btn-infor"><i class="fa-solid fa-circle-info text-warning"></i></button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import detailBillModal from '@/components/modals/detailBillModal.vue';
import confirmPayment from '@/components/modals/confirmPayment.vue';
import searchComponent from '@/components/cashier/searchComponent.vue';

export default {
    components: {
        detailBillModal, confirmPayment, searchComponent
    },

    setup() {
        let modalActiveDetail = ref(false);
        let modalConfirm = ref(false);
        let idBillDetail = ref(0);

        let message = 'Thanh toán hóa đơn';

        const toggleModalDetailBill = (id) => {
            idBillDetail.value = id;
            modalActiveDetail.value = !modalActiveDetail.value;
        }

        const toggleModalConfirm = () => {
            modalConfirm.value = !modalConfirm.value;
        }

        return {
            modalActiveDetail, idBillDetail,
            toggleModalDetailBill, modalConfirm,
            toggleModalConfirm, message
        }
    },

    data() {
        return {
            searchText: '',
        };
    },

    methods: {
        onConfirmPayment() {
            console.log(324234);
            this.modalConfirm = false;
        }
    }
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
</style>