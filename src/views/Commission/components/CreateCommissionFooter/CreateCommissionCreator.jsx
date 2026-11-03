const CreateCommissionFooter = () => {
    const createdBy = localStorage.getItem("PersonalInfo");
    const position = localStorage.getItem("Position");
    const today = new Date().toLocaleDateString("az-AZ");

    return (
        <section className="employee-info">
            <h2 className="employee-info__title">
                Komissiya üzvü
            </h2>

            <div className="employee-info__grid">
                <div className="employee-info__field">
                    <label className="employee-info__label">Ad, soyad</label>

                    <div className="employee-info__value">
                        {createdBy}
                    </div>
                </div>

                <div className="employee-info__field">
                    <label className="employee-info__label">Vəzifə</label>

                    <div className="employee-info__value">
                        {position}
                    </div>
                </div>

                <div className="employee-info__field">
                    <label className="employee-info__label">Tarix</label>

                    <div className="employee-info__value">
                        {today}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateCommissionFooter;
