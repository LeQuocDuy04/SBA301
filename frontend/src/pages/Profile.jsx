/**
 * Author: Lê Quốc Duy
 * Customer self-service profile
 */
import React, {useEffect, useState} from 'react';
import {api} from '../api/http';
import {Loading, getError} from '../components/Notice';

export default function Profile() {
    const [form, setForm] = useState(null), [loading, setLoading] = useState(true), [message, setMessage] = useState(''), [error, setError] = useState('');
    useEffect(() => {
        api.myProfile().then(r => setForm({
            ...r.data,
            password: ''
        })).catch(e => setError(getError(e))).finally(() => setLoading(false));
    }, []);
    const change = e => setForm({...form, [e.target.name]: e.target.value});
    const submit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            if (!form.password || form.password.length < 8) {
                setError('Backend hiện yêu cầu mật khẩu tối thiểu 8 ký tự khi cập nhật hồ sơ. Hãy nhập mật khẩu mới để tiếp tục.');
                return;
            }
            const payload = {...form, customerStatus: form.customerStatus ?? 1};
            const {data} = await api.updateMyProfile(payload);
            setForm({...data, password: ''});
            setMessage('Đã cập nhật hồ sơ. Nếu đổi email, hãy đăng nhập lại bằng email mới.');
        } catch (e) {
            setError(getError(e));
        }
    };
    if (loading) return <div className="container section"><Loading/></div>;
    return <section className="container section narrow">
        <div className="page-title"><span className="eyebrow dark">MY ACCOUNT</span><h1>Hồ sơ cá nhân</h1><p>Quản lý
            thông tin tài khoản của bạn.</p></div>
        {form &&
            <form className="panel form-stack" onSubmit={submit}><label>Họ và tên<input name="customerFullName" required
                                                                                        value={form.customerFullName || ''}
                                                                                        onChange={change}/></label><label>Số
                điện thoại<input name="telephone" value={form.telephone || ''}
                                 onChange={change}/></label><label>Email<input type="email" name="emailAddress" required
                                                                               value={form.emailAddress || ''}
                                                                               onChange={change}/></label><label>Ngày
                sinh<input type="date" name="customerBirthday" value={form.customerBirthday || ''}
                           onChange={change}/></label><label>Mật khẩu <small>(Backend yêu cầu mật khẩu khi cập
                nhật)</small><input type="password" name="password" minLength="8" value={form.password || ''}
                                    onChange={change} placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"/></label>{error &&
                <div className="alert alert-error">{error}</div>}{message &&
                <div className="alert alert-success">{message}</div>}
                <button className="btn btn-primary">Lưu thay đổi</button>
            </form>}</section>;
}
