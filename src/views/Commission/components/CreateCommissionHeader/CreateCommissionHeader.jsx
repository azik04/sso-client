
import "./style.css";

const CreateCommissionHeader = ({ data = {} }) => {
    const fields = [
        {
            label: "İşçi (Ad / Soyad / Ata adı)",
            value: [data.name, data.surname].filter(Boolean).join(" "),
        },
        {
            label: "Struktur bölmə",
            value: [data.administrationName, data.departmentName]
                .filter(Boolean)
                .join(" - "),
        },
        {
            label: "Vəzifə",
            value: data.position,
        },
        {
            label: "Ümumi əmək stajı",
            value: data.overallWorkStartDate,
        },
        {
            label: "ADRA-da iş stajı",
            value: data.workStartDate,
        },
        {
            label: "Son vəzifə dəyişikliyi tarixi",
            value: data.lastUpdatePositionDate ?? "Vəzifə artımı olunmayıb",
        },
    ];

    return (
        <section className="employee-info">
            <h2 className="employee-info__title">
                İşçi haqqında məlumat
            </h2>

            <div className="employee-info__grid">
                {fields.map(({ label, value }) => (
                    <div className="employee-info__field" key={label}>
                        <label className="employee-info__label">
                            {label}
                        </label>

                        <div className="employee-info__value">
                            {value || "—"}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CreateCommissionHeader;
