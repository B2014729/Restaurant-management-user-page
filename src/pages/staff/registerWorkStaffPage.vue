<template>
    <div class="p-3 d-flex flex-column">
        <div class="row text-start mt-0">
            <div class="p-3">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <h4 class="text-secondary fw-bold">Đăng kí lịch làm việc:</h4>

                        <div class="ms-4 d-flex">
                            <select class="form-select" aria-label="Default select example" v-model="phase"
                                @change="onChangePhases">
                                <option v-for="(item, index) in phaseList" :key="index" :value="item.idgiaidoan">
                                    {{ item.ngaybatdau }} - {{ item.ngayketthuc }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <ul class="d-flex">
                        <li style="list-style: none; font-size: 13px;" class="me-4 text-success"><i
                                class="fa-solid fa-circle  text-success"></i>
                            Ca sáng (1)
                        </li>
                        <li style="list-style: none; font-size: 13px;" class="me-4 text-warning"><i
                                class="fa-solid fa-circle  text-warning"></i>
                            Ca chiều (2)
                        </li>
                        <li style="list-style: none; font-size: 13px;" class="me-4 text-dark"><i
                                class="fa-solid fa-circle  text-dark"></i>
                            Ca tối (3)
                        </li>
                        <li style="list-style: none; font-size: 13px;" class="me-4 text-danger"><i
                                class="fa-solid fa-circle  text-danger"></i>
                            Ca full (4)
                        </li>
                        <li style="list-style: none; font-size: 13px;" class="me-4 text-primary"><i
                                class="fa-solid fa-circle text-primary"></i>
                            Ca sáng + chiều (5)
                        </li>
                        <li style="list-style: none; font-size: 13px;" class="me-4 text-secondary"><i
                                class="fa-solid fa-circle  text-secondary"></i>
                            Ca chiều + tối (6)
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="mt-3">
                        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse1Example" aria-expanded="false" aria-controls="collapse1Example">
                            Đăng kí lịch làm tuần 1 <i class="fa-solid fa-chevron-down ms-2"
                                style="font-size: 12px;"></i>
                        </button>
                        <div class="collapse" id="collapse1Example">
                            <div class="card card-body">
                                <registerWorkComponent :idweek="[1, 2, 3, 4, 5, 6, 7]"
                                    :idWorkCalendrier="listIdCalendrierInPhase[0]" :month="month">
                                </registerWorkComponent>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse2Example" aria-expanded="false" aria-controls="collapse2Example">
                            Đăng kí lịch làm tuần 2 <i class="fa-solid fa-chevron-down ms-2"
                                style="font-size: 12px;"></i>
                        </button>
                        <div class="collapse" id="collapse2Example">
                            <div class="card card-body">
                                <registerWorkComponent :idweek="[8, 9, 10, 11, 12, 13, 14]"
                                    :idWorkCalendrier="listIdCalendrierInPhase[1]" :month="month">
                                </registerWorkComponent>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse3Example" aria-expanded="false" aria-controls="collapse3Example">
                            Đăng kí lịch làm tuần 3 <i class="fa-solid fa-chevron-down ms-2"
                                style="font-size: 12px;"></i>
                        </button>
                        <div class="collapse" id="collapse3Example">
                            <div class="card card-body">
                                <registerWorkComponent :idweek="[15, 16, 17, 18, 19, 20, 21]"
                                    :idWorkCalendrier="listIdCalendrierInPhase[2]" :month="month">
                                </registerWorkComponent>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div>
                            <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse4Example" aria-expanded="false"
                                aria-controls="collapse4Example">
                                Đăng kí lịch làm tuần 4 <i class="fa-solid fa-chevron-down ms-2"
                                    style="font-size: 12px;"></i>
                            </button>
                            <div class="collapse" id="collapse4Example">
                                <div class="card card-body">
                                    <registerWorkComponent :idweek="[22, 23, 24, 25, 26, 27, 28]"
                                        :idWorkCalendrier="listIdCalendrierInPhase[3]" :month="month">
                                    </registerWorkComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse5Example" aria-expanded="false" aria-controls="collapse5Example">
                            Đăng kí lịch làm tuần 5 <i class="fa-solid fa-chevron-down ms-2"
                                style="font-size: 12px;"></i>
                        </button>
                        <div class="collapse" id="collapse5Example">
                            <div class="card card-body">
                                <registerWorkComponent :month="month" :idweek="[29, 30, 31, '', '', '', '']"
                                    :idWorkCalendrier="listIdCalendrierInPhase[4]">
                                </registerWorkComponent>
                            </div>
                        </div>
                    </div>
                    <div class="button-scroll">
                        <button class="btn btn-outline-secondary rounded-circle" @click="scrollToTop">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import moment from 'moment';
import { ref } from 'vue';
import registerWorkComponent from '@/components/registerWorkComponent.vue';
import calendrierService from '@/services/calendrier.service';
export default {
    components: {
        registerWorkComponent,
    },

    setup() {
        let modalActive = ref(false);
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        }
        return {
            modalActive, toggleModal, showAlert, status, messageAlert,
        };
    },

    data() {
        return {
            phase: '1',
            phaseList: [],
            month: 1,
            listIdCalendrierInPhase: [],
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
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async fetchData() {
            try {
                let listId = await calendrierService.FindAllIdCalendrierWithPhase(this.phase);
                if (listId.length > 0) {
                    this.listIdCalendrierInPhase = [];
                    listId.forEach(element => {
                        this.listIdCalendrierInPhase.push(element.idlichlamviec);
                    })
                }

                this.phaseList = await calendrierService.GetPhase();

                this.phaseList.forEach(element => {
                    if (element.idgiaidoan == this.phase) {
                        this.month = (new Date(element.ngaybatdau).getMonth()) + 1;
                    }
                });

                if (this.phaseList.length != 0) {
                    this.phaseList.forEach((element) => {
                        element.ngaybatdau = moment(element.ngaybatdau).format("DD/MM/YYYY");
                        element.ngayketthuc = moment(element.ngayketthuc).format("DD/MM/YYYY");
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        async onChangePhases() {
            await this.fetchData();
            console.log(this.listIdCalendrierInPhase);
        },
    }
}
</script>

<style scoped>
.button-scroll {
    position: fixed;
    bottom: 10px;
    right: 20px;
}
</style>