<template>
    <detailTableModal v-if="modalActive" @close="toggleModal(-1)" :idTable="idTable"></detailTableModal>
    <h5 class="text-warning fw-bold mt-1">Danh sách trạng thái bàn ăn:</h5>
    <div class="row ms-3">
        <div v-for="(item, index) in  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
            :key="index" class="col-md-2 col-sm-4 col-12 p-3 m-2"
            :class="{ 'active': index < 4, 'default': index >= 4 }" @click="toggleModal(item)">
            <span class="text-dark">Bàn {{ item }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import detailTableModal from '@/components/modals/detailTableModal.vue';
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