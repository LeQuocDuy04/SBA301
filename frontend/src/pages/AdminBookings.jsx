/**
 * Author: Lê Quốc Duy
 * Staff booking and booking-detail management
 */
import React, {useEffect, useState} from 'react';
import {api} from '../api/http';
import {Loading, Empty, getError} from '../components/Notice';
import {RefreshCw, Trash2, Plus} from 'lucide-react';

export default function AdminBookings() {
    const [rows, setRows] = useState([]), [details, setDetails] = useState({}), [customers, setCustomers] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(''), [show, setShow] = useState(false), [form, setForm] = useState({
        bookingDate: new Date().toISOString().slice(0, 10),
        customerId: '',
        bookingStatus: 1,
        totalPrice: 0
    }), [busy, setBusy] = useState(false);
    const load = () => {
        setLoading(true);
        Promise.all([api.bookings(), api.customers()]).then(async ([b, c]) => {
            setRows(b.data);
            setCustomers(c.data);
            const d = await Promise.all(b.data.map(async x => [x.bookingReservationId, (await api.bookingDetailsByBooking(x.bookingReservationId)).data]));
            setDetails(Object.fromEntries(d));
        }).catch(e => setError(getError(e))).finally(() => setLoading(false));
    };
    useEffect(load, []);
    const create = async e => {
        e.preventDefault();
        setBusy(true);
        try {
            await api.createBooking({
                ...form,
                customerId: Number(form.customerId),
                bookingStatus: Number(form.bookingStatus),
                totalPrice: Number(form.totalPrice)
            });
            setShow(false);
            load();
        } catch (e) {
            setError(getError(e));
        } finally {
            setBusy(false);
        }
    };
    const remove = async id => {
        if (!confirm(`Xóa booking #${id}?`)) return;
        try {
            await api.deleteBooking(id);
            load();
        } catch (e) {
            setError(getError(e));
        }
    };
    return <section className="container section page-section">
        <div className="page-title"><span className="eyebrow dark">STAFF MANAGEMENT</span><h1>Quản lý đặt phòng</h1>
            <p>Theo dõi booking reservation và các phòng thuộc từng lượt đặt.</p></div>
        <div className="toolbar">
            <button className="btn btn-ghost" onClick={load}><RefreshCw size={16}/> Làm mới</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16}/> Tạo booking</button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}{loading ? <Loading/> : rows.length === 0 ?
        <Empty/> : <div className="booking-list">{rows.map(b => <article className="panel booking-item"
                                                                         key={b.bookingReservationId}>
            <div className="row-between">
                <div><span className="eyebrow dark">BOOKING #{b.bookingReservationId}</span><h3>{b.customerName}</h3>
                    <small className="muted">{b.bookingDate} · Customer #{b.customerId}</small></div>
                <button className="icon-btn danger" onClick={() => remove(b.bookingReservationId)}><Trash2 size={17}/>
                </button>
            </div>
            <div className="row-between"><b
                className="price">{Number(b.totalPrice || 0).toLocaleString('vi-VN')} ₫</b><span
                className="tag">Status {b.bookingStatus}</span></div>
            <div className="detail-chips">{(details[b.bookingReservationId] || []).map(d => <span
                key={d.roomId}>Phòng {d.roomNumber || d.roomId}: {d.startDate} → {d.endDate}</span>)}</div>
        </article>)}</div>}
        {show && <div className="modal-backdrop">
            <form className="modal" onSubmit={create}><h2>Tạo booking cho khách hàng</h2><label>Khách hàng<select
                required value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})}>
                <option value="">Chọn khách hàng</option>
                {customers.map(c => <option key={c.customerId} value={c.customerId}>{c.customerFullName} —
                    #{c.customerId}</option>)}</select></label><label>Ngày đặt<input type="date" required
                                                                                     value={form.bookingDate}
                                                                                     onChange={e => setForm({
                                                                                         ...form,
                                                                                         bookingDate: e.target.value
                                                                                     })}/></label><label>Tổng tiền<input
                type="number" min="0" required value={form.totalPrice}
                onChange={e => setForm({...form, totalPrice: e.target.value})}/></label><label>Trạng thái<input
                type="number" value={form.bookingStatus}
                onChange={e => setForm({...form, bookingStatus: e.target.value})}/></label>
                <button className="btn btn-primary btn-block"
                        disabled={busy}>{busy ? 'Đang tạo...' : 'Tạo booking'}</button>
                <button type="button" className="btn btn-ghost btn-block" onClick={() => setShow(false)}>Hủy</button>
            </form>
        </div>}
    </section>;
}
