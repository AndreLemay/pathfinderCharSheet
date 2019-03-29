import * as React from "react"
import { CharacterProps } from "../../shared/api/componentPropTypes";
import { View } from "react-native";
import SectionHeader from "./common/SectionHeader";
import InputField from "./common/InputField";
import DropdownField from "./common/DropdownField"
import { Alignment, Gender, Size } from "../../shared/api/enums";

export default function CharacterSection(props: CharacterProps) {
    return (
        <View>
            <SectionHeader label="Character" />
            <View style={{
                flexDirection: "row"
            }}>
                <InputField
                    label="Name"
                    value={props.name}
                    onValueChange={props.nameChange} />
                <DropdownField
                    label="Alignment"
                    value={props.alignment}
                    onValueChange={props.alignmentChange}
                    dropdownType={Alignment} />
                <DropdownField
                    label="Gender"
                    value={props.gender}
                    onValueChange={props.genderChange}
                    dropdownType={Gender} />
                <InputField
                    label="Race"
                    value={props.race}
                    onValueChange={props.raceChange} />
                <DropdownField
                    label="Size"
                    value={props.size}
                    onValueChange={props.sizeChange}
                    dropdownType={Size} />
            </View>
        </View>
    )
}