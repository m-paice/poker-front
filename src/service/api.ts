import axios from "axios";
import qs from "qs";

const development = false;

export const URL_API = development ? "http://localhost:3333" : "http://104.131.23.234:3332";

export default axios.create({
    baseURL: "process.env.API",
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => {
        return qs.stringify(params);
    },
});
