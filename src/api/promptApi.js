import axiosClient from "./axiosClient";

const promptApi = {
    getAllPrompts: (params) => {
        const url = "/prompts";
        return axiosClient.get(url, { params });
    },
    getBasePrompts: () => {
        const url = "/base-prompts";
        return axiosClient.get(url);
    },
    editBasePrompt: (params) => {
        const url = "/base-prompts";
        return axiosClient.put(url, params);
    },
    createPrompt: (params) => {
        const url = "/prompts";
        return axiosClient.post(url, params);
    },
    editPrompt: (id, params) => {
        const url = "/prompts/" + id;
        return axiosClient.put(url, params);
    },
    deletePrompt: (id) => {
        const url = "/prompts/" + id;
        return axiosClient.delete(url);
    },
};

export default promptApi;
