import * as React from 'react'
import { AttackBonusProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import OutputField from './common/OutputField'

export default function AttackBonusSection(props: AttackBonusProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Attack Bonus" />
			<div className="form-row">
				<InputField
					label="Base"
					inputType="number"
					className="col"
					min={0}
					value={props.base}
					onValueChange={props.baseChange}
				/>
				<OutputField
					label="Misc"
					fieldType="number"
					className="col"
					value={props.miscBonus}
				/>
			</div>
			<div className="form-row">
				<OutputField
					label="Melee"
					fieldType="number"
					className="col"
					value={props.meleeBonus}
				/>
				<OutputField
					label="Ranged"
					fieldType="number"
					className="col"
					value={props.rangedBonus}
				/>
			</div>
		</div>
	)
}
