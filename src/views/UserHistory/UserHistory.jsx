import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Table from "../../components/Table/Table";
import UserHistoryTable from "./components/UserHistoryTable/UserHistoryTable";

const UserHistory = () => {
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(15);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const { userId } = useParams();

    const fetchData = async () => {
        const res = await api.get(`AuthorizationCode/${userId}/history?pageNumber=${pageNumber}&pageSize=${pageSize}`)

        setData(res.data.data)
        setHasNextPage(res.data.hasNextPage);
        setHasPrevPage(res.data.hasPrevPage);
        setPageNumber(res.data.pageNumber);
        setPageSize(res.data.pageSize);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
    }

    useEffect(() => {
        fetchData()
    }, [userId, pageNumber, pageSize])

    const downloadData = async () => {
        try {
            const res = await api.get(
                `AuthorizationCode/${userId}/export`,
                {
                    responseType: "blob",
                }
            );

            const contentDisposition = res.headers["content-disposition"];

            let fileName = `Hesabat_${data[0].name}-${data[0].surname}`;

            if (contentDisposition) {
                const match = contentDisposition.match(
                    /filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/i
                );

                if (match) {
                    fileName = decodeURIComponent(match[1]);
                }
            }

            const url = window.URL.createObjectURL(res.data);

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };


    useEffect(() => {
        fetchData()
    }, [userId, pageNumber, pageSize])

    return (
        <>
            <Table
                headerText="Giriş tarixçəsi"
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalCount={totalCount}
                totalPages={totalPages}
                isButton={true}
                buttonTxt={"Export Data"}
                buttonFunc={downloadData}
            >
                <UserHistoryTable data={data} />
            </Table>

        </>

    )
}

export default UserHistory;