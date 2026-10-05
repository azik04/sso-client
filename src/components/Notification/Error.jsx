import "./style.css"

const Error = ({ message }) => {
    return (
        <div className="notify notify_error">
            <i class="fa-regular fa-circle-xmark"></i>
            <span>{message}</span>
        </div>
    )
}

export default Error;