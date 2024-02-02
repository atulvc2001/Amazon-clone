import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-808bd/us-central1/api' // The API (CLOUD FUNCTION) Url
});

export default instance;