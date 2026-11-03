import "./style.css"

const UserHistoryTable = ({ data }) => {

    return (
        <div className="table__wrap">
            <table className="table__body">
                <thead>
                    <tr>
                        <th>İstifadəci</th>
                        <th>Application Id</th>
                        <th>Application</th>
                        <th>Giriş tarixçəsi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td className="table-nodata" colSpan={4}>
                                Data tapılmadı.
                            </td>
                        </tr>
                    )}

                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name} {item.surname}</td>
                            <td>{item.appId}</td>
                            <td>{item.appName}</td>
                            <td>{item.createAt}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default UserHistoryTable;