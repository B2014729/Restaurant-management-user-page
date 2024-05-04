<template>
    <div style="min-height: 500px;" class="mt-4">
        <div class="d-flex justify-content-center">
            <div class="d-flex mt-2">
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
            </div>
            <h4 class="mx-3 fw-bold">ATTRACTIVE OFFERS</h4>
            <div class="d-flex mt-2">
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
                <i class="fa-solid fa-grip-lines"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12 " v-for="(item, index) in promotion" :key="index">
                <img class="img-promotion h-100" :src="item.khuyenmai.hinhanh" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import promotionService from '@/services/promotion.service.js';
export default {

    data() {
        return {
            promotion: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                let result = await promotionService.FindAll();
                result.forEach(element => {
                    if (element.khuyenmai.hinhanh != '' && element.khuyenmai.trangthai == 1) {
                        this.promotion.push(element);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
i {
    color: orange;
}

h4 {
    color: black;
    font-family: 'Times New Roman', Times, serif;
}

.title {
    width: 600px;
    font-size: 17px;
    font-style: italic;
    font-family: 'Times New Roman', Times, serif;
}

.img-promotion {
    overflow: hidden;
    border-radius: 50%;
}
</style>