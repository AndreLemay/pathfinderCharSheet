import * as React from 'react'
import { CharacterProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import DropdownField from './common/DropdownField'
import { Alignment, Gender, Size } from '../../shared/api/enums'

export default function CharacterSection(props: CharacterProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Character" />
			<InputField
				label="Name"
				className="col-4"
				value={props.name}
				onValueChange={props.nameChange}
			/>
			<DropdownField
				label="Alignment"
				className="col-4"
				dropdownType={Alignment}
				value={props.alignment}
				onValueChange={props.alignmentChange}
			/>
			<DropdownField
				label="Gender"
				className="col-4"
				dropdownType={Gender}
				value={props.gender}
				onValueChange={props.genderChange}
			/>
			<InputField
				label="Race"
				className="col-6"
				value={props.race}
				onValueChange={props.raceChange}
			/>
			<DropdownField
				label="Size"
				className="col-6"
				dropdownType={Size}
				value={props.size}
				onValueChange={props.sizeChange}
			/>
		</div>
	)
}
