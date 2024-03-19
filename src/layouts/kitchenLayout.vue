<template>
    <div>
        <detailPersonnalModal v-if="modalActivePersonnal" @close="toggleModalPersonnal"></detailPersonnalModal>
        <calendierWorkStaffModal v-if="modalActiveWorkWeek" @close="toggleModalWorkWeek">
        </calendierWorkStaffModal>
        <navKitchenComponent @onChange="onChange($event)" @logout="logout">
        </navKitchenComponent>
        <div class="container w-75" style="padding: 0px 60px; min-height: 600px;">
            <listOrderPage v-if="order"></listOrderPage>
            <listOrderPaidPage v-if="orderpaid"></listOrderPaidPage>
            <depotManagerPage v-if="depot"></depotManagerPage>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import navKitchenComponent from '@/components/kitchen/navKitchenComponent.vue';

import detailPersonnalModal from '@/components/modals/detailPersonnalModal.vue';
import calendierWorkStaffModal from '@/components/modals/calendierWorkStaffModal.vue';

import listOrderPage from '@/pages/staff/kitchen/listOrderPage.vue';
import listOrderPaidPage from '@/pages/staff/kitchen/listOrderPaidPage.vue';
import depotManagerPage from '@/pages/staff/kitchen/depotManagerPage.vue';

export default {
    components: {
        navKitchenComponent,
        detailPersonnalModal,
        calendierWorkStaffModal,
        listOrderPage, listOrderPaidPage, depotManagerPage
    },

    setup() {
        // Quan  li trang thai trang
        let order = ref(true);
        let orderpaid = ref(false);
        let depot = ref(false);

        const onChange = (data) => {
            switch (data) {
                case 'order':
                    order.value = true;
                    orderpaid.value = false;
                    depot.value = false;
                    break;
                case 'orderpaid':
                    order.value = false;
                    orderpaid.value = true;
                    depot.value = false;
                    break;
                case 'depot':
                    order.value = false;
                    orderpaid.value = false;
                    depot.value = true;
                    break;
                case 'personnal':
                    order.value = true;
                    toggleModalPersonnal();
                    break;
                case 'workWeek':
                    order.value = true;
                    toggleModalWorkWeek();
                    break;
                default:
                    break;
            }
        }

        // Quan li modal thong tin ca nhan
        let modalActivePersonnal = ref(false);

        const toggleModalPersonnal = () => {
            modalActivePersonnal.value = !modalActivePersonnal.value;
        }

        // Quan li modal lich lam viec
        let modalActiveWorkWeek = ref(false);

        const toggleModalWorkWeek = () => {
            modalActiveWorkWeek.value = !modalActiveWorkWeek.value;
        }

        return {
            order, orderpaid, depot, onChange,
            modalActivePersonnal, toggleModalPersonnal, modalActiveWorkWeek, toggleModalWorkWeek,
        };
    },

    methods: {
        logout() {
            this.$cookies.remove('jwt');
            this.$store.dispatch('staff', null);
            this.$router.push('/');
        },
    }
}
</script>