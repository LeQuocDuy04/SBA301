import { Button, ButtonGroup } from "react-bootstrap";

export default function PaginationBar({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-bar">
      <span className="text-muted small">Page {page + 1} of {totalPages}</span>
      <ButtonGroup aria-label="Category pagination">
        <Button variant="outline-primary" disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}>Previous</Button>
        <Button variant="outline-primary" disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}>Next</Button>
      </ButtonGroup>
    </div>
  );
}
