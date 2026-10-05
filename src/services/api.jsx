import axios from "axios";
import { notify } from "./notification";

let activeRequests = 0;

const startLoading = () => {
    activeRequests++;

    if (activeRequests === 1) {
        notify.setLoading(true);
    }
};

const stopLoading = () => {
    activeRequests = Math.max(0, activeRequests - 1);

    if (activeRequests === 0) {
        notify.setLoading(false);
    }
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        startLoading();
        return config;
    },
    (error) => {
        stopLoading();
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        stopLoading();

        const method = response.config.method?.toLowerCase();

        if (["post", "put", "delete"].includes(method)) {
            notify.setSuccess("Əməliyyat uğurla tamamlandı!");
        }

        return response;
    },
    async (error) => {
        stopLoading();

        console.error("Axios error:", error.response);

        if (!error.response) {
            notify.setError("No server connection");
            return Promise.reject(error);
        }

        const status = error.response.status;

        if (status === 400) {
            notify.setError(
                error.response.data?.message || "Validation error!"
            );
        }

        if (status === 401) {
            console.log("Unauthorized");
        }

        if (status === 403) {
            notify.setError("Access denied!");
        }

        if (status === 404) {
            notify.setError("Resource not found!");
        }

        if (status === 409) {
            notify.setError("Conflict!");
        }

        if (status === 422) {
            notify.setError(
                error.response.data?.message || "Validation error!"
            );
        }

        if (status >= 500) {
            notify.setError("Server error!");
        }

        return Promise.reject(error);
    }
);

export default api;