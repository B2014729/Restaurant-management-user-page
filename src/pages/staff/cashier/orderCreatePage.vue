<template>
    <h5 class="text-start mt-2 ms-3 text-dark fw-bold">Order</h5>
    <hr class="m-0 p-1">
    <div class="d-flex justify-content-between px-2">
        <div class="input-group w-50">
            <span class="input-group-text fw-bold" id="status">Trạng thái:</span>
            <select class="form-select" aria-label="Default select example" v-model="data.status">
                <option selected value="1">Bàn mới</option>
                <option value="2">Thêm món</option>
            </select>
        </div>
        <div class="input-group w-25">
            <span class="input-group-text fw-bold" id="idtable">Bàn số:</span>
            <select class="form-select" aria-label="Default select example" v-model="data.idTable">
                <option selected value="10">10</option>
                <option
                    v-for="(item, index) in [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]"
                    :value="item" :key="index">
                    {{ item }}
                </option>
            </select>
        </div>
    </div>
    <hr class="mt-2 m-0">
    <div class="h-100 d-flex align-items-end flex-column me-2">
        <h6 class="text-start py-3 m-0 text-dark fw-bold ">Danh sách món order:</h6>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th class="bg-secondary" scope="col" style="width: 20px;">STT</th>
                    <th class="bg-secondary" scope="col">Mã món</th>
                    <th class="bg-secondary" scope="col">Tên món</th>
                    <th class="bg-secondary" scope="col" style="width:100px;">Số lượng</th>
                    <th class="bg-secondary" scope="col">Đơn giá (vnd)</th>
                    <th class="bg-secondary" style="width: 30px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listDishOrder" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.idmon }}</td>
                    <td>{{ item.tenmon }}</td>
                    <td>
                        <input class="w-75" type="number" v-model="item.soluong">
                    </td>
                    <td>{{ item.gia }}</td>
                    <td><button class="btn"><i class="fa-solid fa-xmark text-danger"></i></button></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-success" @click="order">Order</button>
    </div>
</template>

<script>

export default {
    props: {
        listDishOrder: {
            type: Array,
        }
    },

    data() {
        return {
            data: {
                status: '1',
            },
        };
    },

    created() {
        console.log(this.listDishOrder);
    },

    methods: {
        order() {
            console.log('call api Order');
            console.log(this.data);
            console.log(this.listDishOrder);

        }
    }
}
</script>

<style scoped>
.btn-quantity {
    border: none;
    background-color: rgba(255, 255, 255, 0);
}
</style>