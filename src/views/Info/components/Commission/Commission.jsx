
import { Fragment, useState } from "react";
import Button from "../../../../components/Button/Button";
import Table from "../../../../components/Table/Table";
import api from "../../../../services/api";
import CommissioDetail from "../CommissionDetail/CommissionDetail";
import "./style.css";

const Commission = ({ data = [] }) => {
    const [detailData, setDetailData] = useState({})

    const fetchDetailData = async (commissionId) => {
        const res = await api.get(`/CommissionRank/id/${commissionId}`)
        setDetailData(res.data.data)
    }

    const onClose = () => {
        setDetailData(null)
    }

    return (
        <Table headerText={"Komissiyalar"}>

            <table className="table__body">
                <thead>
                    <tr>
                        <th>Komissiya</th>
                        <th>Yaradan şəxs</th>
                        <th>Tarix</th>
                        <th className="commission-action-column">
                            Ətraflı
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data?.length > 0 ? (
                        data.map((item) => (
                            <Fragment key={item.id}>
                                <tr>
                                    <td>{item.commissionName}</td>
                                    <td>{item.createdByName}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <Button
                                            text={detailData?.id === item.id ? "Bağla" : "Ətraflı"}
                                            onClick={() =>
                                                detailData?.id === item.id
                                                    ? onClose()
                                                    : fetchDetailData(item.id)
                                            }
                                        />
                                    </td>
                                </tr>

                                {detailData?.id === item.id && (
                                    <CommissioDetail data={detailData} />
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                Məlumat yoxdur
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Table>
    );
};

export default Commission;
