import createApiClient from "./api.service";

class BillService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/bill") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async FindBillWhereTime(start, end) {
        return (await this.api.get(`/list/${start}&${end}`)).data.data;
    }

    async Create(data) {
        return (await this.api.post(`/create`, data)).data;
    }

    async Update(id, dataUpdate) {
        return (await this.api.put(`/${id}`, dataUpdate)).data;
    }

    async GetStatistical(year) {
        return (await this.api.get(`/statistical/${year}`)).data.data;
    }

    async GetStatisticalWithMonthAndYear(month, year) {
        return (await this.api.get(`/statistical-in-month/${month}&${year}`)).data.data;
    }

    async GetListBillUnpaid() { //Lay thong  tin hoa don cau ban dang con an => chua thanh toan
        return (await this.api.get(`/table-list/`)).data.data;
    }

    async FindOneByIdTable(id) {
        return (await this.api.get(`/table/${id}`)).data.data[0];
    }

    async FindAllByDate(date) {   //Lay danh sach hoa don trong 1 ngay (date = '2024-04-04')
        return (await this.api.get(`/list/date/${date}`)).data.data;
    }

    async UpdateStatusPayment(idTable, idStaff) {
        return (await this.api.put(`/table/${idTable}`, { idStaff })).data;
    }
}

export default new BillService();
