import { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCategory, getCategories } from "../api/categoryApi.js";
import { getApiErrorMessage } from "../api/errorMessage.js";
import CategoryForm from "../components/CategoryForm.jsx";
import PaginationBar from "../components/PaginationBar.jsx";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getCategories({ keyword, page, size, sort: "categoryName,asc" });
      const pageData = response.data;
      if (Array.isArray(pageData)) {
        // Helpful compatibility if the backend returns a plain list instead of Spring Page.
        setCategories(pageData);
        setTotalPages(pageData.length ? 1 : 0);
        setTotalElements(pageData.length);
      } else {
        setCategories(pageData?.content ?? []);
        setTotalPages(pageData?.totalPages ?? 0);
        setTotalElements(pageData?.totalElements ?? 0);
      }
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load categories."));
      setCategories([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [keyword, page, size]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleSearch(event) {
    event.preventDefault();
    setNotice("");
    setPage(0);
    setKeyword(keywordInput.trim());
  }

  function handleClear() {
    setKeywordInput("");
    setKeyword("");
    setPage(0);
    setNotice("");
  }

  async function handleDelete(category) {
    if (!window.confirm(`Delete category "${category.categoryName}"? This action cannot be undone.`)) return;

    try {
      setDeletingId(category.categoryId);
      setError("");
      setNotice("");
      await deleteCategory(category.categoryId);
      setNotice(`Category "${category.categoryName}" was deleted.`);
      if (categories.length === 1 && page > 0) {
        setPage(current => current - 1);
      } else {
        await loadCategories();
      }
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not delete category."));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCreated() {
    setPage(0);
    setKeyword("");
    setKeywordInput("");
    setNotice("Category created successfully.");
    await loadCategories();
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CONTENT ADMINISTRATION</div>
          <h1>Category Management</h1>
          <p className="text-muted mb-0">Manage the categories used by FUNews articles.</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="create-button">
          <span aria-hidden="true" className="me-2">＋</span>Create category
        </Button>
      </div>

      <section className="content-panel">
        <Form onSubmit={handleSearch} className="search-panel">
          <Row className="g-2 align-items-end">
            <Col xs={12} md={7} lg={6}>
              <Form.Label htmlFor="category-search">Search by category name</Form.Label>
              <Form.Control id="category-search" value={keywordInput}
                onChange={event => setKeywordInput(event.target.value)}
                placeholder="e.g. Academic news" />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
            <Col xs="auto">
              <Button type="button" variant="outline-secondary" onClick={handleClear}>Clear</Button>
            </Col>
            <Col className="text-md-end ms-md-auto">
              <span className="records-label">{loading ? "Loading records..." : `${totalElements} record${totalElements === 1 ? "" : "s"}`}</span>
            </Col>
          </Row>
        </Form>

        {notice && <Alert variant="success" dismissible onClose={() => setNotice("")}>{notice}</Alert>}
        {error && <Alert variant="danger" role="alert" dismissible onClose={() => setError("")}>{error}</Alert>}

        {loading ? (
          <div className="state-panel" role="status">
            <Spinner animation="border" variant="primary" />
            <div className="mt-3 fw-semibold">Loading categories</div>
            <div className="text-muted small">Getting the latest data from the server...</div>
          </div>
        ) : error && categories.length === 0 ? (
          <div className="state-panel">
            <div className="state-icon error-icon">!</div>
            <h5>Could not load categories</h5>
            <p className="text-muted">Check the backend status and API configuration, then retry.</p>
            <Button variant="outline-primary" onClick={loadCategories}>Try again</Button>
          </div>
        ) : categories.length === 0 ? (
          <div className="state-panel">
            <div className="state-icon">⌕</div>
            <h5>No categories found</h5>
            <p className="text-muted">{keyword ? "Try another search keyword or clear the filter." : "Create the first category to get started."}</p>
            {keyword ? <Button variant="outline-primary" onClick={handleClear}>Clear search</Button> :
              <Button onClick={() => setShowCreate(true)}>Create category</Button>}
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <Table hover className="category-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Parent ID</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.categoryId}>
                      <td className="id-cell">#{category.categoryId}</td>
                      <td>
                        <div className="category-name">{category.categoryName}</div>
                      </td>
                      <td className="description-cell">{category.categoryDescription || "—"}</td>
                      <td>{category.parentCategoryId ?? <span className="text-muted">Root</span>}</td>
                      <td>
                        <Badge bg={category.active ? "success" : "secondary"} className="status-badge">
                          <span className="status-dot" />{category.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <Button as={Link} to={`/categories/${category.categoryId}/edit`}
                            size="sm" variant="outline-primary">Edit</Button>
                          <Button size="sm" variant="outline-danger"
                            disabled={deletingId === category.categoryId}
                            onClick={() => handleDelete(category)}>
                            {deletingId === category.categoryId ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="table-bottom">
              <span className="text-muted small">Showing {categories.length} item(s)</span>
              <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </section>

      <CategoryForm show={showCreate} onHide={() => setShowCreate(false)} onCreated={handleCreated} />
    </>
  );
}
