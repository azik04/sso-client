import "./style.css"
import InteriorLink from "../../../../components/Link/InteriorLink";

const UserTable = ({ data }) => {
    return (
        <div className="table__wrap">
            <table className="table__body">
                <thead>
                    <tr>
                        <th>Ad, Soyad</th>
                        <th>Email</th>
                        <th>Şöbə</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name} {item.surname}</td>
                            <td>{item.email}</td>
                            <td>{item.administrationName && item.departmentName
                                ? `${item.administrationName} - ${item.departmentName}`
                                : item.administrationName || item.departmentName || ""}
                            </td>
                            <td>
                                <div className="action-container">
                                    <InteriorLink to={`/user/${item.id}`} text={"Daha ətraflı"} />
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default UserTable;