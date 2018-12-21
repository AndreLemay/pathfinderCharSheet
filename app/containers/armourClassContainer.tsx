import * as React from "react"
import { connect } from "react-redux"
import SectionHeader from "../components/common/SectionHeader";
import OutputField from "../components/common/OutputField";
import CharacterSheetState from "../store/types";
import { getAC, getDodgeMod, getDeflectionMod, getArmourMod, getShieldMod, getNatMod, getSizeMod, getFlatFootedAC, getTouchAC } from "../store/selectors/armourClassSelectors";
import { getDexterityBonus } from "../store/selectors/abilityScoreSelectors";

interface OwnProps {
    className?: string
}

interface StateProps {
    ac: number
    flatFooted: number
    touch: number
    dexBonus: number
    dodgeBonus: number
    deflectionBonus: number
    armourBonus: number
    shieldBouns: number
    natBonus: number
    sizeBonus: number
}

type ArmourClassContainerProps = StateProps & OwnProps

class ArmourClassContainer extends React.Component<ArmourClassContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Armour Class" />
                <div className="form-row align-items-end">
                    <OutputField label="Armour Class"
                        className="col"
                        inputType="number"
                        value={this.props.ac}
                    />
                    <OutputField label="Base"
                        className="col"
                        inputType="number"
                        value={10} />
                    <OutputField label="DEX"
                        className="col"
                        inputType="number"
                        value={this.props.dexBonus}
                    />
                    <OutputField label="Dodge"
                        className="col"
                        inputType="number"
                        value={this.props.dodgeBonus}
                    />
                    <OutputField label="Deflection"
                        className="col"
                        inputType="number"
                        value={this.props.deflectionBonus}
                    />
                    <OutputField label="Armour"
                        className="col"
                        inputType="number"
                        value={this.props.armourBonus}
                    />
                    <OutputField label="Shield"
                        className="col"
                        inputType="number"
                        value={this.props.shieldBouns}
                    />
                    <OutputField label="Natural"
                        className="col"
                        inputType="number"
                        value={this.props.natBonus}
                    />
                    <OutputField label="Size"
                        className="col"
                        inputType="number"
                        value={this.props.sizeBonus}
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
                    <div className="col" />
                    <div className="col" />
                    <OutputField label="Deflection"
                        className="col"
                        inputType="number"
                        value={this.props.deflectionBonus}
                    />
                    <OutputField label="Armour"
                        className="col"
                        inputType="number"
                        value={this.props.armourBonus}
                    />
                    <OutputField label="Shield"
                        className="col"
                        inputType="number"
                        value={this.props.shieldBouns}
                    />
                    <OutputField label="Natural"
                        className="col"
                        inputType="number"
                        value={this.props.natBonus}
                    />
                    <OutputField label="Size"
                        className="col"
                        inputType="number"
                        value={this.props.sizeBonus}
                    />
                </div>
                <div className="form-row align-items-end">
                    <OutputField label="Touch"
                        className="col"
                        inputType="number"
                        value={this.props.touch}
                    />
                    <OutputField label="Base"
                        className="col"
                        inputType="number"
                        value={10} />
                    <OutputField label="DEX"
                        className="col"
                        inputType="number"
                        value={this.props.dexBonus}
                    />
                    <OutputField label="Dodge"
                        className="col"
                        inputType="number"
                        value={this.props.dodgeBonus}
                    />
                    <OutputField label="Deflection"
                        className="col"
                        inputType="number"
                        value={this.props.deflectionBonus}
                    />
                    <div className="col" />
                    <div className="col" />
                    <div className="col" />
                    <OutputField label="Size"
                        className="col"
                        inputType="number"
                        value={this.props.sizeBonus}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        ac: getAC(state),
        flatFooted: getFlatFootedAC(state),
        touch: getTouchAC(state),
        dexBonus: getDexterityBonus(state),
        dodgeBonus: getDodgeMod(state),
        deflectionBonus: getDeflectionMod(state),
        armourBonus: getArmourMod(state),
        shieldBouns: getShieldMod(state),
        natBonus: getNatMod(state),
        sizeBonus: getSizeMod(state)
    }
}

export default connect(mapStateToProps)(ArmourClassContainer)