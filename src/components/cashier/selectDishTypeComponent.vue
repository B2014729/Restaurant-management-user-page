<template>
   <div class="row mt-1">
      <div class="col-md-6 col-12">
         <h5 class="text-warning fw-bold mt-1">Danh sách món ăn:</h5>
      </div>
      <div class="col-md-6 col-12 d-flex justify-content-end">
         <h6 class="text-dark mt-2 me-2">Danh mục món:</h6>
         <select @change="submit()" class="form-select w-50" aria-label="Default select example" v-model="idType">
            <option value="0">Tất cả</option>
            <option value="1">Lẩu</option>
            <option value="2">Nướng</option>
            <option value="2">Nước ngọt</option>
            <option value="3">Thêm</option>
         </select>
         <!-- <button class="btn btn-outline-success ms-2" @click="onSelect"><i class="fa-solid fa-check"></i></button> -->
      </div>
   </div>
</template>

<script>
export default {
   setup() {
   },

   data() {
      return {
         idType: '0',
      };
   },

   methods: {
      submit() {
         this.$emit('onselect', this.idType);
      }
   }
}
</script>

<style scoped></style>