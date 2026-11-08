/**
 * Author: Lê Quốc Duy
 * Staff room CRUD screen
 */
import React, {useEffect, useState} from 'react';
import AdminCrud from '../components/AdminCrud';
import {api} from '../api/http';

export default function AdminRooms() {
    const [types, setTypes] = useState([]);
    useEffect(() => {
        api.roomTypes().then(r => setTypes(r.data)).catch(() => {
        });
    }, []);
    const fields = [{name: 'roomNumber', label: 'Số phòng', required: true}, {
        name: 'roomDetailDescription',
        label: 'Mô tả'
    }, {name: 'roomMaxCapacity', label: 'Sức chứa', type: 'number', min: 1, required: true}, {
        name: 'roomTypeId',
        label: 'Loại phòng',
        type: 'select',
        required: true,
        options: types.map(t => ({value: t.roomTypeId, label: `${t.roomTypeName} (#${t.roomTypeId})`}))
    }, {
        name: 'roomStatus',
        label: 'Trạng thái',
        type: 'select',
        options: [{value: 1, label: 'Available (1)'}, {value: 0, label: 'Unavailable (0)'}]
    }, {name: 'roomPricePerDay', label: 'Giá mỗi ngày', type: 'number', required: true}];
    return <AdminCrud title="Quản lý phòng" subtitle="Thêm, chỉnh sửa và xóa thông tin phòng." load={api.rooms}
                      create={api.createRoom} update={api.updateRoom} remove={api.deleteRoom}
                      columns={[{key: 'roomId', label: 'ID'}, {
                          key: 'roomNumber',
                          label: 'Số phòng'
                      }, {key: 'roomTypeName', label: 'Loại phòng'}, {
                          key: 'roomMaxCapacity',
                          label: 'Sức chứa'
                      }, {
                          key: 'roomPricePerDay',
                          label: 'Giá / ngày',
                          render: r => `${Number(r.roomPricePerDay).toLocaleString('vi-VN')} ₫`
                      }, {key: 'roomStatus', label: 'Trạng thái'}]} initial={{
        roomNumber: '',
        roomDetailDescription: '',
        roomMaxCapacity: 2,
        roomTypeId: types[0]?.roomTypeId || '',
        roomStatus: 1,
        roomPricePerDay: 0
    }} fields={fields}/>;
}
