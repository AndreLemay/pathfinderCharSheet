import * as React from "react"
import { connect } from "react-redux"
import { SkillName } from "../api/enums";
import Skill from "../components/Skill";
import CharacterSheetState from "../store/types";
import { makeGetSkillBonus, makeGetSkillAbilityBonus } from "../store/selectors/skillSelectors";
import { classSkillUpdate, ranksUpdate } from "../store/actions/skillActions";

export interface OwnProps {
    skillOrd: number
}

interface StateProps {
    skillBonus: number,
    abilityBonus: number,
    isClassSkill: boolean,
    ranks: number,
    featBonus: number,
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
                featBonus={this.props.featBonus}
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
    const mapStateToProps = (state: CharacterSheetState, props: OwnProps): StateProps => {
        return {
            skillBonus: getSkillBonus(props, state),
            abilityBonus: getAbilityBonus(props, state),
            isClassSkill: state.skills[props.skillOrd].isClassSkill,
            ranks: state.skills[props.skillOrd].ranks,
            featBonus: state.skills[props.skillOrd].featBonus,
            miscBonus: state.skills[props.skillOrd].miscBonus,
            armourPenalty: state.skills[props.skillOrd]. armourPenalty
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