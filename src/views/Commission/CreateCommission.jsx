
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

import CreateCommissionHeader from "./components/CreateCommissionHeader/CreateCommissionHeader";
import CreateCommissionBody, {
    criteria,
    additionalNotes,
} from "./components/CreateCommissionBody/CreateCommissionBody";
import CreateCommissionCreator from "./components/CreateCommissionFooter/CreateCommissionCreator";

const initialScores = Array(criteria.length).fill("");

const initialNotes = Object.fromEntries(
    additionalNotes.map((note) => [note.id, false])
);

const CreateCommission = () => {
    const { userId, commissionId } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [scores, setScores] = useState([...initialScores]);
    const [notes, setNotes] = useState({ ...initialNotes });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const createdByName = localStorage.getItem("PersonalInfo");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeeRes, currentUserRes] = await Promise.all([
                    api.get(`Account/id/${userId}`),
                    api.get("Account/info"),
                ]);

                setUserData(employeeRes.data?.data ?? {});
                setCurrentUser(currentUserRes.data?.data ?? {});
            } catch (error) {
                console.error("Məlumatları yükləmək mümkün olmadı:", error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleScoreChange = (index, value) => {
        setScores((prev) =>
            prev.map((score, i) => (i === index ? value : score))
        );

        setErrors((prev) => ({
            ...prev,
            [`field${index + 1}`]: "",
        }));

        setSubmitError("");
    };

    const handleNoteChange = (noteId, checked) => {
        setNotes((prev) => ({
            ...prev,
            [noteId]: checked,
        }));
    };

    const handleReset = () => {
        setScores([...initialScores]);
        setNotes({ ...initialNotes });
        setErrors({});
        setSubmitError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        const newErrors = {};

        scores.forEach((score, index) => {
            if (score === "" || score === null || score === undefined) {
                newErrors[`field${index + 1}`] = "Bal seçin.";
                return;
            }

            const numericScore = Number(score);

            if (
                !Number.isInteger(numericScore) ||
                numericScore < 1 ||
                numericScore > 5
            ) {
                newErrors[`field${index + 1}`] =
                    "Bal 1 ilə 5 arasında olmalıdır.";
            }
        });

        if (!userId) {
            newErrors.userId = "İşçi məlumatı tapılmadı.";
        }

        if (!currentUser.id) {
            newErrors.createdBy = "Komissiya üzvünün məlumatı tapılmadı.";
        }

        const numericCommissionId = Number(commissionId);

        if (
            !commissionId ||
            !Number.isInteger(numericCommissionId) ||
            numericCommissionId <= 0
        ) {
            newErrors.commissionId = "Komissiya məlumatı düzgün deyil.";
        }

        setErrors(newErrors);
        setSubmitError("");

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const totalScore = scores.reduce(
            (sum, score) => sum + Number(score),
            0
        );

        const payload = {
            createdFor: userId,
            createdBy: currentUser.id,
            commissionId: numericCommissionId,

            ...Object.fromEntries(
                scores.map((score, index) => [
                    `field${index + 1}`,
                    Number(score),
                ])
            ),

            ...notes,
        };

        try {
            setIsSubmitting(true);

            await api.post("CommissionRank/create", payload);

            handleReset();

            navigate(`/user/${userId}`);
        } catch (error) {
            console.error(
                "Qiymətləndirməni yadda saxlamaq mümkün olmadı:",
                error
            );

            setSubmitError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Qiymətləndirməni yadda saxlamaq mümkün olmadı."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-commission-page">
            <div className="create-commission-card">
                <div className="create-commission-header">
                    <div>
                        <h1 className="create-commission-title">
                            İşçinin qiymətləndirilməsi
                        </h1>
                    </div>
                </div>

                <CreateCommissionHeader
                    data={userData}
                    createdByName={createdByName}
                />

                {submitError && (
                    <div className="alert alert-danger" role="alert">
                        {submitError}
                    </div>
                )}

                <CreateCommissionBody
                    scores={scores}
                    errors={errors}
                    notes={notes}
                    onScoreChange={handleScoreChange}
                    onNoteChange={handleNoteChange}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    isSubmitting={isSubmitting}
                />

                <CreateCommissionCreator />

            </div>
        </div>
    );
};

export default CreateCommission;
