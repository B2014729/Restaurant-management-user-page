<template>
    <h5 class="text-start mt-2 ms-3 text-dark fw-bold">Order</h5>
    <hr class="m-0 p-1">
    <div class="d-flex justify-content-between px-2">
        <div class="input-group w-50">
            <span class="input-group-text fw-bold" id="status">Trạng thái:</span>
            <select class="form-select" aria-label="Default select example" v-model="data.status" disabled>
                <option selected value="0">Bàn mới</option>
                <option value="1">Thêm món</option>
            </select>
        </div>
        <div class="input-group d-flex w-25">
            <span class="input-group-text fw-bold" id="idtable">Bàn số:</span>
            <select class="form-select" aria-label="Default select example" v-model="data.idTable" @change="checkTable">
                <option
                    v-for="(item, index) in [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]"
                    :value="item" :key="index">
                    {{ item }}
                </option>
            </select>
        </div>
    </div>
    <div class="d-flex justify-content-end me-2">
        <span v-if="error" class="text-danger text-end" style="font-size: 14px;">
            {{ messageError }}
        </span>
    </div>
    <hr class="mt-2 m-0">
    <div class="d-flex align-items-end flex-column me-2">
        <h6 style="width: 100%;" class="text-start py-3 m-0 text-dark fw-bold ">Danh sách món order:</h6>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" style="width: 20px;">STT</th>
                    <th scope="col" style="width: 120px;">Mã món</th>
                    <th scope="col">Tên món</th>
                    <th scope="col" style="width:100px;">Số lượng</th>
                    <th scope="col">Đơn giá (vnd)</th>
                    <th style="width: 30px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listDishOrder" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.idmon }}</td>
                    <td>{{ item.tenmon }}</td>
                    <td>
                        <input class="w-75" type="number" min="1" v-model="item.soluong">
                    </td>
                    <td>{{ formatNumber(item.gia) }}</td>
                    <td>
                        <button class="btn" @click="remove(item.idmon)">
                            <i class="fa-solid fa-xmark text-danger"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-success" @click="order">Order</button>
    </div>

    <div class="h-100 d-flex align-items-end flex-column me-2">
        <h6 style="width: 100%;" class="text-start py-3 m-0 text-dark fw-bold ">Danh sách món đã gọi:</h6>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" style="width: 20px;">STT</th>
                    <th scope="col" style="width: 120px;">Mã món</th>
                    <th scope="col">Tên món</th>
                    <th scope="col" style="width:100px;">Số lượng</th>
                    <th scope="col">Giờ gọi</th>
                    <th scope="col">Giờ trả</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listDishTableOrdered" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.id }}</td>
                    <td>{{ item.tenmon }}</td>
                    <td>
                        <input class="w-75" type="number" disabled v-model="item.soluong">
                    </td>
                    <td>{{ formatDateTime(item.giodat) }}</td>
                    <td>{{ formatDateTime(item.giotra) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import tableService from '@/services/table.service';
import billService from '@/services/bill.service';
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
        let messageError = ref('');

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number))
        }

        function formatDateTime(date) {
            if (!date) {
                return '____';
            }
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds}, ${dateIn}/${month}/${year}`;
        }

        return { error, messageError, formatNumber, formatDateTime };
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
            listDishTableOrdered: [],
        };
    },

    created() {
        //console.log(this.listDishOrder);
    },

    methods: {
        async checkTable() {
            try {
                let table = await tableService.FindOneById(this.data.idTable);
                this.data.status = table.trangthai;

                let billInfor = await billService.FindOneByIdTable(this.data.idTable);

                billInfor.chitietdatmon.forEach(element => {
                    console.log(element);
                    let dish = {};

                    if (Object.keys(element.khuyenmai).length == 0) {
                        dish.id = element.mon.idmon;
                        dish.tenmon = element.mon.tenmon;
                        dish.soluong = element.soluong;
                        dish.giodat = element.giodat;
                        dish.giotra = element.tramon;
                        this.listDishTableOrdered.push(dish);
                    } else {
                        this.listDishTableOrdered.push({
                            id: element.khuyenmai.idkhuyenmai,
                            tenmon: element.khuyenmai.tenkhuyenmai,
                            soluong: element.soluong,
                            giodat: element.giodat,
                            giotra: element.tramon,
                        })
                    }
                });
                console.log(this.listDishTableOrdered);
            } catch (e) {
                this.listDishTableOrdered = [];
                console.log(e);
            }
        },

        async order() {
            if (this.data.idTable == '') {
                this.error = true;
                this.messageError = 'Vui lòng chọn đầy đủ trạng thái và số bàn!';
            } else {
                this.error = false;
                if (this.data.status == '0') {
                    let listTable = await tableService.FindAll();
                    for (let index = 0; index < listTable.length; index++) {
                        const element = listTable[index];
                        if (element.idban == this.data.idTable && element.trangthai == 1) {
                            this.error = true;
                            this.messageError = 'Bạn đang ăn, không thể thêm bàn mới!';
                            break;
                        } else {
                            this.error = false;
                        }
                    }
                }

                if (!this.error) {
                    this.data.token = this.$store.state.staff.token;
                    this.listDishOrder.forEach(element => {
                        this.data.dishId.push(element.idmon);
                        this.data.quantity.push(element.soluong);
                        this.data.note.push("");
                    });
                    this.$emit('order', this.data);
                    this.data.idTable = 0;
                }
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

table>thead>tr>th {
    background-color: gray;
}
</style>