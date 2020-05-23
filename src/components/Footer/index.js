import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Footer extends Component {

    render() {

        return (
            <Container className="pb-3 pt-4 small text-center">
                <Row>
                    <Col xs={12}>
                        <span className="text-muted">&copy; Sustentabee {new Date().getFullYear()} - All rights reserved.</span>
                    </Col>
                </Row>
            </Container>
        );

    }
}