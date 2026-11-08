/**
 * Author: Lê Quốc Duy
 * Staff customer CRUD screen
 */
import React from 'react';
import AdminCrud from '../components/AdminCrud';
import {api} from '../api/http';

export default function AdminCustomers() {
    return <AdminCrud title="Quản lý khách hàng" subtitle="Danh sách, thông tin và trạng thái tài khoản Customer."
                      load={api.customers} create={api.createCustomer} update={api.updateCustomer}
                      remove={api.deleteCustomer} columns={[{key: 'customerId', label: 'ID'}, {
        key: 'customerFullName',
        label: 'Họ tên'
    }, {key: 'emailAddress', label: 'Email'}, {key: 'telephone', label: 'Điện thoại'}, {
        key: 'customerBirthday',
        label: 'Ngày sinh'
    }, {key: 'customerStatus', label: 'Trạng thái'}]} initial={{
        customerFullName: '',
        telephone: '',
        emailAddress: '',
        customerBirthday: '',
        customerStatus: 1,
        password: ''
    }} fields={[{name: 'customerFullName', label: 'Họ và tên', required: true}, {
        name: 'telephone',
        label: 'Số điện thoại'
    }, {name: 'emailAddress', label: 'Email', type: 'email', required: true}, {
        name: 'customerBirthday',
        label: 'Ngày sinh',
        type: 'date'
    }, {
        name: 'customerStatus',
        label: 'Trạng thái',
        type: 'select',
        options: [{value: 1, label: 'Active (1)'}, {value: 0, label: 'Inactive (0)'}]
    }, {name: 'password', label: 'Mật khẩu (bắt buộc khi tạo)', type: 'password', required: true}]}/>;
}
