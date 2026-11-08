/**
 * Author: Lê Quốc Duy
 * Staff administration dashboard
 */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Users, DoorOpen, CalendarCheck, Layers, ArrowUpRight} from 'lucide-react';
import {api} from '../api/http';
import {Loading, getError} from '../components/Notice';

export default function Admin() {
    const [stats, setStats] = useState(null), [error, setError] = useState('');
    useEffect(() => {
        Promise.all([api.customers(), api.rooms(), api.bookings(), api.roomTypes()]).then(([c, r, b, t]) => setStats({
            customers: c.data.length,
            rooms: r.data.length,
            bookings: b.data.length,
            types: t.data.length
        })).catch(e => setError(getError(e)));
    }, []);
    const cards = [['Khách hàng', 'customers', Users, '/admin/customers'], ['Phòng', 'rooms', DoorOpen, '/admin/rooms'], ['Đặt phòng', 'bookings', CalendarCheck, '/admin/bookings'], ['Loại phòng', 'types', Layers, '/admin/room-types']];
    return <section className="container section page-section">
        <div className="page-title"><span className="eyebrow dark">STAFF WORKSPACE</span><h1>Quản trị hệ thống</h1>
            <p>Tổng quan và quản lý hoạt động FUMiniHotel.</p></div>
        {!stats && !error ? <Loading/> : error ? <div className="alert alert-error">{error}</div> :
            <div className="stats-grid">{cards.map(([label, key, Icon, to]) => <Link to={to} className="stat-card"
                                                                                     key={key}><span
                className="stat-icon"><Icon/></span><span>{label}</span><strong>{stats[key]}</strong><small>Quản
                lý <ArrowUpRight size={14}/></small></Link>)}</div>}
        <div className="admin-welcome">
            <div><span className="eyebrow">MANAGEMENT</span><h2>Điều hành khách sạn dễ dàng</h2><p>Chọn một phân hệ để
                xem, thêm, cập nhật hoặc xóa dữ liệu.</p></div>
            <DoorOpen size={72}/></div>
    </section>;
}
