<template>
    <div>
        <p class="text-success pt-3 m-0 fs-5 fw-bold">Order gần đây</p>
        <table class="table table-striped table-hover mx-1">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Bàn</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Nhân viên</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>12</td>
                    <td>13:09 04/12/2024</td>
                    <td>Dương Hãi Băng</td>
                    <td><span class="bg-warning px-3 py-1 rounded-4" style="font-size:14px">Chưa gửi</span></td>
                    <td>
                        <button class="btn-infor"><i class="fa-solid fa-circle-info"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>12</td>
                    <td>13:09 04/12/2024</td>
                    <td>Dương Hãi Băng</td>
                    <td><span class="bg-warning px-3 py-1 rounded-4" style="font-size:14px">Chưa gửi</span></td>
                    <td>
                        <button class="btn-infor"><i class="fa-solid fa-circle-info"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>12</td>
                    <td>13:09 04/12/2024</td>
                    <td>Dương Hãi Băng</td>
                    <td><span class="bg-warning px-3 py-1 rounded-4" style="font-size:14px">Chưa gửi</span></td>
                    <td>
                        <button class="btn-infor"><i class="fa-solid fa-circle-info"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { io } from "socket.io-client";

export default {

    async created() {
        const socket = io('http://localhost:8000');

        await socket.on('newOrder', () => {
            this.fetchData();
        })
    },


    methods: {
        fetchData() {
            console.log(1233);
        }
    }
}

</script>

<style scoped>
.btn-infor {
    border: none;
    background-color: rgba(255, 255, 255, 0);
}

.btn-infor:hover>i {
    color: rgba(255, 140, 0, 0.929);
}
</style>