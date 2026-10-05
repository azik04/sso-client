import "./style.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const Info = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const res = await api.get("Account/me")
            setData(res.data)
        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/sign-in?returnUrl");
            }

            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const signOutFunc = async () => {
        const res = await api.post("Account/sign-out")
        navigate("/sign-in")
    }

    return (
        <div className="info-box">

            <div className="info-box__header">
                <h2>Şəxsi məlumatlar</h2>

                <button className="sign-out-btn" onClick={signOutFunc}>Sign-out</button>
            </div>

            <div className="info-box__content">

                <div className="info-box__row">
                    <span className="info-box__label">
                        İdentifikator
                    </span>

                    <span className="info-box__value">
                        {data.id}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        Ad
                    </span>

                    <span className="info-box__value">
                        {data.name}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        Soyad
                    </span>

                    <span className="info-box__value">
                        {data.surname}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        Username
                    </span>

                    <span className="info-box__value">
                        {data.username}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        Email
                    </span>

                    <span className="info-box__value">
                        {data.email}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        İdarə
                    </span>

                    <span className="info-box__value">
                        {data.administration}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        Şöbə
                    </span>

                    <span className="info-box__value">
                        {data.department}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        Vəzifə
                    </span>

                    <span className="info-box__value">
                        {data.position}
                    </span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">
                        İstifadəçi tarixçəsi
                    </span>

                    <span className="info-box__value">
                        <Link to={`/user/${data.id}/history`}>Daha ətraflı</Link>
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Info;
