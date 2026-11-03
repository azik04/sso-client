import Table from "../../../../components/Table/Table";
import GlobalLink from "../../../../components/Link/GlobalLink";

const Exam = ({ data }) => {
    return (
        <Table headerText="Təlim nəticələri" isFooter={false}>
            <div className="table__wrap">
                <table className="table__body">
                    <thead>
                        <tr>
                            <th>Təlim</th>
                            <th>Status</th>
                            <th>Nəticə</th>
                            <th>Əmaliyyətlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.testName}</td>
                                    <td>{item.status}</td>
                                    <td>{item.totalScore}</td>
                                    <td>
                                        <GlobalLink to={`http://web-test.adra.gov.az:3002/exam/${item.id}/result`} text="Ətraflı" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>Məlumat yoxdur</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </Table>
    )
}

export default Exam;