import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IconBusiness from "../../assets/img/business-black.svg";

const styles = {
    h3: {
        fontSize: "25px",
        color: "#211F25"
    },
    div: {
        background: "#7FFF7F",
        borderRadius: "50%",
        width: "80px",
        height: "80px"
    }
}

export default class SelectCompany extends Component {

    state = {
        email: '',
        company: ''
    }

    componentDidMount() {
        const email = localStorage.getItem("email");
        this.setState({ email });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    company = async event => {
        event.preventDefault();
        const { company } = this.state;
        localStorage.setItem("company", company);
        window.location.href = "/home";
    }


    render() {
        const { email, company } = this.state;

        return (
            <>
                <Container className="h-100">
                    <Row className="justify-content-center align-items-center h-100">
                        <Col xs={12} lg={6}>
                            <div className="d-flex align-items-center justify-content-center mx-auto mb-4" style={styles.div}>
                                <img src={IconBusiness} alt="Empresa" width="50px" />
                            </div>
                            <p className="text-center mb-2">Você está logado como:</p>
                            <h3 className="m-0 font-weight-bold text-center" style={styles.h3}>{email}</h3>
                            <Form onSubmit={this.company} className="pt-5">
                                <Row className="mb-4">
                                    <Col xs={12}>
                                        <Form.Label className="text-success font-weight-bold">Selecionar empresa:</Form.Label>
                                        <Form.Control as="select" name="company" size="lg" onChange={this.myChangeHandler} required>
                                            <option></option>
                                            <option value="Universidade Cruzeiro do Sul">Universidade Cruzeiro do Sul</option>
                                            <option value="Universidade Positivo">Universidade Positivo</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                                {(company !== '') ?
                                    <Row className="mb-4">
                                        <Col xs={12} className="d-flex align-items-center justify-content-end">
                                            <Button variant="success" type="submit" size="md">
                                                Continuar
                                        </Button>
                                        </Col>
                                    </Row>
                                    : <></>}
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}