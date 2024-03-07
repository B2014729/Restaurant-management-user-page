<template>
    <div class="mt-3 p-1">
        <img src="https://www.cet.edu.vn/wp-content/uploads/2019/10/goi-muc-thai-lan-gion-ngon.jpg" class="w-100"
            alt="">
        <h6 class="text-dark m-0">Gỏi xoài tôm khô</h6>

        <span class="text-primary fw-bold">120,000
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

    methods: {
        onAdd() {
            this.$emit('add', {
                "idmon": 3,
                "tenmon": "Gỏi mực thái",
                "gia": 119000,
                "hinhanh": "https://www.cet.edu.vn/wp-content/uploads/2019/10/goi-muc-thai-lan-gion-ngon.jpg",
                "iddonvitinh": 4,
                "idloai": 10,
                "trangthai": 1,
                "tenloai": "Gỏi",
                "donvitinh": "Dĩa"
            });
        }
    }
}
</script>

<style scoped></style>