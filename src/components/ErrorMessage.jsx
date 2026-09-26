import { Alert, Button } from "react-bootstrap";

function ErrorMessage({ message, onRetry }) {
    return (
        <Alert variant="danger" className="my-4">
            <Alert.Heading>
                Unable to load orchids
            </Alert.Heading>

            <p>{message}</p>

            <Button
                variant="danger"
                onClick={onRetry}
            >
                Try Again
            </Button>
        </Alert>
    );
}

export default ErrorMessage;