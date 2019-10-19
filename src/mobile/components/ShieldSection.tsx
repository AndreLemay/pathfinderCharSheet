import * as React from 'react'
import { ShieldProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import { View } from 'react-native'
import Styles from '../styles/Styles'

export default function ShieldSection(props: ShieldProps) {
	return (
		<View>
			<SectionHeader label="Shield" />
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
