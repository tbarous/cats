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

    getCats(name: string, barcode: string, price: number, image = null) {
        return this.axiosInstance.get("images/search?limit=10&page=1");
    }

    editProduct(
        name: string,
        barcode: string,
        price: number,
        id: number,
        image = null,
        brandId: string
    ) {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("barcode", barcode);
        formData.append("price", price.toString());
        formData.append("brand_id", brandId);

        if (image) formData.append("image", image, image.name);

        return this.multipartAxiosInstance.post(`products/${id}`, formData);
    }

    delete(id: number) {
        return this.axiosInstance.delete(`products/${id}`);
    }

    filter(params: any) {
        return this.axiosInstance.get("products", {params})
    }

    report(params: any) {
        return this.axiosInstance.get("report", {params})
    }
}

const api = new API();

function getAPI() {
    return api;
}

export {
    getAPI
}