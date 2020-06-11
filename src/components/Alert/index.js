import React, { Component } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import { formatDate } from '../../config/utils';
import { Link } from 'react-router-dom';

export default class Alert extends Component {


    render() {
        const { alert = [] } = this.props;

        return (
            <Card className="border-0 rounded shadow-sm mb-3">
                <Card.Body>
                    <Row>
                        <Col xs={12} lg={7} className="d-flex align-items-center">
                            <div className="d-flex h-100 mr-3 rounded" style={{ width: "6px", background: (alert.variant === "success") ? "#0A0" : (alert.variant === "warning") ? "rgb(255, 140, 0)" : "#A00" }}></div>
                            <div>
                                <span className="d-flex">{alert.alert}</span>
                                <span className="d-flex small text-muted">{alert.marca} - {alert.modelo}</span>
                            </div>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center">
                            <div className="text-center">
                                <span className="d-flex small text-muted">{formatDate(alert.data)}</span>
                                <span className="d-flex small text-muted">{alert.hora}</span>
                            </div>
                        </Col>
                        <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
                            <Link to={`equipamento/${alert.equipment}/dashboard`} className="small">Detalhes</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}