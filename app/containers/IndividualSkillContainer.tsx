import * as React from "react"
import { connect } from "react-redux"
import { SkillName } from "../api/enums";
import Skill from "../components/Skill";
import CharacterSheetState from "../store/types";
import { makeGetSkillBonus, makeGetSkillAbilityBonus, makeGetSkillMiscBonus } from "../store/selectors/skillSelectors";
import { classSkillUpdate, ranksUpdate } from "../store/actions/skillActions";
import { getArmourPenalty } from "../store/selectors/armourClassSelectors";

export interface OwnProps {
    skillOrd: number
}

interface StateProps {
    skillBonus: number,
    abilityBonus: number,
    isClassSkill: boolean,
    ranks: number,
    miscBonus: number,
    armourPenalty: number
}

interface DispatchProps {
    classSkillChange: (isClassSkill: boolean) => void
    ranksChange: (ranks: number) => void
}

type IndividualSkillContainerProps = StateProps & DispatchProps & OwnProps

class IndividualSkillContainer extends React.Component<IndividualSkillContainerProps> {
    render() {
        let skill = SkillName.values[this.props.skillOrd]
        return (
            <Skill key={this.props.skillOrd}
                skill={skill}
                skillBonus={this.props.skillBonus}
                abilityBonus={this.props.abilityBonus}
                isClassSkill={this.props.isClassSkill}
                ranks={this.props.ranks}
                miscBonus={this.props.miscBonus}
                armourPenalty={this.props.armourPenalty}
                rankChange={this.props.ranksChange}
                classSkillChange={this.props.classSkillChange} />
        )
    }
}

const makeMapStateToProps = (state: CharacterSheetState, props: OwnProps) => {
    const getSkillBonus = makeGetSkillBonus()
    const getAbilityBonus = makeGetSkillAbilityBonus()
    const getMiscBonus = makeGetSkillMiscBonus()
    const mapStateToProps = (state: CharacterSheetState, props: OwnProps): StateProps => {
        return {
            skillBonus: getSkillBonus(state, props),
            abilityBonus: getAbilityBonus(state, props),
            isClassSkill: state.skills[props.skillOrd].isClassSkill,
            ranks: state.skills[props.skillOrd].ranks,
            miscBonus: getMiscBonus(state, props),
            armourPenalty: getArmourPenalty(state)
        }
    }

    return mapStateToProps
}

const mapDispatchToProps = (dispatch, props: OwnProps): DispatchProps => {
    return {
        classSkillChange: classSkill => dispatch(classSkillUpdate(props, classSkill)),
        ranksChange: ranks => dispatch(ranksUpdate(props, ranks))
    }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(IndividualSkillContainer)