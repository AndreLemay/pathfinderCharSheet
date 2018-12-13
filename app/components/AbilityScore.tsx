import * as React from "react"
import { IProps, InputField } from "./common"
import { Row, Col } from "reactstrap"

interface AbilityScoreProps extends IProps {
}

export default class AbilityScore extends React.Component<AbilityScoreProps, any> {
    render() {
        return (
            <Row className="form-row align-items-end">
                <Col className="ability-title" xs="2"><label>{this.props.label}</label></Col>
                <InputField label="Base" className="col" inputType="number" defaultValue="10" />
                <InputField label="Additional" className="col" inputType="number" readonly={true} />
                <InputField label="Bonus" className="col" inputType="number" readonly={true} />
            </Row>
        )
    }
}