import * as React from "react"
import { Enum, EnumValue } from "ts-enums";

interface DropdownProps {
    label?: string
    className?: string
    value: EnumValue
    dropdownType: Enum<EnumValue>
    onValueChange: (value: EnumValue) => void
}

export default function DropdownField(props: DropdownProps) {
    function change(event: React.ChangeEvent<HTMLSelectElement>) {
        let ordinal = +event.currentTarget.value;
        props.onValueChange(props.dropdownType.values[ordinal])
    }

    if (props.label && props.label.length > 0)
        return (
            <div className={` form-group ${props.className || ""}`}>
                <label>{props.label}</label>
                <select className="form-control form-control-sm" value={props.value.ordinal} onChange={change}>
                    {props.dropdownType.values.map(option => {
                        return <option key={option.ordinal} value={option.ordinal}>{option.description}</option>
                    })}
                </select>
            </div>
        )
    else return (
        <select className={props.className} value={props.value.ordinal} onChange={change}>
            {props.dropdownType.values.map(option => {
                return <option key={option.ordinal} value={option.ordinal}>{option.description}</option>
            })}
        </select>
    )
}