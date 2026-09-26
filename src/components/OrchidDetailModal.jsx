import { Badge, Button, Modal } from "react-bootstrap";

function OrchidDetailModal({
    orchid,
    show,
    onClose
}) {
    if (!orchid) {
        return null;
    }

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {orchid.orchidName}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row g-4">
                    <div className="col-md-5">
                        <img
                            src={orchid.image}
                            alt={orchid.orchidName}
                            className="img-fluid rounded orchid-detail-image"
                        />
                    </div>

                    <div className="col-md-7">
                        <p>
                            <strong>Category:</strong>{" "}
                            {orchid.category}
                        </p>

                        <p>
                            <strong>Origin:</strong>{" "}
                            {orchid.origin}
                        </p>

                        <p>
                            <strong>Color:</strong>{" "}
                            {orchid.color}
                        </p>

                        <p>
                            <strong>Rating:</strong>{" "}
                            ⭐ {orchid.rating}
                        </p>

                        <p>
                            <strong>Special:</strong>{" "}
                            {orchid.isSpecial ? (
                                <Badge bg="warning" text="dark">
                                    Yes
                                </Badge>
                            ) : (
                                <Badge bg="secondary">
                                    No
                                </Badge>
                            )}
                        </p>

                        <hr />

                        <p>
                            {orchid.description}
                        </p>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrchidDetailModal;