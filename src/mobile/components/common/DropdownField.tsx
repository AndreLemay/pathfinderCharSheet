import * as React from "react"
import { View, Text, Picker } from "react-native";
import { Enum, EnumValue } from "ts-enums";

interface DropdownProps {
    label?: string
    value: EnumValue
    dropdownType: Enum<EnumValue>
    onValueChange: (value: EnumValue) => void
}

export default function DropdownField(props: DropdownProps) {
    function onChange(value: number) {
        props.onValueChange(props.dropdownType.values[+value])
    }

    return (
        <View>
            {props.label && props.label.length > 0 &&
                <Text>{props.label}</Text>}
            <Picker
                selectedValue={props.value}
                onValueChange={onChange}>
                {props.dropdownType.values.map(x => 
                    <Picker.Item label={x.description} value={x.ordinal} />)}
            </Picker>
        </View>
    )
}