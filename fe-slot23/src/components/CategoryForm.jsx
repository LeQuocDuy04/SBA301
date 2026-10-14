import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { createCategory } from "../api/categoryApi.js";
import { getApiErrorMessage } from "../api/errorMessage.js";

const emptyForm = {
  categoryName: "",
  categoryDescription: "",
  parentCategoryId: "",
  active: true
};

export default function CategoryForm({ show, onHide, onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      setForm(emptyForm);
      setError("");
    }
  }, [show]);

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
      await createCategory(payload);
      onHide();
      await onCreated();
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not create category."));
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    if (submitting) return;
    setForm(emptyForm);
    setError("");
    onHide();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton={!submitting}>
          <Modal.Title>Create category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted small">Enter the category information. Fields marked * are required.</p>
          {error && <Alert variant="danger" role="alert">{error}</Alert>}

          <Form.Group className="mb-3" controlId="create-category-name">
            <Form.Label>Category name *</Form.Label>
            <Form.Control name="categoryName" value={form.categoryName}
              onChange={handleChange} maxLength={100} required
              aria-describedby="create-name-help" />
            <Form.Text id="create-name-help">Maximum 100 characters.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="create-category-description">
            <Form.Label>Description *</Form.Label>
            <Form.Control as="textarea" rows={3} name="categoryDescription"
              value={form.categoryDescription} onChange={handleChange}
              maxLength={250} required />
            <Form.Text>Maximum 250 characters.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="create-parent-category">
            <Form.Label>Parent Category ID</Form.Label>
            <Form.Control type="number" min="1" step="1" name="parentCategoryId"
              value={form.parentCategoryId} onChange={handleChange}
              placeholder="Leave empty for a root category" />
          </Form.Group>

          <Form.Check type="switch" id="create-category-active" name="active"
            label="Active" checked={form.active} onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" type="button" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? <><Spinner size="sm" className="me-2" />Saving...</> : "Create category"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
