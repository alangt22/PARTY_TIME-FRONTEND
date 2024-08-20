import axios from "axios"

const partFetch = axios.create({
    baseURL: "https://partytime-backend-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default partFetch
