import InputModel from "../../../../components/InputModel/InputModel";

const UserForm = ({ form = {}, onChange }) => {
    return (
        <div className="row g-3">
            <InputModel
                col="col-12 col-md-4"
                id="name"
                label="Ad"
                name="name"
                placeholder="Adı daxil edin"
                value={form.name ?? ""}
                onChange={onChange}
                disabled
            />

            <InputModel
                col="col-12 col-md-4"
                id="surname"
                label="Soyad"
                name="surname"
                placeholder="Soyadı daxil edin"
                value={form.surname ?? ""}
                onChange={onChange}
                disabled
            />

            <InputModel
                col="col-12 col-md-4"
                id="workStartDate"
                label="ADRA-da işə qəbul tarixi"
                name="workStartDate"
                placeholder="İşə qəbul tarixini seçin"
                type="date"
                value={form.workStartDate ?? ""}
                onChange={onChange}
            />

            <InputModel
                col="col-12 col-md-4"
                id="lastUpdatePositionDate"
                label="Son vəzifə dəyişikliyi tarixi"
                name="lastUpdatePositionDate"
                placeholder="Tarixi seçin"
                type="date"
                value={form.lastUpdatePositionDate ?? ""}
                onChange={onChange}
            />

            <InputModel
                col="col-12 col-md-4"
                id="pin"
                label="FIN kod"
                name="pin"
                placeholder="FIN kodu daxil edin"
                value={form.pin ?? ""}
                onChange={onChange}
            />

            <InputModel
                col="col-12 col-md-4"
                id="documentNumber"
                label="Vəsiqənin nömrəsi"
                name="documentNumber"
                placeholder="Vəsiqənin nömrəsini daxil edin"
                value={form.documentNumber ?? ""}
                onChange={onChange}
            />

            <InputModel
                col="col-12 col-md-4"
                id="localContact"
                label="Daxili nömrə"
                name="localContact"
                placeholder="Daxili nömrəni daxil edin"
                value={form.localContact ?? ""}
                onChange={onChange}
            />

            <InputModel
                col="col-12 col-md-4"
                id="globalContact"
                label="Mobil nömrə"
                name="globalContact"
                placeholder="Mobil nömrəni daxil edin"
                value={form.globalContact ?? ""}
                onChange={onChange}
            />
        </div>
    );
};

export default UserForm;