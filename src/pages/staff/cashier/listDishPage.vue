<template>
    <selectDishType @onselect="onSelect($event)"></selectDishType>

    <div class="row mt-2">
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent @add="onAdd($event)"></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent @add="onAdd($event)"></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent @add="onAdd($event)"></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent @add="onAdd($event)"></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent></dishCardComponent>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <dishCardComponent></dishCardComponent>
        </div>
    </div>
</template>

<script>
import selectDishType from '@/components/cashier/selectDishTypeComponent.vue';
import dishCardComponent from '@/components/cashier/dishCardComponent.vue';
export default {
    components: {
        selectDishType, dishCardComponent
    },
    emits: ['addDish'],
    methods: {
        onSelect(id) {
            console.log(id);
        },

        onAdd(data) {
            this.$emit('addDish', data);
        }
    }
}
</script>

<style scoped></style>