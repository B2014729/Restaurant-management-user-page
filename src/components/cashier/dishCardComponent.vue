<template>
    <div class="mt-3 p-1">
        <img :src="dish.hinhanh" class="w-100" style="height: 100px;" alt="">
        <h6 class="text-dark m-0 mt-1">{{ dish.tenmon }}</h6>
        <span class="text-primary fw-bold">{{ formatNumber(dish.gia) }}
            <button class="btn ms-5" @click="onAdd"><i class="fa-solid fa-plus" style="font-size: 12px;"></i></button>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        dish: {
            type: Object,
        }
    },

    setup() {
        const formatNumber = (number) => {
            let numberFormat = number.toLocaleString("vi-VN") + 'đ'
            return numberFormat;
        }

        return {
            formatNumber,
        }
    },

    methods: {
        onAdd() {
            this.$emit('add', this.dish);
        }
    },

    created() {
        // console.log(this.dish);
    }
}
</script>

<style scoped></style>