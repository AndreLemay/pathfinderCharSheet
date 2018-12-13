import * as React from "react"
import { Enum, EnumValue } from "ts-enums";
import { FormGroup, Input } from "reactstrap";
import { InputType } from "reactstrap/lib/Input";

export interface IProps {
    label?: string
    className?: string
}

interface FieldProps extends IProps {
    value?: string
    inputType?: InputType
}

interface InputProps extends FieldProps {
    dropdownType?: Enum<EnumValue>
    change?: () => void
}

export class SectionHeader extends React.Component<IProps, any> {
    render() {
        return (
            <div className={`${this.props.className || ""} section-head`}>
                <label>{this.props.label}</label>
            </div>
        )
    }
}

export class OutputField extends React.Component<FieldProps, any> {
    render() {
        if (this.props.label && this.props.label.length > 0)
            return (
                <FormGroup className={`${this.props.className || ""}`}>
                    <label>{this.props.label}</label>
                    <Input bsSize="sm"
                        className="form-control-plaintext"
                        type={this.props.inputType || "text"}
                        value={this.props.value}
                        readOnly={true} />
                </FormGroup>
            )
        else return (
            <Input bsSize="sm"
                type={this.props.inputType || "text"}
                className="form-control-plaintext"
                value={this.props.inputType !== "select" && this.props.value}
                readOnly={true} />
        )
    }
}

export class InputField extends React.Component<InputProps, any> {
    render() {
        if (this.props.label && this.props.label.length > 0)
            return (
                <FormGroup className={`${this.props.className || ""}`}>
                    <label>{this.props.label}</label>
                    <Input bsSize="sm"
                        type={this.props.inputType || "text"}
                        value={this.props.value}
                        onChange={this.props.change} />
                </FormGroup>
            )
        else return (
            <Input bsSize="sm"
                type={this.props.inputType || "text"}
                value={this.props.value}
                onChange={this.props.change} />
        )
    }
}

export class DropdownField extends React.Component<InputProps, any> {
    render() {
        if (this.props.label && this.props.label.length > 0)
            return (
                <FormGroup className={`${this.props.className || ""}`}>
                    <label>{this.props.label}</label>
                    <Input type="select" bsSize="sm" onChange={this.props.change}>
                        {this.props.dropdownType.values.map(option => {
                            return <option key={option.ordinal} value={option.ordinal}>{option.description}</option>
                        })}
                    </Input>
                </FormGroup>
            )
        else return (
            <Input type="select" bsSize="sm" onChange={this.props.change}>
                {this.props.dropdownType.values.map(option => {
                    return <option key={option.ordinal} value={option.ordinal}>{option.description}</option>
                })}
            </Input>
        )
    }
}
