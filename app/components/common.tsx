import * as React from "react"
import { Enum, EnumValue } from "ts-enums";
import { FormGroup, Input } from "reactstrap";
import { InputType } from "reactstrap/lib/Input";

export interface IProps {
    label?: string
    className?: string
    tag?: string
}

interface FieldProps extends IProps {
    readonly?: boolean
    inputType?: InputType
    defaultValue?: string
    dropdownType?: Enum<EnumValue>
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

export class InputField extends React.Component<FieldProps, any> {
    render() {
        //need to handle plaintext this way because some moron working on reactstrap
        //thought it would be a good idea to have Input completely break expectations of
        //what you'll get back if you specify plaintext
        let plainText = this.props.readonly ? "form-control-plaintext" : ""
        if (this.props.label && this.props.label.length > 0)
            return (
                <FormGroup className={`${this.props.className || ""}`}>
                    <label>{this.props.label}</label>
                    <Input bsSize="sm"
                        className={`${plainText}`}
                        type={this.props.inputType || "text"}
                        defaultValue={this.props.defaultValue}
                        readOnly={this.props.readonly} />
                </FormGroup>
            )
        else return (
            <Input bsSize="sm"
                type={this.props.inputType || "text"}
                defaultValue={this.props.inputType !== "select" && this.props.defaultValue}
                readOnly={this.props.readonly}
                plaintext={this.props.readonly} />
        )
    }
}

export class DropdownField extends React.Component<FieldProps, any> {
    render() {
        if (this.props.label && this.props.label.length > 0)
            return (
                <FormGroup className={`${this.props.className || ""}`}>
                    <label>{this.props.label}</label>
                    <Input type="select" bsSize="sm">
                        {this.props.dropdownType.values.map(option => {
                            return <option key={option.ordinal} value={option.ordinal}>{option.description}</option>
                        })}
                    </Input>
                </FormGroup>
            )
        else return (
            <Input type="select" bsSize="sm">
                {this.props.dropdownType.values.map(option => {
                    return <option key={option.ordinal} value={option.ordinal}>{option.description}</option>
                })}
            </Input>
        )
    }
}
