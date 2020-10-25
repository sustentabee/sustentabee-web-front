import React, { Component } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class Alert extends Component {


    render() {
        const { alert = [] } = this.props;
        const { created_at = new Date(), newAlert = false } = alert;

        return (
            <Card className="border-0 rounded shadow-sm mb-3">
                <Card.Body>
                    <Row>
                        <Col xs={12} lg={7} className="d-flex align-items-center">
                            <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: (alert.type === "success") ? "#0A0" : (alert.type === "warning") ? "rgb(255, 140, 0)" : "#A00" }}></div>
                            <div>
                                <span className="d-flex" style={(newAlert) ? { fontWeight: "bold" } : {}}>{alert.title}</span>
                                <span className="d-flex small text-muted" style={(newAlert) ? { fontWeight: "bold" } : {}}>{alert.brand} - {alert.model}</span>
                            </div>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                            <div className="text-center">
                                <span className="d-flex small text-muted" style={(newAlert) ? { fontWeight: "bold" } : {}}>{new Date(created_at).toLocaleDateString()}</span>
                                <span className="d-flex small text-muted" style={(newAlert) ? { fontWeight: "bold" } : {}}>{`${new Date(created_at).getHours()}:${new Date(created_at).getMinutes()}`}</span>
                            </div>
                        </Col>
                        <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                            <Link to={`equipamento/${alert.equipment_id}/dashboard`} className="small" style={(newAlert) ? { fontWeight: "bold" } : {}}>Detalhes</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}