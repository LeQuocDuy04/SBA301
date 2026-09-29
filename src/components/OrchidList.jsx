import { Container, Row, Col } from "react-bootstrap";
import OrchidCard from "./OrchidCard";
import { OrchidsData } from "../shared/OrchidsData";

function OrchidList(){
    return(
        <section id="gallery" className="py-5">
            <Container fluid id="orchids" className="py=4 px-5">
                <h2 className="mb-4">Orchid Collection</h2>
                <Row className="g-4">
                    {OrchidsData.map((orchid) =>
                        (<Col Key={orchid.id} xs={12} sm={6} lg={4}>
                            <OrchidCard orchid={orchid} />
                        </Col>)
                    )}
                </Row>
            </Container>
        </section>
    )
}


export default OrchidList;