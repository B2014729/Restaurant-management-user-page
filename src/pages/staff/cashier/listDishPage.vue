<template>
    <selectDishTypeComponent @onselect="onSelect($event)"></selectDishTypeComponent>

    <div class="mt-2">
        <div v-if="(listDishCurrent.length > 0)" class="row">
            <div class="col-md-3 col-sm-6 col-12" v-for="(item, index) in listDishCurrent" :key="index">
                <dishCardComponent @add="onAdd($event)" :dish="item"></dishCardComponent>
            </div>
        </div>
        <div v-if="(listPromotionCurrent.length > 0)" class="row">
            <div class="col-md-3 col-sm-6 col-12" v-for="(item, index) in listPromotionCurrent" :key="index">
                <promotionCardComponent @add="onAdd($event)" @onDetailPromotion="onDetailPromotion($event)"
                    :promotion="item">
                </promotionCardComponent>
            </div>
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
import promotionCardComponent from '@/components/cashier/promotionCardComponent.vue'
import dishService from '@/services/dish.service';
import promotionService from '@/services/promotion.service';
export default {
    components: {
        selectDishTypeComponent, dishCardComponent, promotionCardComponent
    },
    emits: ['addDish', 'addDish', 'onDetailPromotion'],

    setup() {
        let listDishCurrent = ref([]);
        let listPromotionCurrent = ref([]);

        return { listDishCurrent, listPromotionCurrent };
    },

    data() {
        return {
            listDishFetch: [],
            listDishAll: [],
            listComboFetch: [],
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
                this.listComboFetch = await promotionService.FindAll();
            } catch (error) {
                console.log(error);
            }
        },

        onSelect(id) {
            this.listPromotionCurrent = [];
            this.listDishCurrent = [];
            if (id == 100) {
                this.listComboFetch.forEach(element => {
                    this.listPromotionCurrent.push(element.khuyenmai);
                });
            } else {
                for (let index = 0; index < this.listDishFetch.length; index++) {
                    const element = this.listDishFetch[index];
                    if (element.idloai == id) {
                        this.listDishCurrent = [];
                        this.listDishCurrent.push(...element.mon);
                        break;
                    } else {
                        this.listDishCurrent = this.listDishAll;
                    }
                }
            }
        },

        onAdd(data) { // Gui emit cho layout de layout xuw li them sp tren giao dien
            this.$emit('addDish', data);
        },

        onDetailPromotion(idPromotion) {
            this.$emit('onDetailPromotion', idPromotion);
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