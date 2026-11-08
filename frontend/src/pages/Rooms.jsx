/**
 * Author: Lê Quốc Duy
 * Public room catalogue and customer reservation workflow
 */
import React, {useEffect, useMemo, useState} from 'react';
import {api} from '../api/http';
import {useAuth} from '../context/AuthContext';
import {Empty, Loading, getError} from '../components/Notice';
import {CalendarDays, Users, Search, ArrowRight, X} from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);
export default function Rooms() {
    const {user, isCustomer, isStaff} = useAuth();
    const [rooms, setRooms] = useState([]), [types, setTypes] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState('');
    const [keyword, setKeyword] = useState(''), [type, setType] = useState(''), [selected, setSelected] = useState(null);
    const [start, setStart] = useState(today()), [end, setEnd] = useState(''), [busy, setBusy] = useState(false), [notice, setNotice] = useState('');
    const load = () => {
        setLoading(true);
        Promise.all([api.rooms(), api.roomTypes()]).then(([r, t]) => {
            setRooms(r.data);
            setTypes(t.data);
        }).catch(e => setError(getError(e))).finally(() => setLoading(false));
    };
    useEffect(load, []);
    const filtered = useMemo(() => rooms.filter(r => (`${r.roomNumber} ${r.roomTypeName} ${r.roomDetailDescription}`.toLowerCase().includes(keyword.toLowerCase())) && (!type || String(r.roomTypeId) === type)), [rooms, keyword, type]);
    const nights = end ? Math.max(0, Math.ceil((new Date(end) - new Date(start)) / 86400000)) : 0;
    const reserve = async () => {
        if (!isCustomer) {
            setNotice('Vui lòng đăng nhập bằng tài khoản Customer để đặt phòng.');
            return;
        }
        if (!end || nights < 1) {
            setNotice('Ngày trả phòng phải sau ngày nhận phòng.');
            return;
        }
        if (selected.roomStatus !== 1) {
            setNotice('Phòng hiện không khả dụng.');
            return;
        }
        setBusy(true);
        setNotice('');
        try {
            const amount = Number(selected.roomPricePerDay) * nights;
            const booking = (await api.createBooking({
                bookingDate: today(),
                totalPrice: amount,
                bookingStatus: 1
            })).data;
            await api.createBookingDetail({
                bookingReservationId: booking.bookingReservationId,
                roomId: selected.roomId,
                startDate: start,
                endDate: end,
                actualPrice: amount
            });
            setNotice(`Đặt phòng thành công! Mã đặt phòng: ${booking.bookingReservationId}`);
            setSelected(null);
        } catch (e) {
            setNotice(getError(e));
        } finally {
            setBusy(false);
        }
    };
    return <section className="container section page-section">
        <div className="page-title"><span className="eyebrow dark">ROOM COLLECTION</span><h1>Danh sách phòng</h1><p>Chọn
            không gian phù hợp cho kỳ nghỉ của bạn.</p></div>
        <div className="filter-bar"><label className="search-field"><Search size={17}/><input value={keyword}
                                                                                              onChange={e => setKeyword(e.target.value)}
                                                                                              placeholder="Tìm số phòng, loại phòng..."/></label><select
            value={type} onChange={e => setType(e.target.value)}>
            <option value="">Tất cả loại phòng</option>
            {types.map(t => <option key={t.roomTypeId} value={t.roomTypeId}>{t.roomTypeName}</option>)}</select></div>
        {loading ? <Loading/> : error ? <div className="alert alert-error">{error}</div> : filtered.length === 0 ?
            <Empty>Không tìm thấy phòng phù hợp.</Empty> :
            <div className="room-grid">{filtered.map(room => <article className="room-card" key={room.roomId}>
                <div className="room-art"><span className="room-art-label">ROOM {room.roomNumber}</span>
                    <div className="room-art-shape"/>
                </div>
                <div className="room-card-body">
                    <div className="row-between"><span className="tag">{room.roomTypeName || 'Room'}</span><span
                        className={room.roomStatus === 1 ? 'status status-good' : 'status'}>{room.roomStatus === 1 ? 'Available' : 'Unavailable'}</span>
                    </div>
                    <h3>Phòng {room.roomNumber}</h3><p>{room.roomDetailDescription || 'Phòng nghỉ tiện nghi.'}</p>
                    <div className="room-meta"><span><Users size={15}/> Tối đa {room.roomMaxCapacity} khách</span></div>
                    <div className="row-between"><b
                        className="price">{Number(room.roomPricePerDay || 0).toLocaleString('vi-VN')} ₫ <small>/
                        đêm</small></b>
                        <button disabled={room.roomStatus !== 1} className="btn btn-primary btn-small" onClick={() => {
                            setSelected(room);
                            setNotice('');
                        }}>Đặt phòng <ArrowRight size={15}/></button>
                    </div>
                </div>
            </article>)}</div>}
        {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-head">
                    <div><span className="eyebrow dark">RESERVATION</span><h2>Đặt phòng {selected.roomNumber}</h2></div>
                    <button className="icon-btn" onClick={() => setSelected(null)}><X/></button>
                </div>
                <p>{selected.roomTypeName} · {selected.roomMaxCapacity} khách
                    · {Number(selected.roomPricePerDay).toLocaleString('vi-VN')} ₫/đêm</p>
                <div className="form-grid"><label>Ngày nhận phòng<input type="date" min={today()} value={start}
                                                                        onChange={e => setStart(e.target.value)}/></label><label>Ngày
                    trả phòng<input type="date" min={start} value={end} onChange={e => setEnd(e.target.value)}/></label>
                </div>
                {nights > 0 && <div className="total-line">
                    <span>{nights} đêm × {Number(selected.roomPricePerDay).toLocaleString('vi-VN')} ₫</span><b>{(nights * Number(selected.roomPricePerDay)).toLocaleString('vi-VN')} ₫</b>
                </div>}{notice && <div className="alert alert-info">{notice}</div>}
                <button className="btn btn-primary btn-block" disabled={busy}
                        onClick={reserve}>{busy ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}</button>
                {!user && <small className="muted">Bạn cần đăng nhập để hoàn tất đặt phòng.</small>}</div>
        </div>}
    </section>;
}
