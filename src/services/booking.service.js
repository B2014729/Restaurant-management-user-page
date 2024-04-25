import createApiClient from "./api.service";

class BookingsService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/bookings") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    // async FindAll() {
    //     return (await this.api.get(`/list-on-type`)).data.data;
    // }

    // async FindBillWhereTime(start, end) {
    //     return (await this.api.get(`/list/${start}&${end}`)).data.data;
    // }

    async Create(data) {
        return (await this.api.post(`/create`, data)).data;
    }

    async Update(id, dataUpdate) {
        return (await this.api.put(`/${id}`, dataUpdate)).data;
    }

    async Delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async GetBookings(token) {
        return (await this.api.get(`/list-with-customer/${token}`)).data.data;
    }

    async GetBookingsTable(idTable) {
        return (await this.api.get(`/list-with-table/${idTable}`)).data.data;
    }

}

export default new BookingsService();
