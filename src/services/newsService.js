import {
    readList,
    saveList,
    nextId,
} from "./storageService.js";

const KEY = "news";

function validateCategory(categoryId) {
    const categories = readList("categories");

    if (
        !categories.some(
            (category) => category.id === Number(categoryId)
        )
    ) {
        throw new Error("Vui lòng chọn category hợp lệ.");
    }
}

export function getNews() {
    return readList(KEY);
}

export function createNews(data) {
    validateCategory(data.categoryId);

    const list = getNews();

    const item = {
        id: nextId(list),
        title: data.title.trim(),
        content: data.content.trim(),
        categoryId: Number(data.categoryId),
        createdBy: data.createdBy || "Admin",
        status: Number(data.status),
    };

    saveList(KEY, [...list, item]);
    return item;
}

export function updateNews(id, data) {
    validateCategory(data.categoryId);

    const updated = getNews().map((item) =>
        item.id === id
            ? {
                ...item,
                title: data.title.trim(),
                content: data.content.trim(),
                categoryId: Number(data.categoryId),
                status: Number(data.status),
            }
            : item
    );

    saveList(KEY, updated);
    return updated;
}

export function deleteNews(id) {
    const updated = getNews().filter((item) => item.id !== id);
    saveList(KEY, updated);
    return updated;
}