import * as React from "react"
import OutputField from "./common/OutputField";
import InputField from "./common/InputField";
import { SkillNameValue } from "../api/enums";

interface SkillProps {
    skill: SkillNameValue
    skillBonus: number
    abilityBonus: number
    isClassSkill: boolean
    ranks: number
    featBonus: number
    miscBonus: number
    armourPenalty: number
    rankChange: (ranks: number) => void
    classSkillChange: (classSkill: boolean) => void
}

export default function Skill(props: SkillProps) {
    function classSkillChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.classSkillChange(event.currentTarget.checked)
    }

    return (
        <div className="form-row align-items-end">
            <div className="col-4"><span>{props.skill.description}</span></div>
            <div className="col">
                {props.skill.trainedOnly &&
                    <input
                        className="form-control form-control-sm"
                        disabled
                        checked
                        type="checkbox" />
                }
            </div>
            <div className="col">
                <OutputField
                    inputType="number"
                    className="form-control form-control-sm"
                    value={props.skillBonus}
                />
            </div>
            <div className="col">
                <OutputField
                    inputType="number"
                    className="form-control form-control-sm"
                    value={props.abilityBonus}
                />
            </div>
            <div className="col">
                <input
                    type="checkbox"
                    className="form-control form-control-sm"
                    checked={props.isClassSkill}
                    onChange={classSkillChange} />
            </div>
            <div className="col">
                <InputField
                    inputType="number"
                    className="form-control form-control-sm"
                    value={props.ranks}
                    onValueChange={props.rankChange} />
            </div>
            <div className="col">
                <OutputField
                    inputType="number"
                    className="form-control form-control-sm"
                    value={props.featBonus}
                />
            </div>
            <div className="col">
                <OutputField
                    inputType="number"
                    className="form-control form-control-sm"
                    value={props.miscBonus}
                />
            </div>
            <div className="col">
                {props.skill.checkPenaltyApplies &&
                    <OutputField
                        inputType="number"
                        className="form-control form-control-sm"
                        value={props.armourPenalty}
                    />}
            </div>
        </div>
    )
}