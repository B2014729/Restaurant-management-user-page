<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold text-dark text-start">Cập nhật hàng hóa trong kho</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <!-- <div>
                    <h6 class="fw-bold text-dark text-start">Thông tin hàng hóa:</h6>
                    <p class="m-0 text-dark text-start"><span class="text-dark text-start"
                            style="display: inline-block; width: 140px;">Mã
                            hàng hóa</span>: {{
                                dishInfor.idhanghoa }}</p>
                    <p class="m-0 text-dark text-start"><span class="text-dark text-start"
                            style="display: inline-block; width: 140px;">Tên hàng
                            hóa</span>: {{
                                dishInfor.tenhanghoa }}</p>
                    <p class="m-0 text-dark text-start"><span class="text-dark text-start"
                            style="display: inline-block; width: 140px;">Hạn sử
                            dụng</span>: {{
                                dishInfor.hansudung
                            }} tháng kể từ ngày sản xuất</p>
                </div> -->
                <div style="min-height: 200px;">
                    <h6 class="fw-bold text-start text-dark">Thông tin chi tiết:</h6>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">STT</th>
                                <th scope="col" class="text-center">Tên hàng hóa</th>
                                <th scope="col" class="text-center">Số lượng</th>
                                <th scope="col" class="text-center">Đơn vị tính</th>
                                <th scope="col" class="text-center">Ngày sản xuất</th>
                                <th scope="col" class="text-center">Ngày nhập</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in detailInfor" :key="index">
                                <td class="text-center" style="padding-top: 13px;">{{ index + 1 }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ dishInfor.tenhanghoa }}
                                </td>
                                <td class="text-center" style="padding-top: 13px;">
                                    <input style="width:70px;" type="number" v-model="item.soluong">
                                </td>
                                <td class="text-center" style="padding-top: 13px;">{{ dishInfor.tendonvi }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ formatTime(item.ngaysanxuat) }}
                                </td>
                                <td class="text-center" style="padding-top: 13px;">{{ formatTime(item.ngaynhap)
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-auto w-100">
                <div class="mt-4 me-3">
                    <button type="button" class="btn btn-outline-danger" @click="closeModal">Đóng</button>
                    <button type="button" class="btn btn-success ms-2" @click="UpdateDishInDepot">Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import depotService from '@/services/depot.service';

export default {
    props: {
        id: {
            type: Number,
            require: true,
        }
    },

    setup(props, context) {

        const closeModal = () => {
            context.emit("close");
        }


        function formatTime(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return ` ${dateIn}/${month}/${year}`;
        }

        return { closeModal, formatTime, };
    },

    data() {
        return {
            dishInfor: {},
            detailInfor: [],
            quantity: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                let detailDishInDepot = await depotService.FindOneById(this.id);
                this.dishInfor = detailDishInDepot.hanghoa;
                this.detailInfor = detailDishInDepot.chitiet;
            } catch (error) {
                console.log(error);
            }
        },

        async UpdateDishInDepot() {
            try {
                let resultUpdate = await depotService.UpdateGoodsInDepot(this.detailInfor);
                if (resultUpdate.statusCode == 200) {
                    this.$emit('statusAction', 'success')
                } else {
                    this.$emit('statusAction', 'error')
                }
            } catch (error) {
                console.log(error);
                this.$emit('statusAction', 'error')
            }
        }
    }
}
</script>
<style scoped lang="css">
.modalBill {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.423);
}

.modal-bill-content {
    background-color: white;
    width: 50%;
    height: 52%;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
    overflow: auto;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 0px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}
</style>