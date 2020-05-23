import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

export default class Header extends Component {

    render() {

        return (
            <>
                <Container fluid className="my-3">
                    <Row>
                        <Col xs={12}>
                            <Card style={{ background: 'transparent', border: 0 }}>
                                <Card.Body style={{ padding: "1.25rem 0" }}>
                                    <Row>
                                        <Col xs={6} className="d-flex align-items-center justify-content-start">
                                            <h3 className="m-0" style={{ color: 'rgba(0, 0, 0, .5)' }}>{this.props.title}</h3>
                                        </Col>
                                        <Col xs={6} className="d-flex align-items-center justify-content-end">
                                            {this.props.children}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );

    }
}