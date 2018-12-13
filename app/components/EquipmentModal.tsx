import * as React from "react"
import { IProps, InputField, DropdownField } from "./common"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col } from "reactstrap"
import { BonusType, StatType } from "../api/enums";

interface ModalProps extends IProps {
    okCallback?: () => void
}

export default class EquipmentModal extends React.Component<ModalProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    toggle() {
        this.setState((prevState) => {
            return { modal: !prevState.modal }
        });
    }

    addStatBonus() {

    }

    addSkillBonus() {

    }

    render() {
        return (
            <Modal tabIndex={-1} isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New Equipment</ModalHeader>
                <ModalBody>
                    <Container>
                        <Row class="align-items-end">
                            <InputField label="Name" className="col-3"></InputField>
                            <InputField label="Properties" className="col-9"></InputField>
                            <Col>
                                <InputField inputType="textarea"></InputField>
                            </Col>
                        </Row>
                        <Row class="align-items-end">
                            <label>Stat Bonus</label>
                            <DropdownField label="Bonus Type" dropdownType={BonusType}/>
                            <DropdownField label="Affected Stat" dropdownType={StatType}/>
                            <InputField label="Amount" inputType="number"></InputField>
                            <Col className="form-group">
                                <Button color="secondary" onClick={this.addStatBonus}>Add</Button>
                            </Col>
                        </Row>
                        <Row class="align-items-end">
                            <label>Skill Bonus</label>
                            <DropdownField label="Bonus Type" dropdownType={BonusType}/>
                            <DropdownField label="Affected Stat" dropdownType={StatType}/>
                            <InputField label="Amount" inputType="number"></InputField>
                            <Col className="form-group">
                                <Button color="secondary" onClick={this.addSkillBonus}>Add</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    <Button color="primary" onClick={this.props.okCallback}>Add Equipment</Button>
                </ModalFooter>
            </Modal>

        )
    }
}