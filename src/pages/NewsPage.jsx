import ManagementPage from "./ManagementPage.jsx";
import {
    getNews,
    createNews,
    updateNews,
    deleteNews,
} from "../services/newsService.js";
import { getCategories } from "../services/categoryService.js";

function getCategoryName(categoryId) {
    const category = getCategories().find(
        (item) => item.id === Number(categoryId)
    );

    return category?.name || "Unknown category";
}

const fields = [
    {
        name: "title",
        label: "Title",
        required: true,
    },
    {
        name: "content",
        label: "Content",
        type: "textarea",
        required: true,
    },
    {
        name: "categoryId",
        label: "Category",
        type: "select",
        required: true,
        options: getCategories().map((category) => ({
            value: category.id,
            label: category.name,
        })),
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
    { key: "title", label: "Title" },
    {
        key: "categoryId",
        label: "Category",
        render: (item) => getCategoryName(item.categoryId),
    },
    { key: "createdBy", label: "Created by" },
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

export default function NewsPage() {
    return (
        <ManagementPage
            title="News"
            description="Manage news articles and their categories."
            storageKey="news"
            fields={fields}
            columns={columns}
            searchFields={["title", "content"]}
            getItems={getNews}
            createItem={createNews}
            updateItem={updateNews}
            deleteItem={deleteNews}
            createDefaults={{
                title: "",
                content: "",
                categoryId: "",
                createdBy: "Admin",
                status: 1,
            }}
        />
    );
}