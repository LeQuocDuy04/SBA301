import { useEffect, useState } from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import { getOrchid } from '../services/OrchidApi'
import type { Orchid } from '../types/Orchid'

export default function OrchidDetail() {
  const { id } = useParams()
  const [orchid, setOrchid] = useState<Orchid | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    if (!id || !/^\d+$/.test(id)) {
      setError('ID hoa lan không hợp lệ.')
      setLoading(false)
      return
    }
    getOrchid(Number(id))
      .then(response => setOrchid(response.data))
      .catch(() => setError('Không tìm thấy hoa lan hoặc Backend không phản hồi.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>
  if (error || !orchid) return <Alert variant="danger">{error || 'Không có dữ liệu.'}<div className="mt-3"><Button onClick={() => navigate(`/orchids`)}  variant="secondary">Quay lại</Button></div></Alert>

  return (
    <Card className="detail-card">
      {orchid.orchidURL && <Card.Img variant="top" src={orchid.orchidURL} className="detail-image" />}
      <Card.Body>
        <Card.Title className="h2">{orchid.orchidName}</Card.Title>
        <p><strong>ID:</strong> {orchid.orchidId}</p>
        <p><strong>Danh mục:</strong> {orchid.orchidCategory || '—'}</p>
        <p><strong>Nguồn gốc tự nhiên:</strong> {orchid.natural ? 'Có' : 'Không'}</p>
        <p><strong>Thu hút:</strong> {orchid.attractive ? 'Có' : 'Không'}</p>
        <p><strong>Mô tả:</strong> {orchid.orchidDescription || 'Chưa có mô tả'}</p>
        <Button onClick={() => navigate(`/orchids/${orchid.orchidId}/edit`)} variant="warning" className="me-2">Chỉnh sửa</Button>
        <Button onClick={() => navigate(`/orchids`)} variant="secondary">Quay lại danh sách</Button>
      </Card.Body>
    </Card>
  )
}
