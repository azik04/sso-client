import { createContext, useState, useEffect } from "react";
import Loading from "../components/Notification/Loading";
import Success from "../components/Notification/Success";
import Error from "../components/Notification/Error";

export const NotificationContext = createContext();

export let notify = null;

export const setNotifyHandlers = (handlers) => {
    notify = handlers;
};

export const NotificationService = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState({ visible: false, message: "" });
    const [error, setError] = useState({ visible: false, message: "" });

    const showSuccess = (msg) => {
        setSuccess({ visible: true, message: msg });
        setTimeout(() => setSuccess({ visible: false, message: "" }), 3000);
    };

    const showError = (msg) => {
        setError({ visible: true, message: msg });
        setTimeout(() => setError({ visible: false, message: "" }), 3000);
    };

    useEffect(() => {
        setNotifyHandlers({
            setLoading,
            setSuccess: showSuccess,
            setError: showError
        });
    }, []);

    return (
        <NotificationContext.Provider value={{ setLoading, setSuccess, setError }}>
            {children}
            {loading && <Loading />}
            {success.visible && <Success message={success.message} />}
            {error.visible && <Error message={error.message} />}
        </NotificationContext.Provider>
    );
};