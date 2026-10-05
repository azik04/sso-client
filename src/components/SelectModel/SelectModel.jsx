const SelectModel = ({
    col = "col-12",
    id,
    name,
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    valueField = "id",
    labelField = "name",
    error,
    disabled = false,
    required = false,
    className = "",
    ...rest
}) => {
    const errorId = `${id}-error`;

    return (
        <div className={`${col} mb-3`}>
            {label && (
                <label htmlFor={id} className="form-label fw-semibold">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            <select
                id={id}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`form-select form-select-lg ${error ? "is-invalid" : ""} ${className}`}
                {...rest}
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option[valueField]}
                        value={option[valueField]}
                    >
                        {option[labelField]}
                    </option>
                ))}
            </select>

            {error && (
                <div id={errorId} className="invalid-feedback d-block">
                    {error}
                </div>
            )}
        </div>
    );
};

export default SelectModel;