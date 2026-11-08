/**
 * Author: Lê Quốc Duy
 * Staff room type CRUD screen
 */
import React from 'react';
import AdminCrud from '../components/AdminCrud';
import {api} from '../api/http';

export default function AdminRoomTypes() {
    return <AdminCrud title="Quản lý loại phòng" subtitle="Quản lý danh mục loại phòng khách sạn." load={api.roomTypes}
                      create={api.createRoomType} update={api.updateRoomType} remove={api.deleteRoomType}
                      columns={[{key: 'roomTypeId', label: 'ID'}, {
                          key: 'roomTypeName',
                          label: 'Tên loại phòng'
                      }, {key: 'typeDescription', label: 'Mô tả'}, {key: 'typeNote', label: 'Ghi chú'}]}
                      initial={{roomTypeName: '', typeDescription: '', typeNote: ''}} fields={[{
        name: 'roomTypeName',
        label: 'Tên loại phòng',
        required: true
    }, {name: 'typeDescription', label: 'Mô tả'}, {name: 'typeNote', label: 'Ghi chú'}]}/>;
}
