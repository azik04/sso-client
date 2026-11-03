import "./style.css";

const Button = ({ onClick, text, type = "button", disabled = false }) => {
    return (
        <button
            className="button-primary"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;