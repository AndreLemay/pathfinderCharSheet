import * as React from "react"
import { AbilityScoreProps } from "../../shared/api/componentPropTypes";
import { View, Text } from "react-native";
import InputField from "./common/InputField";
import OutputField from "./common/OutputField";

export default function AbilityScore(props: AbilityScoreProps) {
    return (
        <View style={{
            flexDirection: "row"
        }}>
            <View><Text>{props.label}</Text></View>
            <InputField 
                label="Base"
                inputType="number"
                value={props.base}
                onValueChange={props.baseChange}
                validator={(val: number) => {
                    if (val < 1)
                        return "Ability score cannot be less than 1"

                    return null;
                }} />
            <OutputField
                label="Additional"
                value={props.additional} />
            <OutputField
                label="Bonus"
                value={props.bonus} />
        </View>
    )
}