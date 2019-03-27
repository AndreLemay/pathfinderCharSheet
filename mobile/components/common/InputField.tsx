import * as React from "react"
import { TextInput, View, Text } from "react-native";

interface InputProps {
    label?: string
    inputType?: "text" | "number" | "textarea"
    value: number | string
    onValueChange: (value: number | string) => void
    validator?: (val: string | number) => string //should return error string if needed
}

interface InputState {
    error: string
}

const defaultState: InputState = {
    error: null
}

export default class InputField extends React.Component<InputProps, InputState> {
    state = defaultState
    constructor(props: InputProps) {
        super(props)
    }

    change = (val: string) => {
        let typedVal = this.props.inputType === "number" ? +val : val;
        let err = this.props.validator(typedVal)
        this.setState({ error: err })
        this.props.onValueChange(typedVal)
    }

    render() {
        return (
            <View>
                {this.props.label && this.props.label.length > 0 &&
                    <Text>{this.props.label}</Text>}
                <TextInput
                    keyboardType={this.props.inputType === "number" ? "numeric" : "default"}
                    multiline={this.props.inputType === "textarea"}
                    numberOfLines={3}
                    onChangeText={this.change}
                    value={this.props.value + ""} />
                {this.state.error && this.state.error.length > 0 &&
                    <Text>{this.state.error}</Text>}
            </View>
        )
    }
}