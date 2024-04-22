<template>
    <div class="mt-3 p-1">
        <img @click="onToggleModalDetailPromotion" :src="promotion.hinhanh" class="w-100" style="height: 100px;" alt="">
        <h6 class="text-dark m-0 mt-1">{{ promotion.tenkhuyenmai }}</h6>
        <span class="text-primary fw-bold">{{ formatNumber(promotion.thanhtoan) }}
            <button class="btn ms-5" @click="onAdd"><i class="fa-solid fa-plus" style="font-size: 12px;"></i></button>
        </span>
    </div>
</template>

<script>

export default {
    props: {
        promotion: {
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

    data() {
        return {
            promotionDetail: {},
        };
    },

    methods: {
        onAdd() {
            this.$emit('add', this.promotion);
        },

        onToggleModalDetailPromotion() {
            this.$emit('onDetailPromotion', this.promotion.idkhuyenmai);
        }
    },

    created() {
        // console.log(this.dish);
    }
}
</script>

<style scoped></style>