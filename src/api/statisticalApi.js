import axiosClient from "./axiosClient";

const statisticalApi = {
    getStatisticalData: (params) => {
        const url = "/statistics";
        return axiosClient.get(url, { params });
    },
};

export default statisticalApi;
