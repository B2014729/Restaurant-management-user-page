<template>
    <selectDishTypeComponent @onselect="onSelect($event)"></selectDishTypeComponent>

    <div class="row mt-2">
        <div class="col-md-3 col-sm-6 col-12" v-for="(item, index) in listDishCurrent" :key="index">
            <dishCardComponent @add="onAdd($event)" :dish="item"></dishCardComponent>
        </div>
    </div>
    <div>
        <h3 class="text-dark">...</h3>
    </div>
</template>

<script>
import { ref } from 'vue';
import selectDishTypeComponent from '@/components/cashier/selectDishTypeComponent.vue';
import dishCardComponent from '@/components/cashier/dishCardComponent.vue';
import dishService from '@/services/dish.service';
export default {
    components: {
        selectDishTypeComponent, dishCardComponent
    },
    emits: ['addDish'],

    setup() {
        let listDishCurrent = ref([]);

        return { listDishCurrent, };
    },

    data() {
        return {
            listDishFetch: [],
            listDishAll: [],
        }
    },

    async created() {
        try {
            await this.fetchData();
            this.listDishFetch.forEach((element) => {
                this.listDishAll.push(...element.mon);
            });

            this.listDishCurrent = this.listDishAll;
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        async fetchData() {
            try {
                this.listDishFetch = await dishService.FindAll();// Danh sacn mon duoc phan theo tung danh muc mon
            } catch (error) {
                console.log(error);
            }
        },

        onSelect(id) {
            for (let index = 0; index < this.listDishFetch.length; index++) {
                const element = this.listDishFetch[index];
                this.listDishCurrent = [];
                if (element.idloai == id) {
                    this.listDishCurrent.push(...element.mon);
                    break;
                } else {
                    this.listDishCurrent = this.listDishAll;
                }
            }
            console.log(123, this.listDishCurrent);
        },

        onAdd(data) { // Gui emit cho layout de layout xuw li them sp tren giao dien
            this.$emit('addDish', data);
        }
    }
}
</script>

<style scoped>
.row {
    max-height: 550px;
    overflow: hidden;
}
</style>