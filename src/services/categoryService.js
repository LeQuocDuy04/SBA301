import {
    readList,
    saveList,
    nextId,
} from "./storageService.js";

const KEY = "categories";

export function getCategories() {
    return readList(KEY);
}

export function createCategory(data) {
    const list = getCategories();

    if (
        list.some(
            (item) =>
                item.name.trim().toLowerCase() ===
                data.name.trim().toLowerCase()
        )
    ) {
        throw new Error("Tên category đã tồn tại.");
    }

    const item = {
        id: nextId(list),
        name: data.name.trim(),
        status: Number(data.status),
    };

    saveList(KEY, [...list, item]);
    return item;
}

export function updateCategory(id, data) {
    const list = getCategories();

    if (
        list.some(
            (item) =>
                item.id !== id &&
                item.name.trim().toLowerCase() ===
                data.name.trim().toLowerCase()
        )
    ) {
        throw new Error("Tên category đã tồn tại.");
    }

    const updated = list.map((item) =>
        item.id === id
            ? {
                ...item,
                name: data.name.trim(),
                status: Number(data.status),
            }
            : item
    );

    saveList(KEY, updated);
    return updated;
}

export function deleteCategory(id) {
    const news = readList("news");

    if (news.some((item) => Number(item.categoryId) === id)) {
        throw new Error(
            "Không thể xóa category đang được sử dụng bởi News."
        );
    }

    const updated = getCategories().filter((item) => item.id !== id);
    saveList(KEY, updated);
    return updated;
}