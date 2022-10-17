import axios from "axios";
import qs from "qs";

const envoriment = {
    development: "http://localhost:3333",
    production: "http://104.131.23.234:3332",
};

export const URL_API = envoriment["development"];

export default axios.create({
    baseURL: URL_API,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => {
        return qs.stringify(params);
    },
});
