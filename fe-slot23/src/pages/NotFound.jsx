import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="state-panel">
      <div className="state-icon">404</div>
      <h1 className="h4">Page not found</h1>
      <p className="text-muted">The page you requested does not exist.</p>
      <Button as={Link} to="/categories">Go to categories</Button>
    </div>
  );
}
