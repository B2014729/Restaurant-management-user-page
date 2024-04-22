<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Thông tin chi tiết khuyến mãi {{ promotion.idkhuyenmai }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4" style="min-height: 510px;">

                    <h6 class="fw-bold text-warning">Danh sách món ăn</h6>
                    <div>
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" style="width: 20px;">STT</th>
                                    <th scope="col" style="width: 100px;">Mã số</th>
                                    <th scope="col">Tên món</th>
                                    <th scope="col" style="width: 100px;">Số lượng</th>
                                    <th scope="col">Đơn giá (vnd)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in promotionDish" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item.idmon }}</td>
                                    <td>{{ item.tenmon }}</td>
                                    <td>{{ item.soluong }}</td>
                                    <td>{{ formatNumber(item.gia) }}</td>
                                </tr>
                                <hr>
                                <tr>
                                    <td colspan="4" class="fw-bold text-end bg-warning">Giảm {{
                                        promotion.giatrikhuyenmai }}%: </td>
                                    <td class="fw-bold">{{ formatNumber(promotion.giamgia) }} vnd</td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="fw-bold text-end bg-success">Tổng cộng: </td>
                                    <td class="fw-bold">{{ formatNumber(promotion.thanhtoan) }} vnd</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import promotionService from '@/services/promotion.service';

export default {
    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }

        function formatDateTime(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            closeModal, formatDateTime, formatNumber
        };
    },

    props: {
        id: {
            type: String,
        }
    },

    data() {
        return {
            promotion: {},
            promotionDish: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                let promotionFetch = await promotionService.FindOneById(this.id);
                this.promotion = promotionFetch.khuyenmai;
                this.promotionDish = promotionFetch.chitiet;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style scoped lang="css">
.modalBooking {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-booking-content {
    background-color: rgb(255, 255, 255);
    width: 50%;
    margin: 20px 0px 150px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 20px;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

.status-busy {
    background-color: rgba(190, 0, 0, 0.926);
    padding: 10px;
    border-radius: 20px;
}
</style>