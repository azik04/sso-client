
import "./style.css";

const GlobalLink = ({ to, text }) => {
    return (
        <a className="link-primary" href={to} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );
};

export default GlobalLink;
