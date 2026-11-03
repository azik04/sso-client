import Button from "../Button/Button";

const ConfirmDialog = ({
    title = "Təsdiq",
    message = "Bu əməliyyatı yerinə yetirmək istədiyinizə əminsiniz?",
    onClose,
    size = "sm",
    showHeader = true,
    onSubmit
}) => {
    return (
        <div className="modal" onClick={onClose}>
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

                    <p className="confirm__message">{message}</p>
                </div>

                <footer className="modal__footer">
                    <Button text={"Bağla"} onClick={onClose} />

                    <Button text={"Təsdiqlə"} onClick={onSubmit} />
                </footer>
            </div>
        </div>
    );
};

export default ConfirmDialog;