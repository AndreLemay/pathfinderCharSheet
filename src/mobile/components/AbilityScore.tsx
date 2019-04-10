import * as React from "react"
import { AbilityScoreProps } from "../../shared/api/componentPropTypes";
import { View, Text } from "react-native";
import InputField from "./common/InputField";
import OutputField from "./common/OutputField";
import Styles from "../styles/Styles";

export default function AbilityScore(props: AbilityScoreProps) {
    return (
        <View style={[Styles.row]}>
            <View style={[Styles.col]}><Text>{props.label}</Text></View>
            <InputField 
                containerStyle={[Styles.col]}
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
                containerStyle={[Styles.col]}
                label="Additional"
                value={props.additional} />
            <OutputField
                containerStyle={[Styles.col]}
                label="Bonus"
                value={props.bonus} />
        </View>
    )
}