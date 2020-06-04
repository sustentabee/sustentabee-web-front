import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class CardList extends Component {

    render() {

        return (
            <Card className="mb-2 rounded border-0 p-0">
                <Card.Body className="p-3">
                    {this.props.children}
                </Card.Body>
            </Card>
        );

    }
}