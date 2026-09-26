import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
    return (
        <div className="text-center py-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            <p className="mt-3 text-secondary">
                Loading orchids...
            </p>
        </div>
    );
}

export default LoadingSpinner;