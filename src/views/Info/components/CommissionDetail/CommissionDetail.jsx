
import "./style.css";

const criteria = [
    "Tutduğu vəzifə üzrə bilik səviyyəsi",
    "İşin keyfiyyəti və nəticə yönümlülük",
    "Analitik yanaşma və problem həll etmə",
    "Dünyagörüşü və məlumatlılıq",
    "Öyrənmə və inkişaf",
    "İnnovativlik",
    "Kommunikasiya",
    "Komanda işi",
    "Məsuliyyət və təşəbbüskarlıq",
    "Müstəqil qərar qəbul etmə",
    "Uyğunlaşma və çeviklik",
    "Dəyişikliklərə və yeniliklərə adaptasiya",
    "İdarəetmə və liderlik",
    "Karyera hədəfi və fərqli sahəyə hazırlıq",
    "İnkişaf potensialı və məsuliyyətə hazırlıq səviyyəsi",
];

const recommendations = [
    { label: "Rotasiya təklif edilir", field: "rotationSuggested" },
    { label: "Gələcək rəhbər vəzifəyə namizəd", field: "futureManagerCandidate" },
    { label: "Rəhbər vəzifə üzrə ehtiyat kadr", field: "managerReserve" },
];

const CommissionDetail = ({ data }) => {
    return (
        <tr className="commission-detail-row">
            <td colSpan={4} className="commission-detail-cell">
                <div className="commission-detail">
                    <header className="commission-detail__header">
                        <span className="commission-detail__eyebrow">
                            QİYMƏTLƏNDİRMƏ HESABATI
                        </span>
                        <h3>Komissiya məlumatları</h3>
                    </header>

                    <div className="commission-detail__info">
                        <div className="commission-detail__item">
                            <span>Komissiya</span>
                            <strong>{data.commissionName}</strong>
                        </div>

                        <div className="commission-detail__item">
                            <span>Yaradan</span>
                            <strong>{data.createdByName}</strong>
                        </div>

                        <div className="commission-detail__item">
                            <span>Qiymətləndirilən şəxs</span>
                            <strong>{data.createdForName}</strong>
                        </div>

                        <div className="commission-detail__item">
                            <span>Tarix</span>
                            <strong>{data.createdAt}</strong>
                        </div>
                    </div>

                    <div className="commission-detail__summary">
                        <div className="commission-detail__score">
                            <span>Ümumi bal</span>
                            <strong>
                                {data.sumScore}
                                <small> / 75</small>
                            </strong>
                        </div>

                        <div className="commission-detail__conclusion">
                            <span>Yekun rəy</span>
                            <strong>{data.conclusion}</strong>
                        </div>
                    </div>

                    <section className="commission-detail__section">
                        <div className="commission-detail__section-header">
                            <h4>Meyarlar</h4>
                            <span>15 meyar</span>
                        </div>

                        <div className="commission-detail__criteria">
                            {criteria.map((title, index) => (
                                <div
                                    className="commission-detail__criterion"
                                    key={title}
                                >
                                    <span className="commission-detail__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="commission-detail__title">
                                        {title}
                                    </span>

                                    <strong className="commission-detail__value">
                                        {data[`field${index + 1}`]}
                                        <small> / 5</small>
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="commission-detail__section">
                        <div className="commission-detail__section-header">
                            <h4>Əlavə qeydlər</h4>
                        </div>

                        <div className="commission-detail__recommendations">
                            {recommendations.map(({ label, field }) => (
                                <div
                                    className="commission-detail__recommendation"
                                    key={field}
                                >
                                    <span>{label}</span>
                                    <strong>
                                        {data[field] == null || data[field] === ""
                                            ? "—"
                                            : String(data[field])}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </td>
        </tr>
    );
};

export default CommissionDetail;
