import * as React from "react"

interface InputProps {
    label?: string
    className?: string
    inputType?: "text" | "number" | "textarea"
    value: number | string
    onValueChange: (value: number | string) => void
}

export default function InputField(props: InputProps) {
    function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let val: number | string = props.inputType === "number" ? +event.currentTarget.value : event.currentTarget.value
        props.onValueChange(val)
    }
    return (
        <div className={`form-group ${props.className || ""}`}>
            {props.label && props.label.length > 0 &&
                <label>{props.label}</label>}
            {props.inputType !== "textarea" ?
                <input className="form-control form-control-sm"
                    type={props.inputType || "text"}
                    value={props.value}
                    onChange={change} />
                :
                <textarea className="form-control form-control-sm"
                    onChange={change} value={props.value} />}
        </div>
    )
}