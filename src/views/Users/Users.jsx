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
    const [administrationName, setAdministrationName] = useState("")
    const [departmentName, setDepartmentName] = useState("")

    const fetchData = async () => {
        try {
            const params = new URLSearchParams({
                pageNumber: String(pageNumber),
                pageSize: String(pageSize),
            });

            if (name.trim()) params.append("name", name.trim());
            if (surname.trim()) params.append("surname", surname.trim());
            if (departmentName.trim()) {
                params.append("departmentName", departmentName.trim());
            }
            if (administrationName.trim()) {
                params.append("administrationName", administrationName.trim());
            }

            const res = await api.get(`Account/get-all?${params.toString()}`);

            const result = res.data;

            setData(result.data ?? []);
            setHasNextPage(result.hasNextPage ?? false);
            setHasPrevPage(result.hasPrevPage ?? false);
            setTotalCount(result.totalCount ?? 0);
            setTotalPages(result.totalPages ?? 0);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const downloadData = async () => {
        try {
            const res = await api.get(`Account/export`, { responseType: "blob", });

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
    }, [pageNumber, pageSize, name, surname, administrationName, departmentName])

    return (
        <>
            <div className="filter">
                <div className="row">
                    <InputModel col="col-6" placeholder="Ad" label="Ad" value={name} onChange={(e) => { setName(e.target.value); setPageNumber(1); }} />

                    <InputModel col="col-6" placeholder="Soyad" label="Soyad" value={surname} onChange={(e) => { setSurname(e.target.value); setPageNumber(1); }} />

                    <InputModel col="col-6" placeholder="İdarə" label="İdarə" value={administrationName} onChange={(e) => { setAdministrationName(e.target.value); setPageNumber(1); }} />

                    <InputModel col="col-6" placeholder="Şöbə" label="Şöbə" value={departmentName} onChange={(e) => { setDepartmentName(e.target.value); setPageNumber(1); }} />
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
                isFooter={true}
                totalPages={totalPages}
                isButton={true}
                buttonTxt={"Export Data"}
                buttonFunc={downloadData}
            >
                <UserTable data={data} fetchData={fetchData} />
            </Table>
        </>

    )
}

export default Users;