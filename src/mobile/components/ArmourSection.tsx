import * as React from 'react'
import { ArmourProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import DropdownField from './common/DropdownField'
import { ArmourType } from '../../shared/api/enums'
import Styles from '../styles/Styles'
import { View } from 'react-native'

export default function ArmourSection(props: ArmourProps) {
	return (
		<View>
			<SectionHeader label="Armour" />
			<View style={[Styles.row]}>
				<InputField
					containerStyle={[Styles.col]}
					label="Name"
					value={props.name}
					onValueChange={props.nameChange}
				/>
				<InputField
					containerStyle={[Styles.col]}
					inputType="textarea"
					value={props.description}
					onValueChange={props.descriptionChange}
				/>
			</View>
			<View style={[Styles.row]}>
				<DropdownField
					containerStyle={[Styles.col]}
					label="Type"
					dropdownType={ArmourType}
					value={props.type}
					onValueChange={props.typeChange}
				/>
				<InputField
					containerStyle={[Styles.col]}
					label="Max Speed"
					inputType="number"
					value={props.maxSpeed}
					onValueChange={props.maxSpeedChange}
				/>
				<InputField
					containerStyle={[Styles.col]}
					label="Max DEX"
					inputType="number"
					value={props.maxDex}
					onValueChange={props.maxDexChange}
				/>
			</View>
			<View style={[Styles.row]}>
				<InputField
					containerStyle={[Styles.col]}
					label="Check Penalty"
					inputType="number"
					value={props.checkPenalty}
					onValueChange={props.checkPenaltyChange}
				/>
				<InputField
					containerStyle={[Styles.col]}
					label="AC Bonus"
					inputType="number"
					value={props.ac}
					onValueChange={props.acChange}
				/>
			</View>
		</View>
	)
}
