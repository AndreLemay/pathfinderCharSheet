import * as React from "react"
import { IProps, InputField, OutputField } from "./common"
import { Row } from "reactstrap";

interface AttackProps extends IProps {

}

export default class Attack extends React.Component<AttackProps, any> {
    render() {
        return (
            <Row className="form-row align-items-end">
                <OutputField
                    label="Name"
                    className="col-4"
                />
                <OutputField
                    inputType="textarea"
                    className="col-8"
                />
                <OutputField
                    label="Range"
                    className="col-4"
                    inputType="number"
                />
                <OutputField
                    label="Type"
                    className="col-4"
                />
                <OutputField
                    label="Damage"
                    className="col-4"
                />
                <OutputField
                    label="Critical"
                    className="col-4"
                />
            </Row>
        )
    }
}