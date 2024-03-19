import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/staff") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindOneByToken(token) {
        return (await this.api.post(`/token`, { token })).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async Salary(idPhase) {
        return (await this.api.get(`/salary/${idPhase}`)).data.data;
    }

    async SalaryDetail(idStaff, idPhase) {
        return (await this.api.get(`/salary/${idStaff}/calendrier/${idPhase}`)).data.data;
    }
}

export default new StaffService();
