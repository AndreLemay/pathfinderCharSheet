import * as React from "react"
import { IProps, InputField, DropdownField } from "./common"
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col,
    FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupButtonDropdown, DropdownToggle
} from "reactstrap"
import { BonusType, StatType } from "../api/enums";

interface ModalProps extends IProps {
    okCallback?: () => void
}

export default class FeatModal extends React.Component<ModalProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState((prevState) => {
            return { modal: !prevState.modal }
        });
    }

    toggleDropdown() {
        this.setState((prevState) => {
            return { dropdownOpen: !prevState.dropdownOpen }
        })
    }

    addStatBonus() {

    }

    addSkillBonus() {

    }

    render() {
        return (
            <Modal tabIndex={-1} isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New Attack</ModalHeader>
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
                            <InputField label="Range" inputType="number" className="col-1" />
                            <FormGroup className="col-5">
                                <label>Type</label>
                                <div className="form-control">
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" />
                                            Bludegeoning
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" />
                                            Piercing
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" />
                                            Slashing
                                        </Label>
                                    </FormGroup>
                                </div>
                            </FormGroup>
                            <FormGroup className="col-3">
                                <Label>Damage</Label>
                                <InputGroup>
                                    <Input type="number" />
                                    {/*Have to do it like this because reactstrap InputGroupAddon doesn't support adding 
                                    append and prepend className*/}
                                    <div className="input-group-prepend input-group-append">
                                        <InputGroupText>d</InputGroupText>
                                    </div>
                                    <Input type="select">
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="20">20</option>
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="col-3">
                                <Label>Critical</Label>
                                <InputGroup>
                                    <Input type="number" min="1" max="20" />
                                    <div className="input-group-prepend input-group-append">
                                        <div className="input-group-text">-20 x</div>
                                    </div>
                                    <Input type="number" />
                                </InputGroup>
                            </FormGroup>
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
                    <Button color="primary" onClick={this.props.okCallback}>Add Attack</Button>
                </ModalFooter>
            </Modal>
        )
    }
}