import * as React from "react"
import { CombatManeuvreProps } from "../../shared/api/componentPropTypes";
import { View } from "react-native";
import Styles from "../styles/Styles";
import SectionHeader from "./common/SectionHeader";
import OutputField from "./common/OutputField";

export default function CombatManeuverSection(props: CombatManeuvreProps) {
    return (
        <View style={Styles.container}>
            <SectionHeader label="Combat Maneuvers" />
            <View style={[Styles.row]}>
                <OutputField label="CMB"
                    style={[Styles.row]}
                    value={props.cmb} />
                <OutputField label="STR"
                    style={[Styles.row]}
                    value={props.strBonus} />
                <OutputField label="BAB"
                    style={[Styles.row]}
                    value={props.bab} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Size"
                    style={[Styles.row]}
                    value={props.sizeMod} />
                <OutputField label="Misc"
                    style={[Styles.row]}
                    value={props.miscCMB} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="CMD"
                    style={[Styles.row]}
                    value={props.cmd} />
                <OutputField label="Base"
                    style={[Styles.row]}
                    value={10} />
                <OutputField label="STR"
                    style={[Styles.row]}
                    value={props.strBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="DEX"
                    style={[Styles.row]}
                    value={props.dexBonus} />
                <OutputField label="Dodge"
                    style={[Styles.row]}
                    value={props.dodgeMod} />
                <OutputField label="Deflection"
                    style={[Styles.row]}
                    value={props.deflectionMod} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="BAB"
                    style={[Styles.row]}
                    value={props.bab} />
                <OutputField label="Size"
                    style={[Styles.row]}
                    value={props.sizeMod} />
                <OutputField label="Misc"
                    style={[Styles.row]}
                    value={props.miscCMD} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Flat-Footed"
                    style={[Styles.row]}
                    value={props.flatFooted} />
                <OutputField label="Base"
                    style={[Styles.row]}
                    value={10} />
                <OutputField label="STR"
                    style={[Styles.row]}
                    value={props.strBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Deflection"
                    style={[Styles.row]}
                    value={props.deflectionMod} />
                <OutputField label="BAB"
                    style={[Styles.row]}
                    value={props.bab} />
                <OutputField label="Size"
                    style={[Styles.row]}
                    value={props.sizeMod} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Misc"
                    style={[Styles.row]}
                    value={props.miscCMD} />
            </View>
        </View>
    )
}