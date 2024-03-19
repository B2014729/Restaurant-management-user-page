<template>
    <h5 class="text-dark text-start fw-bold mt-2">Báo cáo thông tin kho: </h5>
    <div>
        <searchComponent class="mb-2" @submit="search($event)" v-model="searchText"></searchComponent>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col" style="width: 20px;">STT</th>
                    <th scope="col">Mã hàng hóa</th>
                    <th scope="col">Tên hàng hóa</th>
                    <th scope="col">Số lượng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in searchDish" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td style="width: 90px;">
                        <input style="width: 50px; border: none;" type="number" disabled v-model="listId[index]">
                    </td>
                    <td style="width: 250px;">{{ item.hanghoa.tenhanghoa }}</td>
                    <td style="width: 90px;">
                        <input style="width: 90px;" type="number" v-model="listQuantity[index]">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="w-100 d-flex justify-content-end">
        <button class="btn btn-success" @click="onUpdate()">Cập nhật kho</button>
    </div>
</template>
<script>
import searchComponent from '@/components/cashier/searchComponent.vue';
import depotService from '@/services/depot.service';
export default {
    components: {
        searchComponent,
    },

    computed: {
        listDishString() {
            return this.listDish.map((dish) => {
                const { idhanghoa, } = dish;
                const { tenhanghoa } = dish.hanghoa;
                return [idhanghoa, tenhanghoa].join("");
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
            listId: [],
            listQuantity: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listDish = await depotService.FindAll();
                this.listDish.forEach((element) => {
                    this.listId.push(element.idhanghoa);
                    this.listQuantity.push(element.soluong);
                })
            } catch (error) {
                console.log(error);
            }
        },

        async onUpdate() {
            try {
                await depotService.Update(this.listId, this.listQuantity).then((result) => {
                    if (result.statusCode == 200) {
                        this.fetchData();
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

}</script>

<style scoped></style>