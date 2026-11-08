/**
 * Author: Lê Quốc Duy
 * Generic Staff CRUD table and modal form
 */
import React, {useEffect, useState} from 'react';
import {Plus, Edit3, Trash2, X, RefreshCw} from 'lucide-react';
import {Loading, Empty, getError} from './Notice';

export default function AdminCrud({
                                      title,
                                      subtitle,
                                      load,
                                      create,
                                      update,
                                      remove,
                                      columns,
                                      fields,
                                      initial,
                                      searchKey
                                  }) {
    const [rows, setRows] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(''), [query, setQuery] = useState(''), [editing, setEditing] = useState(null), [form, setForm] = useState({}), [modalOpen, setModalOpen] = useState(false), [busy, setBusy] = useState(false), [notice, setNotice] = useState('');
    const refresh = () => {
        setLoading(true);
        load().then(r => setRows(r.data)).catch(e => setError(getError(e))).finally(() => setLoading(false));
    };
    useEffect(() => {
        refresh();
    }, []);
    const open = row => {
        setEditing(row || null);
        setForm(row ? {...row, password: ''} : {...initial});
        setModalOpen(true);
        setNotice('');
    };
    const submit = async e => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
            const payload = {...form};
            if (payload.customerStatus !== undefined) payload.customerStatus = Number(payload.customerStatus);
            if (payload.roomTypeId !== undefined) payload.roomTypeId = Number(payload.roomTypeId);
            if (payload.roomMaxCapacity !== undefined) payload.roomMaxCapacity = Number(payload.roomMaxCapacity);
            if (payload.roomPricePerDay !== undefined) payload.roomPricePerDay = Number(payload.roomPricePerDay);
            if (payload.password === '') delete payload.password;
            if (editing) await update(editing.customerId ?? editing.roomId ?? editing.roomTypeId ?? editing.bookingReservationId, payload); else await create(payload);
            setNotice(editing ? 'Cập nhật thành công.' : 'Tạo mới thành công.');
            setEditing(null);
            setModalOpen(false);
            setForm({});
            refresh();
        } catch (e) {
            setError(getError(e));
        } finally {
            setBusy(false);
        }
    };
    const del = async row => {
        const id = row.customerId ?? row.roomId ?? row.roomTypeId ?? row.bookingReservationId;
        if (!confirm(`Bạn có chắc muốn xóa bản ghi #${id}?`)) return;
        try {
            await remove(id);
            refresh();
        } catch (e) {
            setError(getError(e));
        }
    };
    const filtered = rows.filter(r => JSON.stringify(r).toLowerCase().includes(query.toLowerCase()));
    return <section className="container section page-section">
        <div className="page-title"><span className="eyebrow dark">STAFF MANAGEMENT</span><h1>{title}</h1>
            <p>{subtitle}</p></div>
        <div className="toolbar"><input className="search-input" value={query} onChange={e => setQuery(e.target.value)}
                                        placeholder="Tìm kiếm..."/>
            <button className="btn btn-ghost" onClick={refresh}><RefreshCw size={16}/> Làm mới</button>
            <button className="btn btn-primary" onClick={() => open(null)}><Plus size={16}/> Thêm mới</button>
        </div>
        {notice && <div className="alert alert-success">{notice}</div>}{error &&
        <div className="alert alert-error">{error}</div>}{loading ? <Loading/> : filtered.length === 0 ? <Empty/> :
        <div className="panel table-wrap">
            <table>
                <thead>
                <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>{filtered.map((row, i) => <tr
                    key={row.customerId ?? row.roomId ?? row.roomTypeId ?? row.bookingReservationId ?? i}>{columns.map(c =>
                    <td key={c.key}>{c.render ? c.render(row) : String(row[c.key] ?? '—')}</td>)}
                    <td>
                        <div className="table-actions">
                            <button className="icon-btn" title="Sửa" onClick={() => open(row)}><Edit3 size={16}/>
                            </button>
                            <button className="icon-btn danger" title="Xóa" onClick={() => del(row)}><Trash2 size={16}/>
                            </button>
                        </div>
                    </td>
                </tr>)}</tbody>
            </table>
        </div>}
        {modalOpen && <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <form className="modal" onClick={e => e.stopPropagation()} onSubmit={submit}>
                <div className="modal-head"><h2>{editing ? 'Cập nhật' : 'Thêm mới'} {title}</h2>
                    <button type="button" className="icon-btn" onClick={() => setModalOpen(false)}><X/></button>
                </div>
                {fields.map(f => <label key={f.name}>{f.label}{f.type === 'select' ?
                    <select required={f.required} value={form[f.name] ?? ''}
                            onChange={e => setForm({...form, [f.name]: e.target.value})}>{f.options.map(o => <option
                        key={o.value} value={o.value}>{o.label}</option>)}</select> :
                    <input type={f.type || 'text'} required={f.required} min={f.min} maxLength={f.maxLength}
                           value={form[f.name] ?? ''}
                           onChange={e => setForm({...form, [f.name]: e.target.value})}/>}</label>)}{error &&
                <div className="alert alert-error">{error}</div>}
                <button className="btn btn-primary btn-block"
                        disabled={busy}>{busy ? 'Đang lưu...' : 'Lưu dữ liệu'}</button>
            </form>
        </div>}

    </section>;
}
