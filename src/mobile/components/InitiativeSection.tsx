import * as React from "react"
import { InitiativeProps } from "../../shared/api/componentPropTypes";
import { View } from "react-native";
import SectionHeader from "./common/SectionHeader";
import OutputField from "./common/OutputField";

export default function InitiativeSection(props: InitiativeProps) {
    return (
        <View>
            <SectionHeader label="Initiative" />
            <View style={{
                flexDirection: "row"
            }}>
                <OutputField
                    label="Initiative"
                    value={props.initiative} />
                <OutputField
                    label="From DEX"
                    value={props.dexBonus} />
                <OutputField
                    label="Misc."
                    value={props.miscBonus} />
            </View>
        </View>
    )
}