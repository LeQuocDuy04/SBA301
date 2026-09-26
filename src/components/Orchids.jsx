import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Row
} from "react-bootstrap";

import useOrchids from "../hooks/useOrchids";

import OrchidCard from "./OrchidCard";
import OrchidDetailModal from "./OrchidDetailModal";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

import { useState } from "react";

function Orchids() {
    const {
        orchids,
        loading,
        error,
        reload
    } = useOrchids();

    const [selectedOrchid, setSelectedOrchid] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const handleDetail = (orchid) => {
        setSelectedOrchid(orchid);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrchid(null);
    };

    return (
        <section
            id="orchids"
            className="py-5"
        >
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <p className="text-uppercase text-secondary fw-semibold mb-1">
                            Gallery
                        </p>

                        <h2 className="fw-bold mb-1">
                            Featured Orchids
                        </h2>

                        <p className="text-secondary mb-0">
                            Explore our collection of beautiful orchids.
                        </p>
                    </div>

                    <Button
                        variant="outline-primary"
                        onClick={reload}
                        disabled={loading}
                    >
                        Reload
                    </Button>
                </div>

                {loading && <LoadingSpinner />}

                {!loading && error && (
                    <ErrorMessage
                        message={error}
                        onRetry={reload}
                    />
                )}

                {!loading &&
                    !error &&
                    orchids.length === 0 && (
                        <Alert variant="info">
                            No orchids available.
                        </Alert>
                    )}

                {!loading &&
                    !error &&
                    orchids.length > 0 && (
                        <Row className="g-4">
                            {orchids.map((orchid) => (
                                <Col
                                    key={orchid.id}
                                    xs={12}
                                    sm={6}
                                    lg={3}
                                >
                                    <OrchidCard
                                        orchid={orchid}
                                        onDetail={handleDetail}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}

                <OrchidDetailModal
                    orchid={selectedOrchid}
                    show={showModal}
                    onClose={handleCloseModal}
                />
            </Container>
        </section>
    );
}

export default Orchids;