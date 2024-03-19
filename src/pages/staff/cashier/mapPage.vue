<template>
    <detailTableModal v-if="modalActive" @close="toggleModal(0)" :idTable="idTable"></detailTableModal>
    <h5 class="text-warning fw-bold mt-1">Danh sách trạng thái bàn ăn:</h5>
    <div class="row ms-3">
        <div v-for="(item, index) in  [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]"
            :key="index" class="col-md-2 col-sm-4 col-12 p-3 m-2 default" :class="{ 'active': checkIssetTable(item) }"
            @click="toggleModal(item)">
            <span class="text-dark">Bàn {{ item }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import detailTableModal from '@/components/modals/detailTableModal.vue';
import billService from '@/services/bill.service';
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

        };
    },
    async created() {
        try {
            await this.fetchData();
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        async fetchData() {
            this.listBillOnTableUnpaid = await billService.GetListBillUnpaid();
        },

        checkIssetTable(idtable) { //Kiem tra id ban cos trong danh sach ban dang an khong
            for (let index = 0; index < this.listBillOnTableUnpaid.length; index++) {
                const element = this.listBillOnTableUnpaid[index];
                if (element.idban === idtable) {
                    return true;
                }
            }
            return false;
        }
    }


}
</script>

<style scoped>
.active {
    background-color: rgba(189, 0, 0, 0.69);
    color: antiquewhite;
    border: 1px solid black;
    cursor: pointer;
}

.default {
    border: 1px solid black;
    cursor: pointer;
}
</style>