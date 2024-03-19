<template>
    <div>
        <detailBillModal v-if="modalActiveDetail" :idBill="idBillDetail" @close="toggleModalDetailBill(0)">
        </detailBillModal>
        <confirmPayment v-if="modalConfirm" :idTable="idTableConfirmPayment" :message="message"
            @close="toggleModalConfirm(0)" @onActive="onConfirmPayment($event)">
        </confirmPayment>

        <h6 class="text-dark text-start ms-2 mt-3 fw-bold">
            Danh sách hóa đơn trong hôm nay: {{ date.getDate() }}/{{ date.getMonth() + 1 }}/{{ date.getFullYear() }}
        </h6>
        <div class="ms-2">
            <searchComponent class="mb-2" @submit="search($event)" v-model="searchText"></searchComponent>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" style="width: 20px;">STT</th>
                        <th scope="col">Mã HĐ</th>
                        <th scope="col">Bàn</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Thanh toán(vnd)</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col" style="width: 80px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchBill" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.idhoadon }}</td>
                        <td>{{ item.idban }}</td>
                        <td>{{ getTimeInDate(item.ngaygiotao) }}</td>
                        <td>{{ formatNumber(item.thanhtoan) }}</td>

                        <td v-if="item.trangthai == 1" class="text-success fw-bold">Đã thu</td>
                        <td v-if="item.trangthai == 0" class="text-danger fw-bold">Chưa thu</td>
                        <td>
                            <button class="btn-infor" @click="toggleModalDetailBill(item.idhoadon)"><i
                                    class="fa-solid fa-circle-info text-warning"></i></button>
                            <button class="btn-infor"
                                @click="toggleModalConfirm(item.idban, item.nhanvienlap.idnhanvien)"><i
                                    class="fa-solid fa-check-to-slot text-success"></i></button>
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
import billService from '@/services/bill.service';

export default {
    components: {
        detailBillModal, confirmPayment, searchComponent
    },

    computed: {
        billListString() {
            return this.billList.map((bill) => {
                const { idhoadon, idban, } = bill;
                return [idhoadon, idban].join("");
            });
        },

        searchBill() {
            if (!this.searchText) {
                return this.billList
            }
            return this.billList.filter((_bill, index) => {
                return this.billListString[index].includes(this.searchText);
            });
        }
    },

    setup() {
        let modalActiveDetail = ref(false);
        let modalConfirm = ref(false);
        let idBillDetail = ref(0);
        let idTableConfirmPayment = ref(0);
        let idStaff = ref(0);

        let message = 'Thanh toán hóa đơn';

        const toggleModalDetailBill = (id) => {
            idBillDetail.value = id;
            modalActiveDetail.value = !modalActiveDetail.value;
        }

        const toggleModalConfirm = (idtable, idstaff) => {
            idStaff.value = idstaff;
            idTableConfirmPayment.value = idtable;
            modalConfirm.value = !modalConfirm.value;
        }

        const getTimeInDate = (d) => {
            let date = new Date(d);
            let hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
            let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
            return `${hours}:${minutes}`;
        }

        const formatNumber = (number) => {
            let numberFormat = number.toLocaleString("vi-VN") + 'đ'
            return numberFormat;
        }

        return {
            modalActiveDetail, idBillDetail, idTableConfirmPayment, idStaff,
            toggleModalDetailBill, modalConfirm,
            toggleModalConfirm, message, getTimeInDate, formatNumber
        }
    },

    data() {
        return {
            date: new Date(),
            searchText: '',
            billList: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async onConfirmPayment(idtable) {
            this.modalConfirm = false;
            try {
                await billService.UpdateStatusPayment(idtable, this.idStaff);
                await this.fetchData();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchData() {
            try {
                let date = new Date();
                this.billList = await billService.FindAllByDate(date);
            } catch (error) {
                console.log(error);
            }
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