import * as React from "react"
import { IProps, InputField } from "./common"
import { ValueBonus } from "../api/CharSheet";
import { Row, Col } from "reactstrap";

interface FeatProps extends IProps {
    name: string
    description: string
    bonuses: ValueBonus[]
}

export default class Feat extends React.Component<FeatProps, any> {
    render() {
        return (
            <div className="feat-item">
                <Row className="form-row align-items-center">
                    <Col xs="3"><label>Name</label></Col>
                    <Col xs="6">
                        <InputField className="form-control-plaintext" readonly={true} defaultValue={this.props.name} />
                    </Col>
                    <Col xs="3">
                        <label className="switch">
                            <input type="checkbox" checked />
                            <span className="slider round"></span>
                            <span className="absolute-no">Off</span>
                        </label>
                    </Col>
                    <Row className="form-row align-items-center">
                        <Col xs="3"><label>Properties</label></Col>
                        <Col xs="9">
                            <InputField inputType="textarea" className="form-control-plaintext" readonly={true} defaultValue={
                                this.props.bonuses.map((bonus) => { return bonus.asString(true) }) + "\n" + this.props.description} />
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
}
