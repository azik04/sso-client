
import { Link } from "react-router-dom";
import "./style.css";

const InteriorLink = ({ to, text }) => {
    return (
        <Link className="link-primary" to={to}>
            {text}
        </Link>
    );
};

export default InteriorLink;
