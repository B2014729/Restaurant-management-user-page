import createApiClient from "./api.service";

class PromotionService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/promotion") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data;
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }
}

export default new PromotionService();