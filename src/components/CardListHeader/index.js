import React, { Component } from 'react';
import Card from "react-bootstrap/Card";

export default class CardListHeader extends Component {

    render() {

        return (
            <>
                <Card className="d-none d-lg-flex mb-3 border-0" style={{ background: "transparent" }}>
                    <Card.Body className="py-0" style={{ background: "transparent" }}>
                        {this.props.children}
                    </Card.Body>
                </Card>
            </>
        );

    }
}