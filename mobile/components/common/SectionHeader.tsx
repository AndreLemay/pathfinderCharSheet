import * as React from "react"
import { SectionHeaderProps } from "../../../shared/api/componentPropTypes";
import { View, Text } from "react-native";

export default function SectionHeader(props: SectionHeaderProps) {
    return (
        <View>
            <Text>{props.label}</Text>
        </View>
    )
}