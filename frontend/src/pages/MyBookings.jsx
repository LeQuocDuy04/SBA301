/**
 * Author: Lê Quốc Duy
 * Customer booking history with linked booking details
 */
import React, {useEffect, useState} from 'react';
import {api} from '../api/http';
import {Loading, Empty, getError} from '../components/Notice';
import {useAuth} from '../context/AuthContext';

export default function MyBookings() {
    const {user} = useAuth();
    const [profile, setProfile] = useState(null), [rows, setRows] = useState([]), [details, setDetails] = useState({}), [loading, setLoading] = useState(true), [error, setError] = useState('');
    useEffect(() => {
        api.myProfile().then(async p => {
            setProfile(p.data);
            const r = await api.bookingsByCustomer(p.data.customerId);
            setRows(r.data);
            const pairs = await Promise.all(r.data.map(async b => [b.bookingReservationId, (await api.bookingDetailsByBooking(b.bookingReservationId)).data]));
            setDetails(Object.fromEntries(pairs));
        }).catch(e => setError(getError(e))).finally(() => setLoading(false));
    }, []);
    return <section className="container section page-section">
        <div className="page-title"><span className="eyebrow dark">YOUR RESERVATIONS</span><h1>Lịch sử đặt phòng</h1>
            <p>{profile ? `Xin chào ${profile.customerFullName}, đây là các lượt đặt phòng của bạn.` : 'Theo dõi các lượt đặt phòng của bạn.'}</p>
        </div>
        {loading ? <Loading/> : error ? <div className="alert alert-error">{error}</div> : rows.length === 0 ?
            <Empty>Bạn chưa có lượt đặt phòng nào.</Empty> : <div className="panel table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>Mã đặt phòng</th>
                        <th>Ngày đặt</th>
                        <th>Phòng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>{rows.map(b => <tr key={b.bookingReservationId}>
                        <td><b>#{b.bookingReservationId}</b></td>
                        <td>{b.bookingDate}</td>
                        <td>{(details[b.bookingReservationId] || []).map(d => d.roomNumber || `#${d.roomId}`).join(', ') || '—'}</td>
                        <td>{Number(b.totalPrice || 0).toLocaleString('vi-VN')} ₫</td>
                        <td><span className="tag">Status {b.bookingStatus}</span></td>
                    </tr>)}</tbody>
                </table>
            </div>}</section>;
}
