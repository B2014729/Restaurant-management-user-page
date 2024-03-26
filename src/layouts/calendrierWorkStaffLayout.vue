<template>
    <div>
        <navCalendrierWorkStaffComponent @onChange="onChange($event)"></navCalendrierWorkStaffComponent>
        <div class="container">
            <calendrierWorkStaffPage v-if="calendrier"> </calendrierWorkStaffPage>
            <registerWorkStaffPage v-if="register"></registerWorkStaffPage>
        </div>

    </div>
</template>
<script>
import { ref } from 'vue';
import navCalendrierWorkStaffComponent from '@/components/navCalendrierWorkStaffComponent.vue';

import calendrierWorkStaffPage from '@/pages/staff/calendrierWorkStaffPage.vue';
import registerWorkStaffPage from '@/pages/staff/registerWorkStaffPage.vue';
export default {
    components: {
        navCalendrierWorkStaffComponent,
        calendrierWorkStaffPage,
        registerWorkStaffPage
    },

    setup() {
        let calendrier = ref(true);
        let register = ref(false);

        const onChange = (data) => {
            switch (data) {
                case 'calendrier':
                    calendrier.value = true;
                    register.value = false;
                    break;
                case 'register':
                    calendrier.value = false;
                    register.value = true;
                    break;
                default:
                    break;
            }
        }
        return {
            calendrier, register, onChange,
        }
    }
}
</script>