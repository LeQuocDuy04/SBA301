import { Badge, Button, Card } from "react-bootstrap";

function OrchidCard({ orchid, onDetail }) {
    return (
        <Card className="h-100 shadow-sm orchid-card">
            <Card.Img
                variant="top"
                src={orchid.image}
                alt={orchid.orchidName}
                className="orchid-image"
                style={{ height: "250px", objectFit: "cover" }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title>
                    {orchid.orchidName}
                </Card.Title>

                <Card.Text className="text-secondary">
                    {orchid.category}
                </Card.Text>

                {orchid.isSpecial && (
                    <div className="mb-3">
                        <Badge bg="warning" text="dark">
                            Special
                        </Badge>
                    </div>
                )}

                <Button
                    variant="outline-primary"
                    className="mt-auto"
                    onClick={() => onDetail(orchid)}
                >
                    Detail
                </Button>
            </Card.Body>
        </Card>
    );
}

export default OrchidCard;