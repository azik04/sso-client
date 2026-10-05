import { Link } from "react-router-dom";
import "./style.css"

const UserTable = ({ data }) => {

    return (
        <div className="table__wrap">
            <table className="table__body">
                <thead>
                    <tr>
                        <th>Ad, Soyad</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>İdarə - Şöbə - Vəzifə</th>
                        <th>İstifadəçi tarixçəsi</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name} {item.surname}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                {[item.administration, item.department, item.position]
                                    .filter(Boolean)
                                    .join(" - ")}
                            </td>
                            <td><Link to={`/user/${item.id}/history`}>Daha ətraflı</Link></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default UserTable;