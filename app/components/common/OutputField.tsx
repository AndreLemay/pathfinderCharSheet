import * as React from "react"

interface OutputProps {
    label?: string
    className?: string
    inputType?: "text" | "number" | "textarea"
    value: number | string
}

export default function OutputField(props: OutputProps) {
    if (props.label && props.label.length > 0)
        return (
            <div className={`form-group ${props.className || ""}`}>
                <label>{props.label}</label>
                {props.inputType !== "textarea" ?
                    <input
                        className="form-control form-control-sm form-control-plaintext"
                        type={props.inputType || "text"}
                        value={props.value}
                        readOnly={true} />
                    :
                    <textarea className="form-control form-control-sm" readOnly={true} value={props.value} />}
            </div>
        )
    else return (
        props.inputType !== "textarea" ?
            <input
                type={props.inputType || "text"}
                className="form-control form-control-sm form-control-plaintext"
                value={props.value}
                readOnly={true} />
            :
            <textarea className="form-control form-control-sm" readOnly={true} value={props.value} />
    )
}