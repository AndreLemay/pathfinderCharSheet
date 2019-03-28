import * as React from "react"
import { View, TextInput, Text } from "react-native";

interface OutputProps {
    label?: string
    inputType?: "text" | "number" | "textarea"
    value: number | string
}

export default function OutputField(props: OutputProps) {
    return (
        <View>
            {props.label && props.label.length > 0 &&
                <Text>{props.label}</Text>}
            <TextInput
                editable={false}
                multiline={props.inputType === "textarea"}
                numberOfLines={3}
                value={props.value + ""} />            
        </View>
    )
}