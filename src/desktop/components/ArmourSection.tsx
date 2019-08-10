import * as React from 'react'
import { ArmourProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import DropdownField from './common/DropdownField'
import { ArmourType } from '../../shared/api/Enums'

export default function ArmourSection(props: ArmourProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Armour" />
			<div className="form-row align-items-end">
				<InputField
					label="Name"
					className="col-12"
					value={props.name}
					onValueChange={props.nameChange}
				/>
				<InputField
					className="col-12"
					inputType="textarea"
					value={props.description}
					onValueChange={props.descriptionChange}
				/>
			</div>
			<div className="form-row align-items-end">
				<DropdownField
					label="Type"
					className="col"
					dropdownType={ArmourType}
					value={props.type}
					onValueChange={props.typeChange}
				/>
				<InputField
					label="Max Speed"
					className="col"
					inputType="number"
					min={0}
					step={5}
					value={props.maxSpeed}
					onValueChange={props.maxSpeedChange}
				/>
				<InputField
					label="Max DEX"
					className="col"
					inputType="number"
					min={0}
					value={props.maxDex}
					onValueChange={props.maxDexChange}
				/>
			</div>
			<div className="form-row align-items-end">
				<InputField
					label="Check Penalty"
					className="col"
					inputType="number"
					max={0}
					value={props.checkPenalty}
					onValueChange={props.checkPenaltyChange}
				/>
				<InputField
					label="AC Bonus"
					className="col"
					inputType="number"
					min={0}
					value={props.ac}
					onValueChange={props.acChange}
				/>
			</div>
		</div>
	)
}
