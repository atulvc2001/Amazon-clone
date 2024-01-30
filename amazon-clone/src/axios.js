import axios from "axios";

const instance = axios.create({
    baseURL: '...' // The API (CLOUD FUNCTION) Url
});

export default instance;