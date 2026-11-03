
import "./style.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import Commission from "./components/Commission/Commission";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Apps from "./components/Apps/Apps";
import Header from "./components/Header/Header";
import Exam from "./components/Exam/Exam";

const Info = () => {
    const { user, fetchUser, loading } = useUser();
    console.log("User", user)
    const [data, setData] = useState({});
    const [form, setForm] = useState({});

    const navigate = useNavigate();
    const { userId } = useParams();

    const fetchData = async () => {
        try {
            if (!userId) {
                const item = user;

                if (!item) return;

                setData(item);
                setFormData(item);
                return;
            }

            const res = await api.get(`Account/id/${userId}`);
            const item = res.data.data;

            setData(item);
            setFormData(item);

        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/sign-in?returnUrl");
            }

            console.error(error);
        }
    };

    const setFormData = (item) => {
        setForm({
            name: item.name,
            surname: item.surname,
            workStartDate: item.workStartDate ?? "",
            lastUpdatePositionDate: item.lastUpdatePositionDate ?? "",
            pin: item.pin ?? "",
            documentNumber: item.documentNumber ?? "",
            localContact: item.localContact ?? "",
            globalContact: item.globalContact ?? ""
        });
    };

    useEffect(() => {
        if (!userId && user) {
            setData(user);
            setFormData(user);
        }
    }, [user]);

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]);

    if (loading && !userId) return <div>Loading...</div>;

    return (
        <div className="main-page">
            <Header />

            <PersonalInfo
                data={data}
                form={form}
                setForm={setForm}
                fetchData={fetchData}
            />

            {!userId && <Apps />}

            {user?.role === "HrAdmin" && (
                <Commission data={data?.commissionRank ?? []} />
            )}

            {["Hr", "HrAdmin"].includes(user?.role) && (
                <Exam data={data?.externalService ?? []} />
            )}
        </div>
    );
};

export default Info;
