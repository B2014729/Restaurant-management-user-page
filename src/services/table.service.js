import createApiClient from "./api.service";

class TableService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/table") {
        this.api = createApiClient(baseUrl);
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

}

export default new TableService();