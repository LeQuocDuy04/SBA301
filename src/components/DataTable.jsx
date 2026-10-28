import { Pencil, Trash2 } from "lucide-react";

export default function DataTable({
                                      columns,
                                      data,
                                      onEdit,
                                      onDelete,
                                      rowKey = "id",
                                  }) {
    if (data.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">∅</div>
                <h3>No records found</h3>
                <p>Try another keyword or create a new record.</p>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                    ))}
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {data.map((item) => (
                    <tr key={item[rowKey]}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                {column.render
                                    ? column.render(item)
                                    : item[column.key]}
                            </td>
                        ))}

                        <td>
                            <div className="table-actions">
                                <button
                                    type="button"
                                    className="action-button edit"
                                    title="Edit"
                                    onClick={() => onEdit(item)}
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    type="button"
                                    className="action-button delete"
                                    title="Delete"
                                    onClick={() => onDelete(item)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}