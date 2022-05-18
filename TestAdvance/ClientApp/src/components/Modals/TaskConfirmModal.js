import React, { Component } from 'react'
import { Navbar, Nav, Modal, ModalBody, Button, Row, Col, Form, Dropdown, Spinner, FormLabel } from 'react-bootstrap';


export class TaskConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            loading: false,
            showModal: false
        };


    }



    render() {
        var _this = this;


        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <div>
                        <div class="centered">
                        <Row style={{marginLeft:50}}>
                            <FormLabel>{this.props.body}</FormLabel>
                        </Row>
                        </div>
                        <pre></pre>
                        <div style={{width:500}}>
                        <Row style={{marginLeft:110}}>
                            <Col sm={2}>
                                <Button variant="success" onClick={this.props.deleteRecord}>Tamam</Button>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={2}>
                                <Button variant="danger" onClick={this.props.onHide}>Vazgeç</Button>
                            </Col>
                        </Row>
                        </div>
                        </div>
                    </ModalBody>

                </Modal>


            </div>
        )
    }

}


export default TaskConfirmModal;