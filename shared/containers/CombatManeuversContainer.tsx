import * as React from "react"
import { connect } from "react-redux"
import SectionHeader from "../../desktop/components/common/SectionHeader";
import OutputField from "../../desktop/components/common/OutputField";
import CharacterSheetState from "../store/types";
import { getCMB, getCMD, getFlatFooted, getMiscCMB, getMiscCMD } from "../store/selectors/combatManeuverSelectors";
import { getStrengthBonus, getDexterityBonus } from "../store/selectors/abilityScoreSelectors";
import { getDodgeMod, getDeflectionMod, getSizeMod } from "../store/selectors/armourClassSelectors";
import { CombatManeuvreProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    combatManeuverComponent: React.ComponentClass<CombatManeuvreProps>
}

interface StateProps {
    cmb: number,
    cmd: number,
    flatFooted: number,
    strBonus: number,
    dexBonus: number,
    bab: number,
    dodgeMod: number,
    deflectionMod: number
    sizeMod: number,
    miscCMB: number,
    miscCMD: number
}

type CombatManeuversContainerProps = StateProps & OwnProps

class CombatManeuversContainer extends React.Component<CombatManeuversContainerProps> {
    render() {
        return React.createElement(this.props.combatManeuverComponent, {
            className: this.props.className,
            cmb: this.props.cmb,
            cmd: this.props.cmd,
            flatFooted: this.props.flatFooted,
            strBonus: this.props.strBonus,
            dexBonus: this.props.dexBonus,
            bab: this.props.bab,
            dodgeMod: this.props.dodgeMod,
            deflectionMod: this.props.deflectionMod,
            sizeMod: this.props.sizeMod,
            miscCMB: this.props.miscCMB,
            miscCMD: this.props.miscCMD
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        cmb: getCMB(state),
        cmd: getCMD(state),
        flatFooted: getFlatFooted(state),
        strBonus: getStrengthBonus(state),
        dexBonus: getDexterityBonus(state),
        dodgeMod: getDodgeMod(state),
        deflectionMod: getDeflectionMod(state),
        bab: state.baseAttack.base,
        sizeMod: getSizeMod(state),
        miscCMB: getMiscCMB(state),
        miscCMD: getMiscCMD(state)
    }
}

export default connect(mapStateToProps)(CombatManeuversContainer)