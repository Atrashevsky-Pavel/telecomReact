import axios from "axios";

class ApiService {
    static async getAll() {
            const result = await axios.get('http://localhost:3200');
            return result.data;
    }

    static async postFilter(body) {
        if (body.breed === 'Не выбрано') {
            body.breed = '';
        }
        const result = await axios.post('http://localhost:3200', body);
        console.log(result.data);
        return result.data;
    }
}

export default ApiService;