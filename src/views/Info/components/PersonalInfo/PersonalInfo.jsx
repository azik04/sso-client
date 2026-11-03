import { useState } from "react";
import Button from "../../../../components/Button/Button";
import InteriorLink from "../../../../components/Link/InteriorLink";
import "./style.css";
import api from "../../../../services/api";
import BaseModal from "../../../../components/Modal/BaseModal";
import UploadAvatar from "../UploadAvatar/UploadAvatar";
import { useParams } from "react-router-dom";
import UserForm from "./components/UserForm/UserForm";
import ConfirmDialog from "../../../../components/Modal/ConfirmDialog";

const PersonalInfo = ({ data, fetchData, form, setForm }) => {
    const [file, setFile] = useState(null);
    const [uploadAvatar, setUploadAvatar] = useState(false);
    const [editPop, setEditPop] = useState(false)
    const [removePop, setRemovePop] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const res = await api.put(`Account/id/${data.id}`, form)

        setEditPop(false);

        await fetchData()
    }

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.put(`Account/id/${data.id}/upload`, formData,
            {
                headers: {
                    "Content-Type": undefined
                }
            }
        )

        setFile(null)
        setUploadAvatar(false)

        await fetchData()
    }

    const removeSubmit = async () => {
        const res = await api.delete(`Account/id/${data.id}`)

        setRemData(false);

        await fetchData()
    }

    return (
        <div className="info-box">
            <div className="info-box__header">
                <h2>Şəxsi məlumatlar</h2>

                <div>
                    <div className="action-container">
                        {(data?.commission?.length > 0 || data?.position === "Şöbə müdiri") && (
                            <InteriorLink
                                to={`/user/${data.id}/commission/1`}
                                text="Komissiya yarat"
                            />
                        )}

                        {["Hr", "HrAdmin"].includes(data.role) && (
                            <>
                                <Button onClick={() => setEditPop(true)} text="Redaktə et" />
                                <Button onClick={() => setUploadAvatar(true)} text="Şəkil əlavə et" />
                                <Button onClick={() => setRemovePop(true)} text="Sil" />
                            </>
                        )}
                    </div>

                </div>
            </div>

            <div className="info-box__content">
                {data.avatarPath && (
                    <img className="info-box__avatar" src={`http://172.16.60.82:8087${data.avatarPath}`} alt="profile" />
                )}

                <div className="info-box__row">
                    <span className="info-box__label">İdentifikator</span>

                    <span className="info-box__value">{data.id}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Ad</span>

                    <span className="info-box__value">{data.name}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Soyad</span>

                    <span className="info-box__value">{data.surname}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Username</span>

                    <span className="info-box__value">{data.username}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Email</span>

                    <span className="info-box__value">{data.email}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">İdarə</span>

                    <span className="info-box__value">{data.administrationName}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Şöbə</span>

                    <span className="info-box__value">{data.departmentName}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Vəzifə</span>

                    <span className="info-box__value">{data.position}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">Daxili nömrə</span>

                    <span className="info-box__value">{data.localContact}</span>
                </div>

                <div className="info-box__row">
                    <span className="info-box__label">ADRA-da işə qəbul tarixi</span>

                    <span className="info-box__value">{data.workStartDate}</span>
                </div>

                {data.lastUpdatePositionDate && (
                    <div className="info-box__row">
                        <span className="info-box__label">Son vəzifə dəyişikliyi tarixi</span>

                        <span className="info-box__value">{data.lastUpdatePositionDate}</span>
                    </div>
                )}

                {data.commission?.length > 0 && (
                    <div className="info-box__row">
                        <span className="info-box__label">Üzv olduğu komissiyalar</span>

                        <span className="info-box__value">
                            {data.commission?.map((item, index) => (<span key={index}>{item.name}</span>))}
                        </span>
                    </div>
                )}


                <div className="info-box__row">
                    <span className="info-box__label">İstifadəçi tarixçəsi</span>

                    <span className="info-box__value">
                        <InteriorLink to={`/user/${data.id}/history`} text={"Daha ətraflı"} />
                    </span>
                </div>

            </div>

            {uploadAvatar && (
                <BaseModal size="md" onSubmit={() => uploadFile()} onClose={() => setUploadAvatar(false)} title={"Şəkil əlavə et"}>
                    <UploadAvatar setFile={setFile} />
                </BaseModal>
            )}

            {editPop && (
                <BaseModal
                    title={"İstifadecini redakt et"}
                    onClose={() => setEditPop(false)}
                    onSubmit={() => handleSubmit()}
                >
                    <UserForm form={form} onChange={handleChange} />
                </BaseModal>
            )}

            {removePop && (
                <ConfirmDialog onSubmit={() => removeSubmit()} onClose={() => setRemovePop(false)} />
            )}
        </div>
    );
};

export default PersonalInfo;
