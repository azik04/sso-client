import api from "../../services/api";
import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GrantPermission = () => {
    const navigate = useNavigate();

    const postData = async () => {
        try {
            const params = new URLSearchParams(window.location.search);

            const clientId = params.get("ClientId");
            const state = params.get("State");
            const responseType = params.get("ResponseType");
            const scope = params.get("Scope");
            const redirectUri = params.get("RedirectUri");

            const res = await api.get("/AuthorizationCode/authorize", {
                params: {
                    ClientId: clientId,
                    RedirectUri: redirectUri,
                    ResponseType: responseType,
                    Scope: scope,
                    State: state,
                }
            });

            const responseUrl = res.data.data;

            window.location.href = responseUrl;

        } catch (error) {
            if (error.response?.status === 401) {
                const returnUrl =
                    window.location.pathname +
                    window.location.search;

                navigate(
                    `/sign-in?returnUrl=${encodeURIComponent(returnUrl)}`
                );

                return;
            }

            console.error(error);
        }
    };

    useEffect(() => {
        postData();
    }, []);

    return (
        <div className="permission-box">
            <p>
                <strong>ADRA</strong> - sisteminə avtomatik yönləndiriləcək.
            </p>
        </div>
    );
};

export default GrantPermission;