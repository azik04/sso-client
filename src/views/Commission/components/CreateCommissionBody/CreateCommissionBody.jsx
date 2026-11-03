
import Button from "../../../../components/Button/Button";
import SelectModel from "../../../../components/SelectModel/SelectModel";
import "./style.css";

export const criteria = [
    {
        title: "Tutduğu vəzifə üzrə bilik səviyyəsi",
        indicators:
            "Vəzifə təlimatında nəzərdə tutulan funksiyalar, müvafiq sahədə qanunvericilik aktları, daxili qaydalar və iş prosesləri üzrə biliklərin yoxlanılması.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "İşin keyfiyyəti və nəticə yönümlülük",
        indicators:
            "İcra edilmiş tapşırıqların keyfiyyəti və nəticələrin müəyyən edilmiş tələblərə uyğunluğu.",
        method: "Nəticə əsaslı",
    },
    {
        title: "Analitik yanaşma və problem həll etmə",
        indicators:
            "Problemlərin təhlili və əsaslandırılmış həll yollarının təklif edilməsi.",
        method: "Müsahibə və nəticə əsaslı",
    },
    {
        title: "Dünyagörüşü və məlumatlılıq",
        indicators:
            "Sahə üzrə yeniliklər, qanunvericilik və mühüm hadisələr barədə məlumatlılıq.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "Öyrənmə və inkişaf",
        indicators:
            "Yeni bilik və bacarıqların əldə edilməsi və işdə tətbiqi.",
        method: "Müsahibə və nəticə əsaslı",
    },
    {
        title: "İnnovativlik",
        indicators:
            "İş proseslərinin təkmilləşdirilməsi və səmərəliliyin artırılması.",
        method: "Praktiki situasiya əsaslı",
    },
    {
        title: "Kommunikasiya",
        indicators:
            "Fikirləri aydın ifadə etmək və düzgün ünsiyyət qurmaq bacarığı.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "Komanda işi",
        indicators:
            "Əməkdaşlıq və birgə işə töhfə vermək bacarığı.",
        method: "Müsahibə və nəticə əsaslı",
    },
    {
        title: "Məsuliyyət və təşəbbüskarlıq",
        indicators:
            "Tapşırıqlara məsuliyyətli yanaşma və təşəbbüs göstərmək.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "Müstəqil qərar qəbul etmə",
        indicators:
            "Müstəqil qərar vermək və nəticələrə görə məsuliyyət daşımaq.",
        method: "Praktiki situasiya əsaslı",
    },
    {
        title: "Uyğunlaşma və çeviklik",
        indicators:
            "Yeni iş şəraitinə və dəyişən prioritetlərə uyğunlaşmaq.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "Dəyişikliklərə və yeniliklərə adaptasiya",
        indicators:
            "Yeni sistem və iş üsullarını mənimsəmək.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "İdarəetmə və liderlik",
        indicators:
            "İşi təşkil etmək, qərar vermək və komandaya dəstək göstərmək.",
        method: "Praktiki situasiya əsaslı",
    },
    {
        title: "Karyera hədəfi və fərqli sahəyə hazırlıq",
        indicators:
            "Karyera məqsədləri və digər sahələrdə işləməyə hazırlıq.",
        method: "Müsahibə əsaslı",
    },
    {
        title: "İnkişaf potensialı və məsuliyyətə hazırlıq səviyyəsi",
        indicators:
            "Daha mürəkkəb tapşırıqları yerinə yetirmək və yüksək vəzifəyə hazır olmaq.",
        method: "Praktiki situasiya əsaslı",
    },
];


const scoreDescriptions = [
    "Tələblərə cavab vermir",
    "Qismən cavab verir",
    "Tələblərə cavab verir",
    "Gözləntiləri üstələyir",
    "Fərqləndirici nəticələr",
];

const scoreOptions = scoreDescriptions.map((description, index) => ({
    id: index + 1,
    name: `${index + 1} - ${description}`,
}));

export const additionalNotes = [
    {
        id: "rotationSuggested",
        label: "Başqa struktur bölməyə keçirilməsi (rotasiya olunması) təklif edilir",
    },
    {
        id: "futureManagerCandidate",
        label: "Gələcəkdə rəhbər vəzifə üzrə dəyərləndirilə bilər",
    },
    {
        id: "managerReserve",
        label: "Rəhbər vəzifə üzrə ehtiyat kadrlara daxil edilsin",
    },
];

const verdicts = [
    {
        label: "Tutduğu vəzifəyə uyğun deyil",
        min: 0,
        max: 30,
    },
    {
        label: "Tutduğu vəzifəyə qismən uyğundur, təlim-inkişafa ehtiyac var",
        min: 31,
        max: 45,
    },
    {
        label: "Tutduğu vəzifəyə uyğundur",
        min: 46,
        max: 60,
    },
    {
        label: "Vəzifədə yüksəlişi təklif edilir",
        min: 61,
        max: 75,
    },
];

const CreateCommissionBody = ({
    scores = [],
    errors = {},
    notes = {},
    onScoreChange,
    onNoteChange,
    onSubmit,
    onReset,
    isSubmitting = false,
}) => {
    const complete =
        scores.length === criteria.length &&
        scores.every(
            (score) => score !== "" && score !== null && score !== undefined
        );

    const total = scores.reduce(
        (sum, score) => sum + Number(score || 0),
        0
    );

    const today = new Date().toLocaleDateString("az-AZ");

    return (
        <form className="create-commission" onSubmit={onSubmit}>
            <section className="create-commission__section">
                <div className="create-commission__section-header">
                    <h2 className="create-commission__section-title">
                        Qiymətləndirmə meyarları
                    </h2>

                    <span className="create-commission__count">
                        {criteria.length} meyar
                    </span>
                </div>

                <div className="create-commission__score-guide">
                    {scoreDescriptions.map((description, index) => (
                        <span key={description}>
                            <strong>{index + 1}</strong> — {description}
                        </span>
                    ))}
                </div>

                <div className="create-commission__criteria-list">
                    {criteria.map((item, index) => {
                        const fieldName = `field${index + 1}`;

                        return (
                            <div
                                className="create-commission__criterion"
                                key={item.title}
                            >
                                <div className="create-commission__criterion-number">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="create-commission__criterion-content">
                                    <div className="create-commission__criterion-info">
                                        <label
                                            className="create-commission__criterion-label"
                                            htmlFor={fieldName}
                                        >
                                            {item.title}
                                        </label>

                                        <p className="create-commission__criterion-description">
                                            {item.indicators}
                                        </p>

                                        <span className="create-commission__criterion-method">
                                            {item.method}
                                        </span>
                                    </div>

                                    <div className="create-commission__criterion-select">
                                        <SelectModel
                                            col="col-12"
                                            id={fieldName}
                                            name={fieldName}
                                            value={scores[index] ?? ""}
                                            onChange={(e) =>
                                                onScoreChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            options={scoreOptions}
                                            placeholder="Bal seçin"
                                            error={errors[fieldName]}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="create-commission__section">
                <div className="create-commission__section-header">
                    <h2 className="create-commission__section-title">
                        Komissiya üzvünün yekun rəyi
                    </h2>

                    <span className="create-commission__total">
                        {total} / {criteria.length * 5} bal
                    </span>
                </div>

                <div className="create-commission__verdict-list">
                    {verdicts.map((item) => {
                        const active =
                            complete &&
                            total >= item.min &&
                            total <= item.max;

                        return (
                            <div
                                key={item.label}
                                className={`create-commission__verdict ${
                                    active
                                        ? "create-commission__verdict--active"
                                        : ""
                                }`}
                            >
                                <span className="create-commission__verdict-icon">
                                    {active ? "☑" : "☐"}
                                </span>

                                <span className="create-commission__verdict-label">
                                    {item.label}
                                </span>

                                <span className="create-commission__verdict-range">
                                    {item.min}–{item.max} bal
                                </span>
                            </div>
                        );
                    })}
                </div>

                {!complete && (
                    <p className="create-commission__hint">
                        Yekun rəy bütün meyarlar qiymətləndirildikdən sonra
                        müəyyən edilir.
                    </p>
                )}

                <div className="create-commission__notes">
                    <h3 className="create-commission__notes-title">
                        Əlavə qeyd
                    </h3>

                    {additionalNotes.map((item) => (
                        <label
                            className="create-commission__note"
                            key={item.id}
                        >
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={notes[item.id] ?? false}
                                onChange={(e) =>
                                    onNoteChange(item.id, e.target.checked)
                                }
                            />

                            <span>{item.label}</span>
                        </label>
                    ))}
                </div>
            </section>

            <div className="create-commission__actions">
                <Button onClick={onReset} text={"Təmizlə"}/>

                <Button onClick={onSubmit} text={"Təsdiqlə"}/>
            </div>
        </form>
    );
};

export default CreateCommissionBody;
