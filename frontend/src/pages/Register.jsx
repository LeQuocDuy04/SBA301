/**
 * Author: Lê Quốc Duy
 * Customer registration page
 */
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {api} from '../api/http';
import {getError} from '../components/Notice';

export default function Register() {
    const [form, setForm] = useState({
        customerFullName: '',
        telephone: '',
        emailAddress: '',
        customerBirthday: '',
        customerStatus: 1,
        password: ''
    }), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    const navigate = useNavigate(), change = e => setForm({...form, [e.target.name]: e.target.value});
    const submit = async e => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
            await api.register({...form, customerStatus: Number(form.customerStatus)});
            navigate('/login', {state: {message: 'Đăng ký thành công. Vui lòng đăng nhập.'}});
        } catch (err) {
            setError(getError(err));
        } finally {
            setBusy(false);
        }
    };
    return <section className="auth-wrap register-wrap">
        <div className="auth-aside"><span className="eyebrow">JOIN FUMINIHOTEL</span><h1>Make room<br/><em>for
            comfort.</em></h1><p>Tạo tài khoản Customer để đặt phòng và theo dõi lịch sử đặt phòng.</p></div>
        <form className="auth-card" onSubmit={submit}><span className="eyebrow dark">CREATE ACCOUNT</span><h2>Đăng ký
            Customer</h2>
            <div className="form-grid"><label>Họ và tên<input name="customerFullName" required maxLength="50"
                                                              value={form.customerFullName}
                                                              onChange={change}/></label><label>Số điện thoại<input
                name="telephone" maxLength="12" value={form.telephone} onChange={change}/></label><label>Email<input
                type="email" name="emailAddress" required value={form.emailAddress} onChange={change}/></label><label>Ngày
                sinh<input type="date" name="customerBirthday" value={form.customerBirthday} onChange={change}/></label><label
                className="span-2">Mật khẩu<input type="password" name="password" required minLength="8" maxLength="50"
                                                  value={form.password} onChange={change}/></label></div>
            {error && <div className="alert alert-error">{error}</div>}
            <button className="btn btn-primary btn-block"
                    disabled={busy}>{busy ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}</button>
            <p className="auth-bottom">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p></form>
    </section>;
}
