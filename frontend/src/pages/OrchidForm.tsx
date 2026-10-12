import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { createOrchid, getOrchid, updateOrchid } from '../services/OrchidApi'
import type { OrchidDraft } from '../types/Orchid'

const emptyForm: OrchidDraft = {
  orchidName: '',
  natural: false,
  orchidDescription: '',
  orchidCategory: '',
  attractive: false,
  orchidURL: '',
}

export default function OrchidForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState<OrchidDraft>(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    if (!/^\d+$/.test(id)) {
      setError('ID hoa lan không hợp lệ.')
      setLoading(false)
      return
    }
    getOrchid(Number(id))
      .then(response => {
        const o = response.data
        setForm({
          orchidName: o.orchidName ?? '',
          natural: o.natural ?? false,
          orchidDescription: o.orchidDescription ?? '',
          orchidCategory: o.orchidCategory ?? '',
          attractive: o.attractive ?? false,
          orchidURL: o.orchidURL ?? '',
        })
      })
      .catch(() => setError('Không tải được hoa lan cần chỉnh sửa.'))
      .finally(() => setLoading(false))
  }, [id])

  function changeText(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(current => ({ ...current, [name]: value }))
  }

  function changeCheckbox(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target
    setForm(current => ({ ...current, [name]: checked }))
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!form.orchidName.trim()) {
      setError('Vui lòng nhập tên hoa lan.')
      return
    }
    setSaving(true)
    const payload: OrchidDraft = {
      ...form,
      orchidName: form.orchidName.trim(),
      orchidDescription: form.orchidDescription.trim(),
      orchidCategory: form.orchidCategory.trim(),
      orchidURL: form.orchidURL.trim(),
    }
    try {
      if (id) await updateOrchid(Number(id), payload)
      else await createOrchid(payload)
      navigate('/')
    } catch {
      setError('Lưu thất bại. Kiểm tra Backend, SQL Server và dữ liệu nhập.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>

  return (
    <>
      <h1 className="h2 mb-4">{isEdit ? 'Chỉnh sửa hoa lan' : 'Thêm hoa lan'}</h1>
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      <Form onSubmit={submit} className="form-card">
        <Form.Group className="mb-3" controlId="orchidName">
          <Form.Label>Tên hoa lan *</Form.Label>
          <Form.Control name="orchidName" value={form.orchidName} onChange={changeText} maxLength={150} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="orchidCategory">
          <Form.Label>Danh mục</Form.Label>
          <Form.Control name="orchidCategory" value={form.orchidCategory} onChange={changeText} maxLength={100} placeholder="Ví dụ: Dendrobium" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="orchidDescription">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" rows={3} name="orchidDescription" value={form.orchidDescription} onChange={changeText} maxLength={1000} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="orchidURL">
          <Form.Label>URL hình ảnh</Form.Label>
          <Form.Control type="url" name="orchidURL" value={form.orchidURL} onChange={changeText} maxLength={1000} placeholder="https://..." />
          {form.orchidURL && <img className="form-preview mt-2" src={form.orchidURL} alt="Xem trước hoa lan" onError={e => { e.currentTarget.style.display = 'none' }} />}
        </Form.Group>
        <Form.Check className="mb-2" type="checkbox" name="natural" id="natural" label="Hoa lan có nguồn gốc tự nhiên" checked={form.natural} onChange={changeCheckbox} />
        <Form.Check className="mb-4" type="checkbox" name="attractive" id="attractive" label="Hoa lan có đặc tính thu hút" checked={form.attractive} onChange={changeCheckbox} />
        <Button type="submit" variant="success" disabled={saving} className="me-2">{saving ? 'Đang lưu...' : 'Lưu'}</Button>
        <Button variant="secondary" disabled={saving} onClick={() => navigate("/")}>Hủy</Button>
      </Form>
    </>
  )
}
