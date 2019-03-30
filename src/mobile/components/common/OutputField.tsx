import * as React from "react"
import { Input } from "react-native-elements";

interface OutputProps {
    label?: string
    inputType?: "text" | "number" | "textarea"
    value: number | string
}

export default function OutputField(props: OutputProps) {
    return (
        <Input
            label={props.label}
            multiline={props.inputType === "textarea"}
            numberOfLines={3}
            value={props.value + ""} />
    )
}