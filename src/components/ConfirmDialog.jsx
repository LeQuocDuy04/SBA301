import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
                                          message,
                                          onCancel,
                                          onConfirm,
                                      }) {
    return (
        <div className="modal-backdrop" onMouseDown={onCancel}>
            <section
                className="confirm-card"
                role="alertdialog"
                aria-modal="true"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="confirm-icon">
                    <AlertTriangle size={25} />
                </div>

                <h2>Confirm deletion</h2>
                <p>{message}</p>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="button button-light"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="button button-danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </section>
        </div>
    );
}