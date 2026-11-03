
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await api.get("Account/info");
            const userData = res.data.data;

            setUser(userData);

            localStorage.setItem(
                "PersonalInfo",
                `${userData.name} ${userData.surname}`
            );

            localStorage.setItem("Position", userData.position ?? "");

            return userData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                fetchUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }

    return context;
};
