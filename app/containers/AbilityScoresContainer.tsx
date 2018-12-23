import * as React from "react"
import { connect } from "react-redux"
import AbilityScore from "../components/AbilityScore";
import CharacterSheetState from "../store/types";
import { strengthUpdate, dexterityUpdate, constitutionUpdate, intelligenceUpdate, wisdomUpdate, charismaUpdate } from "../store/actions/abilityScoreActions";
import SectionHeader from "../components/common/SectionHeader";
import { getStrengthBonus, getDexterityBonus, getConstitutionBonus, getIntelligenceBonus, getWisdomBonus, getCharismaBonus, getAdditionalStrength, getAdditionalDexterity, getAdditionalConstitution, getAdditionalIntelligence, getAdditionalWisdom, getAdditionalCharisma } from "../store/selectors/abilityScoreSelectors";

interface OwnProps {
    className?: string
}

interface StateProps {
    baseStr: number
    baseDex: number
    baseCon: number
    baseInt: number
    baseWis: number
    baseCha: number
    addStr: number
    addDex: number
    addCon: number
    addInt: number
    addWis: number
    addCha: number
    strBonus: number
    dexBonus: number
    conBonus: number
    intBonus: number
    wisBonus: number
    chaBonus: number
}

interface DispatchProps {
    strChange: (val: number) => void
    dexChange: (val: number) => void
    conChange: (val: number) => void
    intChange: (val: number) => void
    wisChange: (val: number) => void
    chaChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class StrengthContainer extends React.Component<AbilityScoresContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Ability Scores" />
                <AbilityScore
                    label="STR"
                    base={this.props.baseStr}
                    additional={this.props.addStr}
                    bonus={this.props.strBonus}
                    baseChange={this.props.strChange} />
                <AbilityScore
                    label="DEX"
                    base={this.props.baseDex}
                    additional={this.props.addDex}
                    bonus={this.props.dexBonus}
                    baseChange={this.props.dexChange} />
                <AbilityScore
                    label="CON"
                    base={this.props.baseCon}
                    additional={this.props.addCon}
                    bonus={this.props.conBonus}
                    baseChange={this.props.conChange} />
                <AbilityScore
                    label="INT"
                    base={this.props.baseInt}
                    additional={this.props.addInt}
                    bonus={this.props.intBonus}
                    baseChange={this.props.intChange} />
                <AbilityScore
                    label="WIS"
                    base={this.props.baseWis}
                    additional={this.props.addWis}
                    bonus={this.props.wisBonus}
                    baseChange={this.props.wisChange} />
                <AbilityScore
                    label="CHA"
                    base={this.props.baseCha}
                    additional={this.props.addCha}
                    bonus={this.props.chaBonus}
                    baseChange={this.props.chaChange} />
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        baseStr: state.abilities.strength.base,
        baseDex: state.abilities.dexterity.base,
        baseCon: state.abilities.constitution.base,
        baseInt: state.abilities.intelligence.base,
        baseWis: state.abilities.wisdom.base,
        baseCha: state.abilities.charisma.base,
        addStr: getAdditionalStrength(state),
        addDex: getAdditionalDexterity(state),
        addCon: getAdditionalConstitution(state),
        addInt: getAdditionalIntelligence(state),
        addWis: getAdditionalWisdom(state),
        addCha: getAdditionalCharisma(state),
        strBonus: getStrengthBonus(state),
        dexBonus: getDexterityBonus(state),
        conBonus: getConstitutionBonus(state),
        intBonus: getIntelligenceBonus(state),
        wisBonus: getWisdomBonus(state),
        chaBonus: getCharismaBonus(state)
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        strChange: base => dispatch(strengthUpdate(base)),
        dexChange: base => dispatch(dexterityUpdate(base)),
        conChange: base => dispatch(constitutionUpdate(base)),
        intChange: base => dispatch(intelligenceUpdate(base)),
        wisChange: base => dispatch(wisdomUpdate(base)),
        chaChange: base => dispatch(charismaUpdate(base))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StrengthContainer)