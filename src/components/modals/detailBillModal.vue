<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Thanh toán hóa đơn 2</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4" style="min-height: 510px;">
                    <div class="d-flex justify-content-between">
                        <div class="float-start">
                            <h6 class="text-dark fw-bold text-start">Mã HĐ: 2</h6>
                            <h6 class="text-dark fw-bold text-start">Nhân viên: Nguyễn Anh Thư</h6>
                        </div>
                        <div class="me-2">
                            <h6 class="text-dark fw-bold text-start">Bàn số: 13</h6>
                            <h6 class="text-dark fw-bold">Giờ vào: 18:39 03/03/2024</h6>
                        </div>
                    </div>
                    <div>
                        <h6 class="fw-bold text-warning">Danh sách món đã dùng</h6>
                        <div>
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 20px;">STT</th>
                                        <th scope="col">Tên món</th>
                                        <th scope="col" style="width: 100px;">Số lượng</th>
                                        <th scope="col">Đơn giá (vnd)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Lẩu cá hồi</td>
                                        <td>1</td>
                                        <td>130,000</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="fw-bold text-end bg-warning">Tổng cộng</td>
                                        <td class="fw-bold">1,309,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end">
                            <div class="input-group input-group-sm mb-3" style="width: 46%;">
                                <span class="input-group-text fw-bold   " id="inputGroup-sizing-sm">
                                    Chiết khấu (%):</span>
                                <input type="number" class="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-success ms-2" @click="onPrint">In hóa đơn</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        return {
            closeModal,
        };
    },

    props: {
        idTable: {
            type: Number,
        }
    },

    async created() {

    },

    methods: {
        onPrint() {
            window.print();
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
    margin: 50px 0px 50px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 50px;
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