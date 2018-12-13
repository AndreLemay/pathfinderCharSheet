import * as React from "react"
import { IProps, InputField } from "./common"
import { Row, Col } from "reactstrap";

interface EquipmentProps extends IProps {

}

export default class Equipment extends React.Component<EquipmentProps, any> {
    render() {
        return (
            <div className="equipment-item">
                <Row className="form-row align-items-center">
                    <Col xs="2"><label>Name</label></Col>
                    <Col xs="10">
                        <InputField className="form-control-plaintext" readonly={true} />
                    </Col>
                </Row>
                <Row className="form-row align-items-center">
                    <Col xs="2"><label>Properties</label></Col>
                    <Col xs="10">
                        <InputField inputType="textarea" className="form-control-plaintext" readonly={true} />
                    </Col>
                </Row>
            </div>
        )
    }
}