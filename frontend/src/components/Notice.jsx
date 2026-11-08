/**
 * Author: Lê Quốc Duy
 * Reusable API loading, error and empty states
 */
import React from 'react';
import {AlertCircle, LoaderCircle} from 'lucide-react';

export function Loading() {
    return <div className="state"><LoaderCircle className="spin"/> Đang tải dữ liệu...</div>;
}

export function ErrorState({error}) {
    return <div className="alert alert-error"><AlertCircle size={18}/>{error || 'Có lỗi xảy ra khi tải dữ liệu.'}</div>;
}

export function Empty({children = 'Chưa có dữ liệu.'}) {
    return <div className="empty-state">{children}</div>;
}

export function getError(error) {
    return error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Không thể kết nối Backend. Kiểm tra Backend tại localhost:8080.';
}
