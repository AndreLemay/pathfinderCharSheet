import * as React from 'react'
import { ShieldProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'

export default function ShieldSection(props: ShieldProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Shield" />
			<div className="form-row align-items-end">
				<InputField
					label="Name"
					className="col-12"
					value={props.name}
					onValueChange={props.nameChange}
				/>

				<InputField
					inputType="textarea"
					className="col"
					value={props.description}
					onValueChange={props.descriptionChange}
				/>
			</div>
			<div className="form-row align-items-end">
				<InputField
					label="Check Penalty"
					className="col"
					inputType="number"
					value={props.checkPenalty}
					onValueChange={props.checkPenaltyChange}
				/>
				<InputField
					label="AC Bonus"
					className="col"
					inputType="number"
					value={props.ac}
					onValueChange={props.acChange}
				/>
			</div>
		</div>
	)
}
