import { useEffect, useState } from "react";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import UserTable from "./components/UserTable/UserTable";
import InputModel from "../../components/InputModel/InputModel";
import "./style.css"

const Users = () => {
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(15);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    const fetchData = async () => {
        const res = await api.get(`Account/get-all?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&surname=${surname}`)

        setData(res.data.data);
        setHasNextPage(res.data.hasNextPage);
        setHasPrevPage(res.data.hasPrevPage);
        setPageNumber(res.data.pageNumber);
        setPageSize(res.data.pageSize);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
    }

    useEffect(() => {
        fetchData()
    }, [pageNumber, pageSize, name, surname])

    return (
        <>
            <div className="filter">
                <div className="row">
                    <InputModel col="col-6" placeholder="Ad" label="Ad" value={name} onChange={(e) => setName(e.target.value)} />

                    <InputModel col="col-6" placeholder="Soyad" label="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
            </div>


            <Table
                headerText="Admin Səhifəsi"
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalCount={totalCount}
                totalPages={totalPages}
            >
                <UserTable data={data} />
            </Table>

        </>

    )
}

export default Users;