import * as React from "react"
import { connect } from "react-redux"
import SectionHeader from "../../desktop/components/common/SectionHeader";
import CharacterSheetState from "../store/types";
import IndividualSkillContainer from "./IndividualSkillContainer";

interface OwnProps {
    className?: string
}

interface StateProps {
    skills: number[]
}


type SkillsContainerProps = StateProps & OwnProps

class SkillsContainer extends React.Component<SkillsContainerProps> {
    render() {
        return (
            <div className={`skill-table ${this.props.className}`}>
                <SectionHeader label="Skills" />
                <div className="form-row align-items-end skill-table-head">
                    <div className="col-4"></div>
                    <div className="col"><label>Trained Only</label></div>
                    <div className="col"><label>Skill Bonus</label></div>
                    <div className="col"><label>Ability Bonus</label></div>
                    <div className="col"><label>Class Skill</label></div>
                    <div className="col"><label>Ranks</label></div>
                    <div className="col"><label>Misc</label></div>
                    <div className="col"><label>Armour Check Penalty</label></div>
                </div>
                <div className="skill-table-body">
                    {Object.keys(this.props.skills).map((skillOrd) => {
                        return (
                            <IndividualSkillContainer key={skillOrd} skillOrd={+skillOrd}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        skills: Object.keys(state.skills).map(val => +val)    
    }
}

export default connect(mapStateToProps)(SkillsContainer)