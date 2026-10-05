const InputModel = ({
    col = "col-12",
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    readOnly = false,
    multiple = false,
    accept,
    autoComplete = "off",
    className = "",
    min,
    max,
    step,
    maxLength,
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

            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                {...(type !== "file" ? { value: value ?? "" } : {})}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                multiple={multiple}
                accept={accept}
                autoComplete={autoComplete}
                min={min}
                max={max}
                step={step}
                maxLength={maxLength}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`form-control form-control-lg ${error ? "is-invalid" : ""} ${className}`}
                {...rest}
            ></input>

            {error && (
                <div id={errorId} className="invalid-feedback d-block">
                    {error}
                </div>
            )}
        </div>
    );
};

export default InputModel;