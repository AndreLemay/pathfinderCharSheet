import * as React from "react"
import { connect } from "react-redux"
import SectionHeader from "../components/common/SectionHeader";
import OutputField from "../components/common/OutputField";
import CharacterSheetState from "../store/types";
import { getCMB, getCMD, getFlatFooted, getMiscCMB, getMiscCMD } from "../store/selectors/combatManeuverSelectors";
import { getStrengthBonus, getDexterityBonus } from "../store/selectors/abilityScoreSelectors";
import { getDodgeMod, getDeflectionMod, getSizeMod } from "../store/selectors/armourClassSelectors";

interface OwnProps {
    className?: string
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
        return (
            <div className={this.props.className}>
                <SectionHeader label="Combat Manoeuvres" />
                <div className="form-row align-items-end">
                    <OutputField label="CMB"
                        className="col"
                        inputType="number"
                        value={this.props.cmb}
                    />
                    <OutputField label="STR"
                        className="col"
                        inputType="number"
                        value={this.props.strBonus}
                    />
                    <OutputField label="BAB"
                        className="col"
                        inputType="number"
                        value={this.props.bab}
                    />
                    <OutputField label="Size"
                        className="col"
                        inputType="number"
                        value={this.props.sizeMod}
                    />
                    <OutputField label="Misc"
                        className="col"
                        inputType="number"
                        value={this.props.miscCMB}
                    />
                    <div className="col" />
                    <div className="col" />
                    <div className="col" />
                    <div className="col" />
                </div>
                <div className="form-row align-items-end">
                    <OutputField label="CMD"
                        className="col"
                        inputType="number"
                        value={this.props.cmd}
                    />
                    <OutputField label="Base"
                        className="col"
                        inputType="number"
                        value={10} />
                    <OutputField label="STR"
                        className="col"
                        inputType="number"
                        value={this.props.strBonus}
                    />
                    <OutputField label="DEX"
                        className="col"
                        inputType="number"
                        value={this.props.dexBonus}
                    />
                    <OutputField label="Dodge"
                        className="col"
                        inputType="number"
                        value={this.props.dodgeMod}
                    />
                    <OutputField label="Deflection"
                        className="col"
                        inputType="number"
                        value={this.props.deflectionMod}
                    />
                    <OutputField label="BAB"
                        className="col"
                        inputType="number"
                        value={this.props.bab}
                    />
                    <OutputField label="Size"
                        className="col"
                        inputType="number"
                        value={this.props.sizeMod}
                    />
                    <OutputField label="Misc"
                        className="col"
                        inputType="number"
                        value={this.props.miscCMD}
                    />
                </div>
                <div className="form-row align-items-end">
                    <OutputField label="Flat-Footed"
                        className="col"
                        inputType="number"
                        value={this.props.flatFooted}
                    />
                    <OutputField label="Base"
                        className="col"
                        inputType="number"
                        value={10} />
                    <OutputField label="STR"
                        className="col"
                        inputType="number"
                        value={this.props.strBonus}
                    />
                    <div className="col" />
                    <div className="col" />
                    <OutputField label="Deflection"
                        className="col"
                        inputType="number"
                        value={this.props.deflectionMod}
                    />
                    <OutputField label="BAB"
                        className="col"
                        inputType="number"
                        value={this.props.bab}
                    />
                    <OutputField label="Size"
                        className="col"
                        inputType="number"
                        value={this.props.sizeMod}
                    />
                    <OutputField label="Misc"
                        className="col"
                        inputType="number"
                        value={this.props.miscCMD}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): CombatManeuversContainerProps {
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