import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";

export default class Widget extends Component {

    render() {
        const { name, value } = this.props;
        return (
            <Card className="border-0 rounded mb-4 shadow-sm">
                <Card.Body>
                    <Row>
                        <Col xs={12} className="d-flex align-items-center justify-content-start">
                            <div className="d-flex align-items-start flex-column justify-content-center">
                                <p className="mb-0" style={{ fontSize: "25px", fontWeight: 700 }}>{value}</p>
                                <p className="text-success mb-0 text-uppercase" style={{ fontSize: "14px", fontWeight: 400 }}>{name}</p>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}