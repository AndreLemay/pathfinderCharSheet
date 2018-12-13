import * as React from "react"
import { IProps, InputField, OutputField } from "./common"
import { Row, Col, Input } from "reactstrap";

interface SkillProps extends IProps {
    trainedOnly?: boolean
    checkPenaltyApplies?: boolean
}

export default class Skill extends React.Component<SkillProps, any> {
    render() {
        return (
            <Row className="form-row align-items-end">
                <Col xs="4"><span>{this.props.label}</span></Col>
                <Col>
                    {this.props.trainedOnly &&
                        //using regular input instead of reactstrap input because the latter does dumb things with styles
                        <input
                            className="form-control form-control-sm"
                            disabled
                            checked
                            type="checkbox" />
                    }
                </Col>
                <Col>
                    <OutputField
                        inputType="number"
                        className="form-control form-control-sm"
                    />
                </Col>
                <Col>
                    <OutputField
                        inputType="number"
                        className="form-control form-control-sm"
                    />
                </Col>
                <Col>
                    <input
                        type="checkbox"
                        className="form-control form-control-sm" />
                </Col>
                <Col>
                    <InputField
                        inputType="number"
                        className="form-control form-control-sm" />
                </Col>
                <Col>
                    <OutputField
                        inputType="number"
                        className="form-control form-control-sm"
                    />
                </Col>
                <Col>
                    <OutputField
                        inputType="number"
                        className="form-control form-control-sm"
                    />
                </Col>
                <Col>
                    {this.props.checkPenaltyApplies &&
                        <OutputField
                            inputType="number"
                            className="form-control form-control-sm"
                        />}
                </Col>
            </Row>
        )
    }
}