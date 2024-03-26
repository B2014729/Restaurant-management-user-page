<template>
    <div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Ngày</th>
                    <th v-for="(item, index) in idweek" :key="index" scope="col" class="text-center"
                        style="width:125px">
                        {{ item }}/ {{ month }}
                    </th>
                    <th scope="col" class="text-center">Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" class="text-center align-middle">Ca </th>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay1">
                            <option value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay2">
                            <option value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay3">
                            <option value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay4">
                            <option value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay5">
                            <option value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay6">
                            <option value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="workWeek.ngay7">
                            <option selected value="0">
                                00:00 - 00:00
                            </option>
                            <option value="1">
                                06:00 - 12:00
                            </option>
                            <option value="2">
                                12:00 - 18:00
                            </option>
                            <option value="3">
                                18:00 - 00:00
                            </option>
                            <option value="4">
                                06:00 - 00:00
                            </option>
                            <option value="5">
                                06:00 - 18:00
                            </option>
                            <option value="6">
                                12:00 - 00:00
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex  justify-content-end"> <button class="btn btn-success" @click="submit">Lưu</button></div>
    </div>

</template>

<script>
import { ref } from 'vue';

import calendrierService from '@/services/calendrier.service';
import alertMessage from '@/components/alertMessage/alertMessage.vue';

export default {
    components: {
        alertMessage,
    },

    props: {
        idweek: {
            type: Array,
        },

        idWorkCalendrier: {
            type: Number,
        },

        month: {
            type: Number
        }
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        return {
            showAlert, status, messageAlert,
        };
    },

    data() {
        return {
            workWeek: {
                ngay1: 0,
                ngay2: 0,
                ngay3: 0,
                ngay4: 0,
                ngay5: 0,
                ngay6: 0,
                ngay7: 0,
            },
        };
    },

    methods: {
        async submit() {
            this.workWeek.ngay1 = Number(this.workWeek.ngay1);
            this.workWeek.ngay2 = Number(this.workWeek.ngay2);
            this.workWeek.ngay3 = Number(this.workWeek.ngay3);
            this.workWeek.ngay4 = Number(this.workWeek.ngay4);
            this.workWeek.ngay5 = Number(this.workWeek.ngay5);
            this.workWeek.ngay6 = Number(this.workWeek.ngay6);
            this.workWeek.ngay7 = Number(this.workWeek.ngay7);

            try {
                console.log(this.workWeek, this.idWorkCalendrier, this.$store.state.staff.token)
                await calendrierService.RegisterWorkCalendrier(this.workWeek, this.idWorkCalendrier, this.$store.state.staff.token)
                    .then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Đã đăng kí lịch làm việc!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        } else {
                            this.messageAlert = 'Bạn đã đăng kí tuần này, không thể cập nhật!';
                            this.status = 'danger';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    });

            } catch (error) {
                console.log(error);
                this.messageAlert = 'Bạn đã đăng kí tuần này, không thể cập nhật!';
                this.status = 'danger';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }

        }
    }
}
</script>
<style scoped></style>