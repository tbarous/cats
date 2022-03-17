import {Axios} from "axios";

class API {
    private axiosInstance;
    private baseURL = "https://api.thecatapi.com/v1/"
    private key = "d24f9e98-a9f6-4ca9-8255-d23a1aa6d918"

    constructor() {
        this.axiosInstance = new Axios({
            headers: {
                "x-api-key": this.key,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            baseURL: this.baseURL,
            transformRequest: [(data, headers) => JSON.stringify(data)],
            transformResponse: [(data) => JSON.parse(data)],
        })
    }

    getCats(page: number) {
        return this.axiosInstance.get(`images/search?limit=10&page=${page}`);
    }

    getCat(id: string) {
        return this.axiosInstance.get(`images/${id}`)
    }

    getBreeds() {
        return this.axiosInstance.get(`breeds`);
    }
}

const api = new API();

function getAPI() {
    return api;
}

export {
    getAPI
}