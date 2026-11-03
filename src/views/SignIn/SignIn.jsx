import "./style.css";
import Logo from "../../photos/logo.svg";
import InputModel from "../../components/InputModel/InputModel";
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Documentation from "../../components/Documentation/Documentation";

const SignIn = () => {
    const navigate = useNavigate();
    const [documentation, setDocumentation] = useState(false);
    const [error, setError] = useState({});
    const [query, setQuery] = useState({
        username: "",
        password: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;

        setQuery(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const postData = async (e) => {
        e.preventDefault();

        try {
            await api.post("/Auth/sign-in", query);

            const params = new URLSearchParams(window.location.search);
            const returnUrl = params.get("returnUrl");

            if (returnUrl) {
                navigate(returnUrl);
            } else {
                navigate("/");
            }

        } catch (err) {
            setError(err.response?.data?.errors || {});
        }
    };

    return (
        <>
            <div className="auth">
                <div className="auth__box">

                    <div className="auth__logo-wrap">
                        <img src={Logo} alt="Logo" className="auth__logo" />
                    </div>

                    <form className="auth__form" onSubmit={postData}>
                        <InputModel
                            label="İstifadəçi adı"
                            placeholder="İstifadəçi adınızı daxil edin"
                            value={query.username}
                            onChange={onChange}
                            name="username"
                            error={error.Username}
                        />

                        <InputModel
                            error={error.Password}
                            name="password"
                            value={query.password}
                            onChange={onChange}
                            type="password"
                            label="Parol"
                            placeholder="Parolu daxil edin"
                        />

                        <button id="major-btn" type="submit" className="auth__submit mb-2">Giriş et</button>
                    </form>

                    <button type="button" className="auth__documentation" onClick={() => setDocumentation(true)}>Dokumentasiya</button>

                    <div className="auth__version">
                        <span>Azərbaycan Respublikasının Dövlət Reklam Agentliyi</span>

                        <span>Versiya 0.0.0.0.1</span>
                    </div>

                </div>
            </div>

            {documentation && (
                <Documentation onClose={() => setDocumentation(false)}>
                    <p>
                        <strong>İstifadəçi adınızı</strong> öyrənmək üçün kompüterinizdə <strong>C:\Users</strong> qovluğunu açın. Burada sizin Windows istifadəçi adınız göstərilir.
                        <br />
                        <strong>Parol</strong> olaraq isə kompüterinizin parolunu daxil edin.
                    </p>
                </Documentation>
            )}
        </>
    );
};

export default SignIn;