import ManagementPage from "./ManagementPage.jsx";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/categoryService.js";

const fields = [
    {
        name: "name",
        label: "Category name",
        required: true,
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
            { value: 1, label: "Active" },
            { value: 0, label: "Inactive" },
        ],
    },
];

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Category name" },
    {
        key: "status",
        label: "Status",
        render: (item) => (
            <span className={`status-badge ${item.status === 1 ? "active" : "inactive"}`}>
        {item.status === 1 ? "Active" : "Inactive"}
      </span>
        ),
    },
];

export default function CategoryPage() {
    return (
        <ManagementPage
            title="Categories"
            description="Create, update, search and manage news categories."
            storageKey="categories"
            fields={fields}
            columns={columns}
            searchFields={["name"]}
            getItems={getCategories}
            createItem={createCategory}
            updateItem={updateCategory}
            deleteItem={deleteCategory}
            createDefaults={{ name: "", status: 1 }}
        />
    );
}