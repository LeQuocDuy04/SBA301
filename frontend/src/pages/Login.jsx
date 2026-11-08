/**
 * Author: Lê Quốc Duy
 * Staff and Customer login page
 */
import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {LockKeyhole, Mail} from 'lucide-react';
import {getError} from '../components/Notice';

export default function Login() {
    const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    const {login} = useAuth(), navigate = useNavigate(), location = useLocation();
    const submit = async e => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
            const data = await login(email, password);
            const target = location.state?.from?.pathname;
            if (target && target !== '/login') navigate(target); else navigate(data.role === 'STAFF' ? '/admin' : '/');
        } catch (err) {
            setError(getError(err));
        } finally {
            setBusy(false);
        }
    };
    return <section className="auth-wrap">
        <div className="auth-aside"><span className="eyebrow">WELCOME BACK</span><h1>Your next<br/><em>stay awaits.</em>
        </h1><p>Đăng nhập để quản lý tài khoản và trải nghiệm dịch vụ FUMiniHotel.</p></div>
        <form className="auth-card" onSubmit={submit}><span className="eyebrow dark">ACCOUNT ACCESS</span><h2>Đăng
            nhập</h2><p className="muted">Sử dụng email và mật khẩu đã đăng ký.</p><label>Email
            <div className="input-icon"><Mail/><input type="email" required value={email}
                                                      onChange={e => setEmail(e.target.value)}
                                                      placeholder="name@example.com"/></div>
        </label><label>Mật khẩu
            <div className="input-icon"><LockKeyhole/><input type="password" required value={password}
                                                             onChange={e => setPassword(e.target.value)}
                                                             placeholder="Nhập mật khẩu"/></div>
        </label>{error && <div className="alert alert-error">{error}</div>}
            <button className="btn btn-primary btn-block"
                    disabled={busy}>{busy ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
            <p className="auth-bottom">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p></form>
    </section>;
}
