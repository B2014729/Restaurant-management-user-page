<template>
    <h5 class="text-dark text-start fw-bold mt-2">Món đã làm hôm nay: {{ formatDate(time) }} </h5>
    <div>
        <searchComponent class="mb-2" @submit="search($event)" v-model="searchText"></searchComponent>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th class="bg-secondary" scope="col" style="width: 20px;">STT</th>
                    <th class="bg-secondary" scope="col">Mã order</th>
                    <th class="bg-secondary" scope="col">Bàn</th>
                    <th class="bg-secondary" scope="col">Mã món</th>
                    <th class="bg-secondary" scope="col">Tên món</th>
                    <th class="bg-secondary" scope="col">Số lượng</th>
                    <th class="bg-secondary" scope="col">Thời gian</th>
                    <th class="bg-secondary" scope="col" style="width: 80px;">Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in searchDish" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td style="width: 90px;">{{ item.iddatmon }}</td>
                    <td style="width: 70px;">{{ item.idban }}</td>
                    <td style="width: 70px;">{{ item.idmon }}</td>
                    <td style="width: 250px;">{{ item.tenmon }}</td>
                    <td style="width: 90px;">{{ item.soluong }}</td>
                    <td style="width: 140px;">{{ formatTime(item.thoigiantra) }}</td>
                    <td>
                        <span class="text-success">Đã trả món</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import orderService from '@/services/order.service';
import searchComponent from '@/components/cashier/searchComponent.vue';
export default {

    components: {
        searchComponent,
    },

    setup() {
        function formatTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;

            return `${hours}:${minutes}:${seconds}`;
        }

        function formatDate(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            formatTime, formatDate,
        };
    },

    computed: {
        listDishString() {
            return this.listDish.map((dish) => {
                const { idmon, tenmon, iddatmon } = dish;
                return [iddatmon, idmon, tenmon].join("");
            });
        },

        searchDish() {
            if (!this.searchText) {
                return this.listDish
            }
            return this.listDish.filter((_bill, index) => {
                return this.listDishString[index].includes(this.searchText);
            });
        }
    },

    data() {
        return {
            searchText: '',
            listDish: [],
            time: new Date(),
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                let resultFetch = await orderService.FindAllDishPaidInDate(this.time);
                resultFetch.forEach(element => {
                    if (!Object.prototype.hasOwnProperty.call(element, 'khuyenmai')) {
                        let dish = {}
                        dish = element.mon;
                        dish.idban = element.idban;
                        dish.soluong = element.soluong;
                        dish.iddatmon = element.iddatmon;
                        dish.thoigiantra = element.thoigiantra;
                        this.listDish.push(dish);
                    } else {
                        element.khuyenmai.chitiet.forEach(item => {
                            item.soluong = item.soluong * element.soluong;
                            item.idmon = element.khuyenmai.thongtinkhuyenmai.idkhuyenmai;
                            item.idban = element.idban;
                            item.iddatmon = element.iddatmon;
                            item.thoigiantra = element.thoigiantra;
                            this.listDish.push(item);
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        search() {
            console.log(this.searchText);
        }
    }
}
</script>

<style scoped></style>/