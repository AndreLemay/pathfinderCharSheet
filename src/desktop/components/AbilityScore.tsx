import * as React from 'react'
import InputField from './common/InputField'
import OutputField from './common/OutputField'
import { AbilityScoreProps } from '../../shared/api/componentPropTypes'

export default function AbilityScore(props: AbilityScoreProps) {
	return (
		<div className="form-row align-items-end">
			<div className="col-2 ability-title">
				<label>{props.label}</label>
			</div>
			<InputField
				label="Base"
				className="col"
				inputType="number"
				min={1}
				value={props.base}
				onValueChange={props.baseChange}
			/>
			<OutputField
				label="Additional"
				className="col"
				fieldType="number"
				value={props.additional}
			/>
			<OutputField
				label="Bonus"
				className="col"
				fieldType="number"
				value={props.bonus}
			/>
		</div>
	)
}
