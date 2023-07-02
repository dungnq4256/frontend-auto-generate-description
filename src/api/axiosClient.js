import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: "https://backend-auto-generate-description.vercel.app",
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(error);
        throw error;
    }
);

export default axiosClient;
