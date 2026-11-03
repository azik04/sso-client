import InputModel from "../../../../components/InputModel/InputModel";

const UploadAvatar = ({ setFile }) => {
    return (
        <div className="row g-3">
            <InputModel
                col="col-12"
                id="file"
                label="Fayl"
                name="file"
                placeholder="Faylı seçin"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                type="file"
                accept="image/*"
            />
        </div>
    );
};

export default UploadAvatar;