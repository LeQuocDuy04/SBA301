/**
 * Author: Lê Quốc Duy
 * Hotel landing page
 */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, CalendarCheck, ShieldCheck, Sparkles} from 'lucide-react';
import {api} from '../api/http';
import {Empty, Loading, getError} from '../components/Notice';

export default function Home() {
    const [rooms, setRooms] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState('');
    useEffect(() => {
        api.rooms().then(r => setRooms(r.data)).catch(e => setError(getError(e))).finally(() => setLoading(false));
    }, []);
    return <>
        <section className="hero">
            <div className="hero-overlay"/>
            <div className="container hero-content">
                <div className="eyebrow"><Sparkles size={15}/> YOUR COMFORT, OUR PRIORITY</div>
                <h1>Stay somewhere<br/><em>beautiful.</em></h1><p>Trải nghiệm kỳ nghỉ thoải mái với không gian tinh tế
                và dịch vụ tận tâm.</p>
                <div className="hero-actions"><Link to="/rooms" className="btn btn-primary btn-lg">Khám phá
                    phòng <ArrowRight size={17}/></Link><Link to="/register" className="btn btn-light btn-lg">Tạo tài
                    khoản</Link></div>
            </div>
            <div className="hero-note"><span>01 / 03</span><span>FUMiniHotel · Can Tho</span></div>
        </section>
        <section className="container feature-strip">
            <div><CalendarCheck/><b>Đặt phòng trực tuyến</b><small>Chủ động lịch trình của bạn</small></div>
            <div><ShieldCheck/><b>Thông tin an toàn</b><small>Xác thực tài khoản bằng JWT</small></div>
            <div><Sparkles/><b>Không gian tiện nghi</b><small>Lựa chọn phòng phù hợp</small></div>
        </section>
        <section className="container section">
            <div className="section-heading">
                <div><span className="eyebrow dark">DISCOVER YOUR ROOM</span><h2>Không gian nghỉ dưỡng</h2></div>
                <Link to="/rooms" className="text-link">Xem tất cả phòng <ArrowRight size={16}/></Link></div>
            {loading ? <Loading/> : error ? <p className="muted">{error}</p> : rooms.length === 0 ? <Empty/> :
                <div className="room-grid">{rooms.slice(0, 3).map(room => <article className="room-card"
                                                                                   key={room.roomId}>
                    <div className="room-art"><span className="room-art-label">ROOM {room.roomNumber}</span>
                        <div className="room-art-shape"/>
                    </div>
                    <div className="room-card-body">
                        <div className="row-between"><span
                            className="tag">{room.roomTypeName || 'Hotel room'}</span><span
                            className={room.roomStatus === 1 ? 'status status-good' : 'status'}>{room.roomStatus === 1 ? 'Available' : 'Unavailable'}</span>
                        </div>
                        <h3>Phòng {room.roomNumber}</h3>
                        <p>{room.roomDetailDescription || 'Không gian nghỉ dưỡng tiện nghi.'}</p>
                        <div className="row-between"><b
                            className="price">{Number(room.roomPricePerDay || 0).toLocaleString('vi-VN')} ₫ <small>/
                            đêm</small></b><Link to="/rooms" className="round-arrow"><ArrowRight size={17}/></Link>
                        </div>
                    </div>
                </article>)}</div>}
        </section>
    </>;
}
