import { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../api/categoryApi.js";
import { getApiErrorMessage } from "../api/errorMessage.js";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadCategory() {
      setLoading(true);
      setError("");
      setForm(null);
      try {
        const response = await getCategoryById(id);
        if (!ignore) {
          const category = response.data;
          setForm({
            categoryName: category.categoryName ?? "",
            categoryDescription: category.categoryDescription ?? "",
            parentCategoryId: category.parentCategoryId ?? "",
            active: category.active ?? true
          });
        }
      } catch (err) {
        if (!ignore) setError(getApiErrorMessage(err, `Could not load category ${id}.`));
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadCategory();
    return () => { ignore = true; };
  }, [id]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm(current => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function validate() {
    if (!form.categoryName.trim()) return "Category name is required.";
    if (form.categoryName.trim().length > 100) return "Category name must not exceed 100 characters.";
    if (!form.categoryDescription.trim()) return "Description is required.";
    if (form.categoryDescription.trim().length > 250) return "Description must not exceed 250 characters.";
    if (form.parentCategoryId !== "" &&
        (!Number.isInteger(Number(form.parentCategoryId)) || Number(form.parentCategoryId) <= 0)) {
      return "Parent Category ID must be a positive whole number.";
    }
    if (String(form.parentCategoryId) === String(id)) return "A category cannot be its own parent.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const payload = {
      categoryName: form.categoryName.trim(),
      categoryDescription: form.categoryDescription.trim(),
      parentCategoryId: form.parentCategoryId === "" ? null : Number(form.parentCategoryId),
      active: Boolean(form.active)
    };

    try {
      setSubmitting(true);
      setError("");
      await updateCategory(id, payload);
      setNotice("Category updated successfully.");
      window.setTimeout(() => navigate("/categories"), 500);
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not update category."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="edit-page">
      <Link to="/categories" className="back-link">← Back to categories</Link>
      <div className="edit-card">
        <div className="eyebrow">CATEGORY DETAILS</div>
        <h1>Edit category <span className="text-muted">#{id}</span></h1>
        <p className="text-muted">Update the category fields and save your changes.</p>

        {notice && <Alert variant="success">{notice}</Alert>}
        {error && <Alert variant="danger" role="alert">{error}</Alert>}

        {loading ? (
          <div className="state-panel compact">
            <Spinner animation="border" />
            <p className="mt-3 mb-0">Loading category...</p>
          </div>
        ) : !form ? (
          <div className="state-panel compact">
            <div className="state-icon error-icon">!</div>
            <h5>Category unavailable</h5>
            <p className="text-muted">The category may not exist or the server could not be reached.</p>
            <Button as={Link} to="/categories" variant="outline-primary">Return to list</Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-4" controlId="edit-category-name">
              <Form.Label>Category name *</Form.Label>
              <Form.Control name="categoryName" value={form.categoryName}
                onChange={handleChange} maxLength={100} required />
              <Form.Text>Maximum 100 characters.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="edit-category-description">
              <Form.Label>Description *</Form.Label>
              <Form.Control as="textarea" rows={4} name="categoryDescription"
                value={form.categoryDescription} onChange={handleChange}
                maxLength={250} required />
              <Form.Text>Maximum 250 characters.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="edit-parent-category">
              <Form.Label>Parent Category ID</Form.Label>
              <Form.Control type="number" min="1" step="1" name="parentCategoryId"
                value={form.parentCategoryId} onChange={handleChange}
                placeholder="Leave empty for a root category" />
            </Form.Group>

            <div className="active-setting mb-4">
              <div>
                <div className="fw-semibold">Category status</div>
                <div className="text-muted small">Inactive categories can remain in the system.</div>
              </div>
              <Form.Check type="switch" id="edit-category-active" name="active"
                label={form.active ? "Active" : "Inactive"} checked={form.active}
                onChange={handleChange} />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button as={Link} to="/categories" variant="outline-secondary" disabled={submitting}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? <><Spinner size="sm" className="me-2" />Saving...</> : "Save changes"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
