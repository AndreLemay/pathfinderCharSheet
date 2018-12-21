import * as React from "react"

interface OutputProps {
    label?: string
    className?: string
    inputType?: "text" | "number" | "textarea"
    value: number | string
}

export default function OutputField(props: OutputProps) {
    return (
        <div className={`form-group ${props.className || ""}`}>
            {props.label && props.label.length > 0 &&
                <label>{props.label}</label>}
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
}