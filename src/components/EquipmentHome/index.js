import React, { Component } from 'react';
import { Row, Col, Image } from "react-bootstrap";
import IconFreezer from "../../assets/img/freezer.svg";
import { Link } from 'react-router-dom';
import { formatDate } from '../../config/utils';

export default class EquipmentHome extends Component {

    render() {
        const { equipment = [] } = this.props;

        return (
            <Row className="border-bottom border-grey py-3">
                <Col xs={3} lg={1} className="d-flex align-items-center justify-content-start">
                    <Image src={IconFreezer} width="50" />
                </Col>
                <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2">
                    <div className="d-flex align-items-start justify-content-center flex-column">
                        <h6 className="mb-0">{equipment.nome}</h6>
                        <p className="mb-0 small text-muted">Adquirido em: {formatDate(equipment.dataAquisicao)}</p>
                    </div>
                </Col>
                <Col xs={9} lg={4} className="d-flex align-items-center justify-content-start mb-lg-0 mb-2 offset-3 offset-lg-0">
                    <div className="d-flex align-items-start justify-content-center flex-column">
                        <h6 className="mb-0">{equipment.marca} - {equipment.modelo}</h6>
                        <p className="mb-0 small text-muted">Potência: {equipment.potencia}W</p>
                    </div>
                </Col>
                <Col xs={12} lg={3} className="d-flex align-items-center justify-content-end">
                    <div className="d-flex align-items-start justify-content-center">
                        <Link to={"/dashboard-equipamento"} className="small">Ver equipamento</Link>
                    </div>
                </Col>
            </Row>
        )
    }
}