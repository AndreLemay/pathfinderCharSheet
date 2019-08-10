import * as React from 'react'
import OutputField from './common/OutputField'
import InputField from './common/InputField'
import { SkillProps } from '../../shared/api/componentPropTypes'

export default function Skill(props: SkillProps) {
	function classSkillChange(event: React.ChangeEvent<HTMLInputElement>) {
		props.classSkillChange(event.currentTarget.checked)
	}

	return (
		<div className="form-row align-items-center">
			<div className="col-4">
				<span>{props.skill.description}</span>
			</div>
			<div className="col">
				{props.skill.trainedOnly && (
					<input
						className="form-control form-control-sm"
						disabled={true}
						checked={true}
						type="checkbox"
					/>
				)}
			</div>
			<div className="col">
				<OutputField fieldType="number" value={props.skillBonus} />
			</div>
			<div className="col">
				<OutputField fieldType="number" value={props.abilityBonus} />
			</div>
			<div className="col">
				<input
					type="checkbox"
					className="form-control form-control-sm"
					checked={props.isClassSkill}
					onChange={classSkillChange}
				/>
			</div>
			<div className="col">
				<InputField
					inputType="number"
					min={0}
					value={props.ranks}
					onValueChange={props.rankChange}
				/>
			</div>
			<div className="col">
				<OutputField fieldType="number" value={props.miscBonus} />
			</div>
			<div className="col">
				{props.skill.checkPenaltyApplies && (
					<OutputField fieldType="number" value={props.armourPenalty} />
				)}
			</div>
		</div>
	)
}
