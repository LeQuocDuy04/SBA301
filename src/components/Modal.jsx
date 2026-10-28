import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Modal({
                                  title,
                                  fields,
                                  initialData,
                                  onClose,
                                  onSubmit,
                              }) {
    const [form, setForm] = useState(initialData || {});
    const [error, setError] = useState("");

    useEffect(() => {
        setForm(initialData || {});
        setError("");
    }, [initialData]);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        for (const field of fields) {
            if (
                field.required &&
                !String(form[field.name] ?? "").trim()
            ) {
                setError(`Vui lòng nhập ${field.label}.`);
                return;
            }
        }

        const result = onSubmit(form);

        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="modal-backdrop" onMouseDown={onClose}>
            <section
                className="modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 id="modal-title">{title}</h2>
                    <button
                        type="button"
                        className="icon-button"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {fields.map((field) => (
                            <div className="form-field" key={field.name}>
                                <label htmlFor={field.name}>
                                    {field.label}
                                    {field.required ? " *" : ""}
                                </label>

                                {field.type === "select" ? (
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={form[field.name] ?? ""}
                                        onChange={handleChange}
                                        required={field.required}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "textarea" ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={form[field.name] ?? ""}
                                        onChange={handleChange}
                                        required={field.required}
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type || "text"}
                                        value={form[field.name] ?? ""}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                )}
                            </div>
                        ))}

                        {error && (
                            <p className="form-error" role="alert">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="button button-light"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="button button-primary">
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}