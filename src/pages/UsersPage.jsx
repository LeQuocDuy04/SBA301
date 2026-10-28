import ManagementPage from "./ManagementPage.jsx";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../services/userService.js";

const fields = [
    {
        name: "username",
        label: "Username",
        required: true,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
    },
    {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
            { value: 1, label: "Admin" },
            { value: 2, label: "Staff" },
        ],
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
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    {
        key: "role",
        label: "Role",
        render: (item) => (Number(item.role) === 1 ? "Admin" : "Staff"),
    },
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

export default function UsersPage() {
    return (
        <ManagementPage
            title="Users"
            description="Manage user accounts, email addresses and roles."
            storageKey="users"
            fields={fields}
            columns={columns}
            searchFields={["username", "email"]}
            getItems={getUsers}
            createItem={createUser}
            updateItem={updateUser}
            deleteItem={deleteUser}
            createDefaults={{
                username: "",
                email: "",
                role: 2,
                status: 1,
            }}
        />
    );
}