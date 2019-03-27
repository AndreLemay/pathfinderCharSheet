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
            {this.props.label && this.props.label.length > 0 &&
                <Text>{this.props.label}</Text>}
            <TextInput
                editable={false}
                multiline={this.props.inputType === "textarea"}
                numberOfLines={3}
                value={this.props.value + ""} />            
        </View>
    )
}