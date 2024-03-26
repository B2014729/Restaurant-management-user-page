import createApiClient from "./api.service";

class AccountService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/account") {
        this.api = createApiClient(baseUrl);
    }

    async Login(data) {
        return (await this.api.post('/login', data));
    }

    async Register(data) {
        return (await this.api.post('/customer-register', data)).data;
    }

}

export default new AccountService();