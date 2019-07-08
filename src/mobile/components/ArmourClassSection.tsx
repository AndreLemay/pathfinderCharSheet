import * as React from "react"
import { ArmourClassProps } from "../../shared/api/componentPropTypes";
import { View } from "react-native";
import Styles from "../styles/Styles";
import SectionHeader from "./common/SectionHeader";
import OutputField from "./common/OutputField";

export default function ArmourClassSection(props: ArmourClassProps) {
    return (
        <View style={[Styles.container]}>
            <SectionHeader label="Armour Class" />
            <View style={[Styles.row]}>
                <OutputField label="Total"
                    style={[Styles.col]}
                    value={props.ac} />
                <OutputField label="Base"
                    style={[Styles.col]}
                    value={10} />
                <OutputField label="DEX"
                    style={[Styles.col]}
                    value={props.dexBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Dodge"
                    style={[Styles.col]}
                    value={props.dodgeBonus} />
                <OutputField label="Deflection"
                    style={[Styles.col]}
                    value={props.deflectionBonus} />
                <OutputField label="Armour"
                    style={[Styles.col]}
                    value={props.armourBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Shield"
                    style={[Styles.col]}
                    value={props.shieldBonus} />
                <OutputField label="Natural"
                    style={[Styles.col]}
                    value={props.natBonus} />
                <OutputField label="Size"
                    style={[Styles.col]}
                    value={props.sizeBonus} />
            </View>
            <SectionHeader label="Flat-Footed" />
            <View style={[Styles.row]}>
                <OutputField label="Total"
                    style={[Styles.col]}
                    value={props.ac} />
                <OutputField label="Base"
                    style={[Styles.col]}
                    value={10} />
                <View style={[Styles.col]} />
            </View>
            <View style={[Styles.row]}>
                <View style={[Styles.col]} />
                <OutputField label="Deflection"
                    style={[Styles.col]}
                    value={props.deflectionBonus} />
                <OutputField label="Armour"
                    style={[Styles.col]}
                    value={props.armourBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Shield"
                    style={[Styles.col]}
                    value={props.shieldBonus} />
                <OutputField label="Natural"
                    style={[Styles.col]}
                    value={props.natBonus} />
                <OutputField label="Size"
                    style={[Styles.col]}
                    value={props.sizeBonus} />
            </View>
            <SectionHeader label="Touch" />
            <View style={[Styles.row]}>
                <OutputField label="Total"
                    style={[Styles.col]}
                    value={props.ac} />
                <OutputField label="Base"
                    style={[Styles.col]}
                    value={10} />
                <OutputField label="DEX"
                    style={[Styles.col]}
                    value={props.dexBonus} />
            </View>
            <View style={[Styles.row]}>
                <OutputField label="Dodge"
                    style={[Styles.col]}
                    value={props.dodgeBonus} />
                <OutputField label="Deflection"
                    style={[Styles.col]}
                    value={props.deflectionBonus} />
                <View style={[Styles.col]} />
            </View>
            <View style={[Styles.row]}>
                <View style={[Styles.col]} />
                <View style={[Styles.col]} />
                <OutputField label="Size"
                    style={[Styles.col]}
                    value={props.sizeBonus} />
            </View>
        </View>
    )
}