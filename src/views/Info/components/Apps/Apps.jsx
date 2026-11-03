import { useEffect, useState } from "react";
import api from "../../../../services/api";
import Table from "../../../../components/Table/Table";
import GlobalLink from "../../../../components/Link/GlobalLink";

const Apps = () => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await api.get("Application/get-all")
        setData(res.data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Table headerText="Integrasiyalar" isFooter={false}>
            <div className="table__wrap">
                <table className="table__body">
                    <thead>
                        <tr>
                            <th>Proqram adı</th>
                            <th>Əmaliyyətlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    <GlobalLink to={item.mainUrl} text={"Keçid et"}/>    
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        </Table>
    )
}

export default Apps;