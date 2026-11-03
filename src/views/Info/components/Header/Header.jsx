import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import InteriorLink from "../../../../components/Link/InteriorLink";
import Logo from "../../../../photos/logo.svg"
import api from "../../../../services/api";
import "./style.css";

const Header = () => {
    const navigate = useNavigate()
    
    const signOutFunc = async () => {
        const res = await api.post("Auth/sign-out")
        navigate("/sign-in")
    }

    return (
        <div className="info-box">
            <div className="info-header">
                <img src={Logo} alt="Logo" />

                <div className="action-container">
                    <InteriorLink to={"/admin"} text={"Bütün işcilər"} />

                    <Button onClick={() => signOutFunc()} text={"Çıxış et"} />
                </div>

            </div>
        </div>
    )
}

export default Header;