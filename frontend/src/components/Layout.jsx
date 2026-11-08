/**
 * Author: Lê Quốc Duy
 * Shared application shell and navigation
 */
import React from 'react';
import {Link, NavLink, Outlet, useNavigate} from 'react-router-dom';
import {Hotel, LogOut, UserRound, LayoutDashboard} from 'lucide-react';
import {useAuth} from '../context/AuthContext';

export default function Layout() {
    const {user, isStaff, logout} = useAuth();
    const navigate = useNavigate();
    const leave = () => {
        logout();
        navigate('/');
    };
    return <div className="app-shell">
        <header className="topbar">
            <Link to="/" className="brand"><span className="brand-icon"><Hotel size={21}/></span><span>FU<span
                className="brand-accent">Mini</span>Hotel</span></Link>
            <nav className="nav-links">
                <NavLink to="/">Trang chủ</NavLink>
                <NavLink to="/rooms">Danh sách phòng</NavLink>
                {user && !isStaff && <NavLink to="/my-bookings">Lịch sử đặt phòng</NavLink>}
                {user && !isStaff && <NavLink to="/profile">Tài khoản</NavLink>}
                {isStaff && <NavLink to="/admin"><LayoutDashboard size={15}/> Quản trị</NavLink>}
            </nav>
            <div className="nav-actions">
                {user ? <><span className="user-chip"><UserRound size={15}/>{user.email}</span>
                        <button className="btn btn-ghost btn-small" onClick={leave}><LogOut size={15}/> Đăng xuất</button>
                    </> :
                    <><Link className="btn btn-ghost btn-small" to="/login">Đăng nhập</Link><Link
                        className="btn btn-primary btn-small" to="/register">Đăng ký</Link></>}
            </div>
        </header>
        <main><Outlet/></main>
        <footer className="footer">
            <div className="container footer-inner"><span>© 2026 FU Mini Hotel Management</span><span>Comfort · Convenience · Care</span>
            </div>
        </footer>
    </div>;
}
