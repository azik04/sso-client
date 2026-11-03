import { Outlet } from "react-router-dom";
import "./style.css"

const Layout = () => {
    return (
        <div className="oauth__bg">
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;