import * as React from 'react'
import { CharacterProps } from '../../shared/api/componentPropTypes'
import { View } from 'react-native'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import DropdownField from './common/DropdownField'
import { Alignment, Gender, Size } from '../../shared/api/enums'
import Styles from '../styles/Styles'

export default function CharacterSection(props: CharacterProps) {
	return (
		<View style={[Styles.container]}>
			<SectionHeader label="Character" />
			<InputField
				containerStyle={[Styles.col]}
				label="Name"
				value={props.name}
				onValueChange={props.nameChange}
			/>
			<DropdownField
				containerStyle={[Styles.col]}
				label="Alignment"
				value={props.alignment}
				onValueChange={props.alignmentChange}
				dropdownType={Alignment}
			/>
			<DropdownField
				containerStyle={[Styles.col]}
				label="Gender"
				value={props.gender}
				onValueChange={props.genderChange}
				dropdownType={Gender}
			/>
			<InputField
				containerStyle={[Styles.col]}
				label="Race"
				value={props.race}
				onValueChange={props.raceChange}
			/>
			<DropdownField
				containerStyle={[Styles.col]}
				label="Size"
				value={props.size}
				onValueChange={props.sizeChange}
				dropdownType={Size}
			/>
		</View>
	)
}
