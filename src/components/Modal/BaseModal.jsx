import Button from "../Button/Button";
import "./style.css";

const BaseModal = ({
    title,
    children,
    onClose,
    size = "lg",
    showHeader = true,
    onSubmit
}) => {
    return (
        <div className="modal">
            <div className={`modal__box modal__box--${size}`} onClick={(e) => e.stopPropagation()}>
                {showHeader && (
                    <header className="modal__header">
                        <h4>{title}</h4>

                        <button className="modal__close" onClick={onClose} aria-label="Close">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </header>
                )}

                <div className="modal__body">
                    {children}
                </div>

                <footer className="modal__footer">
                    <Button text={"Bağla"} onClick={onClose} />

                    <Button text={"Təsdiqlə"} onClick={onSubmit} />
                </footer>
            </div>
        </div>
    );
};

export default BaseModal;