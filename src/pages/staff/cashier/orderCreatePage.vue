<template>
    <h5 class="text-start mt-2 ms-3 text-dark fw-bold">Order</h5>
    <hr class="m-0 p-1">
    <div class="d-flex justify-content-between px-2">
        <div class="input-group w-50">
            <span class="input-group-text fw-bold" id="status">Trạng thái:</span>
            <select class="form-select" aria-label="Default select example" v-model="data.status">
                <option selected value="0">Bàn mới</option>
                <option value="1">Thêm món</option>
            </select>
        </div>
        <div class="input-group w-25">
            <span class="input-group-text fw-bold" id="idtable">Bàn số:</span>
            <select class="form-select" aria-label="Default select example" v-model="data.idTable">
                <option
                    v-for="(item, index) in [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]"
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
                    <td>
                        <button class="btn" @click="remove(item.idmon)">
                            <i class="fa-solid fa-xmark text-danger"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <span v-if="error" class="text-danger" style="font-size: 14px;">
            Vui lòng chọn đầy đủ trạng thái và số bàn!
        </span>
        <button class="btn btn-success" @click="order">Order</button>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    props: {
        listDishOrder: {
            type: Array,
        }
    },
    emits: ['removeDish', 'order'],

    setup() {
        let error = ref(false);

        return { error };
    },

    data() {
        return {
            data: {
                status: '0',
                idTable: '',
                dishId: [],
                quantity: [],
                note: [],
                token: '',
            },
        };
    },

    created() {
        console.log(this.listDishOrder);
    },

    methods: {
        order() {
            if (this.data.idTable == '') {
                this.error = true;
            } else {
                this.data.token = this.$store.state.staff.token;
                this.error = false;
                this.listDishOrder.forEach(element => {
                    this.data.dishId.push(element.idmon);
                    this.data.quantity.push(element.soluong);
                    this.data.note.push("");
                });
                this.$emit('order', this.data);
            }
        },

        remove(idDish) {
            this.$emit('removeDish', idDish);
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