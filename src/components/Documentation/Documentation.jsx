import "./style.css"
const Documentation = ({ onClose, children }) => {
    return (
        <div className="modal" onClick={() => onClose()}>
            <div className="modal__box" onClick={() => onClose()}>
                <header className="modal__header">
                    <h4>Dokumentasiya</h4>

                    <button className="modal__close" onClick={onClose} aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </header>

                <div className="modal__body">
                    <p>
                        <strong>İstifadəçi adınızı</strong> öyrənmək üçün kompüterinizdə <strong>C:\Users</strong> qovluğunu açın. Burada sizin Windows istifadəçi adınız göstərilir.
                        <br />
                        <strong>Parol</strong> olaraq isə kompüterinizin parolunu daxil edin.
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Documentation;