import { useEffect, useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import Modal from "../components/Modal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";

export default function ManagementPage({
                                           title,
                                           description,
                                           storageKey,
                                           fields,
                                           columns,
                                           searchFields,
                                           getItems,
                                           createItem,
                                           updateItem,
                                           deleteItem,
                                           createDefaults = {},
                                           beforeDelete,
                                       }) {
    const [items, setItems] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [pageError, setPageError] = useState("");
    const [notice, setNotice] = useState("");

    function reload() {
        setItems(getItems());
    }

    useEffect(() => {
        reload();
    }, [storageKey]);

    const filteredItems = useMemo(() => {
        const normalized = keyword.trim().toLowerCase();

        if (!normalized) return items;

        return items.filter((item) =>
            searchFields.some((field) =>
                String(item[field] ?? "")
                    .toLowerCase()
                    .includes(normalized)
            )
        );
    }, [items, keyword, searchFields]);

    function openCreate() {
        setSelectedItem(null);
        setPageError("");
        setModalOpen(true);
    }

    function openEdit(item) {
        setSelectedItem(item);
        setPageError("");
        setModalOpen(true);
    }

    function handleSubmit(form) {
        try {
            if (selectedItem) {
                updateItem(selectedItem.id, form);
                setNotice("Record updated successfully.");
            } else {
                createItem(form);
                setNotice("Record created successfully.");
            }

            setModalOpen(false);
            setSelectedItem(null);
            setPageError("");
            reload();
            return {};
        } catch (error) {
            return { error: error.message || "Unable to save record." };
        }
    }

    function handleDelete() {
        try {
            if (beforeDelete) {
                const result = beforeDelete(deleteTarget);
                if (result?.error) {
                    setPageError(result.error);
                    setDeleteTarget(null);
                    return;
                }
            }

            deleteItem(deleteTarget.id);
            reload();
            setNotice("Record deleted successfully.");
            setPageError("");
        } catch (error) {
            setPageError(error.message || "Unable to delete record.");
        }

        setDeleteTarget(null);
    }

    return (
        <section className="panel">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">MANAGEMENT</p>
                    <h2>{title}</h2>
                    <p className="muted">{description}</p>
                </div>

                <button
                    type="button"
                    className="button button-primary"
                    onClick={openCreate}
                >
                    <Plus size={17} />
                    Add new
                </button>
            </div>

            <div className="toolbar">
                <div className="search-box">
                    <Search size={17} />
                    <input
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder={`Search ${title.toLowerCase()}...`}
                        aria-label={`Search ${title}`}
                    />

                    {keyword && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setKeyword("")}
                            aria-label="Clear search"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <span className="record-count">
          {filteredItems.length} record(s)
        </span>
            </div>

            {pageError && (
                <p className="form-error" role="alert">
                    {pageError}
                </p>
            )}

            {notice && (
                <div className="success-message">
                    <span>{notice}</span>
                    <button
                        type="button"
                        onClick={() => setNotice("")}
                        aria-label="Dismiss message"
                    >
                        <X size={15} />
                    </button>
                </div>
            )}

            <DataTable
                columns={columns}
                data={filteredItems}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
            />

            {modalOpen && (
                <Modal
                    title={selectedItem ? `Edit ${title}` : `Create ${title}`}
                    fields={fields}
                    initialData={
                        selectedItem
                            ? { ...selectedItem }
                            : { ...createDefaults }
                    }
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedItem(null);
                    }}
                    onSubmit={handleSubmit}
                />
            )}

            {deleteTarget && (
                <ConfirmDialog
                    message={`Are you sure you want to delete "${deleteTarget.name || deleteTarget.title || deleteTarget.username}"?`}
                    onCancel={() => setDeleteTarget(null)}
                    onConfirm={handleDelete}
                />
            )}
        </section>
    );
}