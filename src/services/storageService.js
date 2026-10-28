import {
    initialCategories,
    initialNews,
    initialUsers,
} from "../data/mockData.js";

const defaultData = {
    categories: initialCategories,
    news: initialNews,
    users: initialUsers,
};

export function readList(key) {
    try {
        const stored = localStorage.getItem(`fu_${key}`);

        if (stored === null) {
            return defaultData[key].map((item) => ({ ...item }));
        }

        const parsed = JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed
            : defaultData[key].map((item) => ({ ...item }));
    } catch {
        return defaultData[key].map((item) => ({ ...item }));
    }
}

export function saveList(key, list) {
    localStorage.setItem(`fu_${key}`, JSON.stringify(list));
}

export function nextId(list) {
    return (
        list.reduce(
            (max, item) => Math.max(max, Number(item.id) || 0),
            0
        ) + 1
    );
}