import * as React from "react"
import { IProps, InputField } from "./common"
import { Row } from "reactstrap";

interface AttackProps extends IProps {

}

export default class Attack extends React.Component<AttackProps, any> {
    render() {
        return (
            <Row className="form-row align-items-end">
                <InputField
                    label="Name"
                    className="col-4"
                    readonly={true} />
                <InputField
                    inputType="textarea"
                    className="col-8"
                    readonly={true} />
                <InputField
                    label="Range"
                    className="col-4"
                    inputType="number"
                    readonly={true} />
                <InputField
                    label="Type"
                    className="col-4"
                    readonly={true} />
                <InputField
                    label="Damage"
                    className="col-4"
                    readonly={true} />
                <InputField
                    label="Critical"
                    className="col-4"
                    readonly={true} />
            </Row>
        )
    }
}