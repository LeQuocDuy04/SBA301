import {
    readList,
    saveList,
    nextId,
} from "./storageService.js";

const KEY = "users";

export function getUsers() {
    return readList(KEY);
}

function validateUser(data, list, currentId = null) {
    const username = data.username.trim();
    const email = data.email.trim();

    if (!username || !email) {
        throw new Error("Username và email là bắt buộc.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Email không hợp lệ.");
    }

    if (
        list.some(
            (item) =>
                item.id !== currentId &&
                item.username.toLowerCase() === username.toLowerCase()
        )
    ) {
        throw new Error("Username đã tồn tại.");
    }
}

export function createUser(data) {
    const list = getUsers();
    validateUser(data, list);

    const item = {
        id: nextId(list),
        username: data.username.trim(),
        email: data.email.trim(),
        role: Number(data.role),
        status: Number(data.status),
    };

    saveList(KEY, [...list, item]);
    return item;
}

export function updateUser(id, data) {
    const list = getUsers();
    validateUser(data, list, id);

    const updated = list.map((item) =>
        item.id === id
            ? {
                ...item,
                username: data.username.trim(),
                email: data.email.trim(),
                role: Number(data.role),
                status: Number(data.status),
            }
            : item
    );

    saveList(KEY, updated);
    return updated;
}

export function deleteUser(id) {
    const list = getUsers();
    const target = list.find((item) => item.id === id);

    if (target?.username === "Admin") {
        throw new Error("Không thể xóa tài khoản Admin mặc định.");
    }

    const updated = list.filter((item) => item.id !== id);
    saveList(KEY, updated);
    return updated;
}