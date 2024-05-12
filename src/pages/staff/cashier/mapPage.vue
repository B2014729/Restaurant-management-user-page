<template>
    <detailTableModal v-if="modalActive" @close="toggleModal(0)" :idTable="idTable"></detailTableModal>
    <h5 class="text-warning fw-bold mt-1">Danh sách trạng thái bàn ăn:</h5>
    <div class="row ms-3">
        <div v-for="(item, index) in [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]"
            :key="index" class="col-md-2 col-sm-4 col-12 p-3 m-2 default"
            :class="{ 'active': checkIssetTable(item), 'current': checkIssetBooking(item) }" @click="toggleModal(item)">
            <span class="text-dark">Bàn {{ item }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import detailTableModal from '@/components/modals/detailTableModal.vue';
import billService from '@/services/bill.service';
import bookingService from '@/services/booking.service';
// import bookingService from '@/services/booking.service';
export default {
    components: {
        detailTableModal,
    },

    setup() {
        let modalActive = ref(false);
        let idTable = ref(0);
        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idTable.value = id;
        }

        return { modalActive, toggleModal, idTable };
    },

    data() {
        return {
            listBillOnTableUnpaid: [],
            listBookingTable: [],
        };
    },

    async created() {
        await this.fetchData();
        await this.listBookingsTableCurrent();
    },

    methods: {
        async fetchData() {
            try {
                this.listBillOnTableUnpaid = await billService.GetListBillUnpaid();
            } catch (error) {
                console.log(error);
            }
        },

        checkIssetTable(idtable) { //Kiem tra id ban co trong danh sach ban dang an khong
            for (let index = 0; index < this.listBillOnTableUnpaid.length; index++) {
                const element = this.listBillOnTableUnpaid[index];
                if (element.idban === idtable) {
                    return true;
                }
            }
            return false;
        },

        checkIssetBooking(idtable) {
            return this.listBookingTable[idtable];
        },

        async listBookingsTableCurrent() {
            let dateNow = new Date();
            let dateElementTomorrow = new Date();
            dateElementTomorrow.setDate(dateElementTomorrow.getDate() + 1);
            for (let idTable = 10; idTable < 30; idTable++) {
                try {
                    let listBookingsTable = await bookingService.GetBookingsTable(idTable);

                    if (listBookingsTable.length > 0) {
                        for (let index = 0; index < listBookingsTable.length; index++) {
                            const element = listBookingsTable[index];
                            let dateElement = new Date(element.ngaygio);
                            if (dateElement > dateNow && dateElement < dateElementTomorrow) {
                                this.listBookingTable[idTable] = true;
                                break;
                            }
                        }
                    }
                    if (this.listBookingTable[idTable] != true)
                        this.listBookingTable[idTable] = false;
                } catch (error) {
                    //console.log(error);
                    this.listBookingTable[idTable] = false;
                }
            }
        }
    }
}
</script>

<style scoped>
.active {
    background-color: rgba(234, 2, 2, 0.845);
    color: antiquewhite;
    border: 1px solid black;
    cursor: pointer;
}

.current {
    background-color: rgba(255, 255, 0, 0.667);
}

.default {
    border: 1px solid black;
    cursor: pointer;
}
</style>