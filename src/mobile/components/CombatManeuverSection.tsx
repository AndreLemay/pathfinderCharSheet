import * as React from "react"
import { CombatManeuvreProps } from "../../shared/api/componentPropTypes";
import { View } from "react-native";
import Styles from "../styles/Styles";
import SectionHeader from "./common/SectionHeader";
import OutputField from "./common/OutputField";

export default function CombatManeuverSection(props: CombatManeuvreProps) {
    return (
        <View>
            <SectionHeader label="Combat Maneuvers" />
            <View style={[Styles.row]}>
                <OutputField label="CMB"
                    containerStyle={[Styles.row]}
                    value={props.cmb} />
                <OutputField label="STR"
                    containerStyle={[Styles.row]}
                    value={props.strBonus} />
                <OutputField label="BAB"
                    containerStyle={[Styles.row]}
                    value={props.bab} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Size"
                    containerStyle={[Styles.row]}
                    value={props.sizeMod} />
                <OutputField label="Misc"
                    containerStyle={[Styles.row]}
                    value={props.miscCMB} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="CMD"
                    containerStyle={[Styles.row]}
                    value={props.cmd} />
                <OutputField label="Base"
                    containerStyle={[Styles.row]}
                    value={10} />
                <OutputField label="STR"
                    containerStyle={[Styles.row]}
                    value={props.strBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="DEX"
                    containerStyle={[Styles.row]}
                    value={props.dexBonus} />
                <OutputField label="Dodge"
                    containerStyle={[Styles.row]}
                    value={props.dodgeMod} />
                <OutputField label="Deflection"
                    containerStyle={[Styles.row]}
                    value={props.deflectionMod} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="BAB"
                    containerStyle={[Styles.row]}
                    value={props.bab} />
                <OutputField label="Size"
                    containerStyle={[Styles.row]}
                    value={props.sizeMod} />
                <OutputField label="Misc"
                    containerStyle={[Styles.row]}
                    value={props.miscCMD} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Flat-Footed"
                    containerStyle={[Styles.row]}
                    value={props.flatFooted} />
                <OutputField label="Base"
                    containerStyle={[Styles.row]}
                    value={10} />
                <OutputField label="STR"
                    containerStyle={[Styles.row]}
                    value={props.strBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Deflection"
                    containerStyle={[Styles.row]}
                    value={props.deflectionMod} />
                <OutputField label="BAB"
                    containerStyle={[Styles.row]}
                    value={props.bab} />
                <OutputField label="Size"
                    containerStyle={[Styles.row]}
                    value={props.sizeMod} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Misc"
                    containerStyle={[Styles.row]}
                    value={props.miscCMD} />
            </View>
        </View>
    )
}