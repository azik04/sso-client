import "./style.css"

const Success = ({ message }) => {

    return (
        <div className="notify notify_succes shadow">
            <i class="fa-regular fa-circle-check"></i>
            <span>{message}</span>
        </div>
    )
}

export default Success;