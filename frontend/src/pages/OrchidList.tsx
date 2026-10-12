import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Spinner, Table } from 'react-bootstrap'
import { deleteOrchid, getOrchids } from '../services/OrchidApi'
import { useNavigate } from "react-router-dom";

import type { Orchid } from '../types/Orchid'

export default function OrchidList() {
  const [orchids, setOrchids] = useState<Orchid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const loadOrchids = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getOrchids()
      setOrchids(response.data)
    } catch {
      setError('Không tải được danh sách. Hãy kiểm tra Backend, SQL Server và VITE_API_URL.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void loadOrchids() }, [loadOrchids])

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Bạn có chắc muốn xóa "${name}" không?`)) return
    try {
      await deleteOrchid(id)
      await loadOrchids()
    } catch {
      setError('Xóa thất bại. Vui lòng kiểm tra Backend hoặc dữ liệu.')
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h2 mb-1">Danh sách hoa lan</h1>
          <p className="text-secondary mb-0">Quản lý thông tin hoa lan</p>
        </div>
        <Button variant="success"  onClick={() => navigate("/orchids/new")} className="btn btn-success">+ Thêm hoa lan</Button>
      </div>
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /><div className="mt-2">Đang tải dữ liệu...</div></div>
      ) : orchids.length === 0 ? (
        <Alert variant="info">Chưa có dữ liệu hoa lan. Hãy chọn “Thêm hoa lan” để tạo bản ghi đầu tiên.</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-success">
              <tr><th>ID</th><th>Ảnh</th><th>Tên</th><th>Danh mục</th><th>Tự nhiên</th><th>Thu hút</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {orchids.map(o => (
                <tr key={o.orchidId}>
                  <td>{o.orchidId}</td>
                  <td>{o.orchidURL ? <img className="orchid-thumb" src={o.orchidURL} alt={o.orchidName} /> : '—'}</td>
                  <td className="orchid-name-cell">
                    <Button
                        onClick={() => navigate(`/orchids/${o.orchidId}`)}
                        variant="link"
                        className="orchid-name-link"
                    >
                      {o.orchidName}</Button>
                  </td>
                  <td>{o.orchidCategory || '—'}</td>
                  <td>{o.natural ? 'Có' : 'Không'}</td>
                  <td>{o.attractive ? 'Có' : 'Không'}</td>
                  <td className="text-nowrap">
                    <Button onClick={() => navigate(`/orchids/${o.orchidId}`)} variant="outline-primary" size="sm" className="me-1">Xem</Button>
                    <Button onClick={() => navigate(`/orchids/${o.orchidId}/edit`)} variant="outline-warning" size="sm" className="me-1">Sửa</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => void handleDelete(o.orchidId, o.orchidName)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {!loading && <div className="text-secondary small">Tổng số: {orchids.length} hoa lan</div>}
    </>
  )
}
