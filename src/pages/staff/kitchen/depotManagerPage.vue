<template>
    <detailDepotModal v-if="modalActive" :id="idDish" @close="toggleModal(0)" @statusAction="onAlertMessage($event)">
    </detailDepotModal>
    <h5 class="text-dark text-start fw-bold mt-2">Báo cáo thông tin kho: </h5>
    <alertMessage style="right: -270px;  top: 30px;" v-if="showAlert" :status="status" :message="messageAlert">
    </alertMessage>
    <div>
        <searchComponent class="mb-2" @submit="search($event)" v-model="searchText"></searchComponent>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col" class="text-center">Mã hàng hóa</th>
                    <th scope="col" class="text-center">Tên hàng hóa</th>
                    <th scope="col" class="text-center" style="width: 90px;">Số lượng</th>
                    <th scope="col" class="text-center" style="width: 120px;">Đơn vị tính</th>
                    <th scope="col" class="text-center">Ngày nhập mới</th>
                    <th scope="col" class="text-center" style="width: 50px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in searchDish" :key="index">
                    <th scope="row" style="width: 50px; text-align: center;">{{ index + 1 }}</th>
                    <td style="width: 140px; text-align: center;">
                        {{ listId[index] }}
                    </td>
                    <td class="text-center">{{ item.hanghoa.tenhanghoa }}</td>
                    <td class="text-center">
                        {{ listQuantity[index] }}
                    </td>
                    <td class="text-center">
                        {{ item.hanghoa.tendonvi }}
                    </td>
                    <td class="text-center">
                        {{ formatDate(item.ngaynhap) }}
                    </td>
                    <th scope="row" class="text-center">
                        <button type="button" class="btn" @click="toggleModal(item.idhanghoa)">
                            <i class="fa-solid fa-circle-plus text-success"></i>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { ref } from 'vue';
import searchComponent from '@/components/cashier/searchComponent.vue';
import depotService from '@/services/depot.service'
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import detailDepotModal from '@/components/modals/detailDepotModal.vue';
export default {
    components: {
        searchComponent, alertMessage, detailDepotModal
    },

    computed: {
        listDishString() {
            return this.listDish.map((dish) => {
                const { idhanghoa, } = dish;
                const { tenhanghoa } = dish.hanghoa;
                return [idhanghoa, tenhanghoa].join("");
            });
        },

        searchDish() {
            if (!this.searchText) {
                return this.listDish
            }
            return this.listDish.filter((_bill, index) => {
                return this.listDishString[index].includes(this.searchText);
            });
        }
    },

    setup() {
        //Quan li alert meesage
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        function formatDate(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        let idDish = ref(0);
        let modalActive = ref(false);

        const toggleModal = (id) => {
            idDish.value = id;
            modalActive.value = !modalActive.value;
        }

        return {
            showAlert, status, messageAlert,
            formatDate, idDish, modalActive, toggleModal,
        }
    },

    data() {
        return {
            searchText: '',
            listDish: [],
            time: new Date(),
            listQuantity: [],
            listId: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listQuantity = [];
                this.listId = [];
                this.listDish = await depotService.FindAll();
                this.listDish.forEach((element) => {
                    this.listId.push(element.idhanghoa);
                    this.listQuantity.push(element.soluong);
                })
            } catch (error) {
                console.log(error);
            }
        },

        async onUpdate() {
            try {
                await depotService.Update(this.listId, this.listQuantity).then((result) => {
                    if (result.statusCode == 200) {
                        this.fetchData();
                        this.showAlert = true;
                        this.messageAlert = 'Đã cập nhật thông tin kho';
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                        this.status = 'success';
                    }
                });
            } catch (error) {
                this.showAlert = true;
                this.messageAlert = 'Lỗi khi cập nhật thông tin kho';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'danger';
                console.log(error);
            }
        },

        search() {
            console.log(this.searchText);
        },

        async onAlertMessage(status) {
            this.modalActive = false;
            if (status == 'success') {
                await this.fetchData();
                this.showAlert = true;
                this.messageAlert = 'Đã cập nhật thông tin kho!';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'success';
            } else {
                this.showAlert = true;
                this.messageAlert = 'Cập nhật thông tin kho thất bại!';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'danger';
            }
        }
    }

}</script>

<style scoped></style>