import axios from "axios";
import type { Orchid, OrchidDraft } from "../types/Orchid";

// Cấu hình Axios để kết nối với Spring Boot Backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});



export const getOrchids = () => {
    return api.get<Orchid[]>("/api/orchids");
};

export const getOrchid = (id: number) => {
    return api.get<Orchid>(`/api/orchids/${id}`);
};

export const createOrchid = (orchid: OrchidDraft) => {
    return api.post<Orchid>("/api/orchids", orchid);
};

export const updateOrchid = (
    id: number,
    orchid: OrchidDraft
) => {
    return api.put<Orchid>(`/api/orchids/${id}`, orchid);
};

export const deleteOrchid = (id: number) => {
    return api.delete<void>(`/api/orchids/${id}`);
};
