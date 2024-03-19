<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Thông tin cá nhân</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4" style="min-height: 510px;">
                    <div class="d-flex justify-content-center">
                        <form class="w-100" @submit.prevent="{ }">
                            <div class="row">
                                <div class="col-md-4 col-12">
                                    <div class="d-flex justify-content-center">
                                        <img src="https://image.phunuonline.com.vn/fckeditor/upload/2022/20220815/images/4176_3-2.jpg"
                                            alt="" class="w-75 rounded-4">
                                    </div>
                                    <div class="d-flex justify-content-center form-floating my-2">
                                        <input class=" w-75 form-control" id="avatar" type="file" @change="previewFiles"
                                            ref="image">
                                        <label for="avatar" style="margin-left:35px;">Thêm avatar:</label>
                                    </div>
                                </div>
                                <div class="col-md-8 col-12">
                                    <div class="row">
                                        <div class="col-md-6 col-12">
                                            <div class="form-floating mb-2">
                                                <input type="text" class="form-control" id="fullname"
                                                    v-model="data.hoten">
                                                <label for="fullname">*Họ và tên:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="date" class="form-control" id="dateofbirth"
                                                    v-model="data.ngaysinh">
                                                <label for="dateofbirth">*Ngày sinh:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <select class="form-select" id="gender"
                                                    aria-label="Default select example" v-model="data.gioitinh">
                                                    <option value="0">Nữ</option>
                                                    <option value="1">Nam</option>
                                                </select>
                                                <label for="gender">*Giới tính:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="text" class="form-control" id="cccd" v-model="data.cccd">
                                                <label for="cccd">*Thẻ căn cước:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="text" class="form-control" id="bank"
                                                    v-model="data.tendangnhap">
                                                <label for="bank">*Tài khoản:</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-floating mb-2">
                                                <input type="text" class="form-control" id="phone"
                                                    v-model="data.sodienthoai">
                                                <label for="phone">*Số điện thoại:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <select class="form-select" id="position"
                                                    aria-label="Default select example" v-model="data.idchucvu">
                                                    <option value="1">Thu ngân</option>
                                                    <option value="2">Phục vụ</option>
                                                    <option value="3">Quản lí</option>
                                                    <option value="4">Bảo vệ</option>
                                                    <option value="5">Bếp trưởng</option>
                                                    <option value="6">Bếp phụ</option>
                                                </select>
                                                <label for="position">*Chức vụ:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="date" class="form-control" id="startdate"
                                                    v-model="data.ngaythamgia">
                                                <label for="startdate">*Ngày vào làm:</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <select class="form-select" id="status"
                                                    aria-label="Default select example" v-model="data.trangthai">
                                                    <option value="0">Đang làm việc</option>
                                                    <option value="1">Đã nghĩ việc</option>
                                                </select>
                                                <label for="status">*Trạng thái:</label>
                                            </div>
                                            <div class="d-flex mb-2">
                                                <div class="form-floating">
                                                    <input type="password" class="form-control" id="password"
                                                        value="datadata" disabled="disabled">
                                                    <label for="password">*Mật khẩu: </label>
                                                </div>
                                                <button class="btn btn-outline-secondary ms-3">
                                                    <i class="fa-solid fa-pencil"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-2">
                                            <textarea type="text" class="form-control" id="address"
                                                v-model="data.diachi" style="height: 100px;"></textarea>
                                            <label for="address" class="ms-3">*Nơi cư trú:</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-success ms-3" style="width: 150px;">
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import staffServive from '@/services/staff.servive';


export default {
    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        return {
            closeModal,
        };
    },

    data() {
        return {
            data: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            this.data = await staffServive.FindOneByToken(this.$store.state.staff.token);
        }
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
    margin: 50px 0px 120px 0px;
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