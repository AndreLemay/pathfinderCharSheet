import * as React from 'react'
import { HealthProps } from '../../shared/api/componentPropTypes'
import { View } from 'react-native'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import Styles from '../styles/Styles'

export default function HealthSection(props: HealthProps) {
	return (
		<View style={[Styles.container]}>
			<SectionHeader label="Health" />
			<View style={[Styles.row]}>
				<InputField
					label="Current"
					containerStyle={[Styles.col]}
					inputType="number"
					value={props.current}
					onValueChange={props.currentChange}
				/>
				<InputField
					label="Max"
					containerStyle={[Styles.col]}
					inputType="number"
					value={props.max}
					onValueChange={props.maxChange}
				/>
			</View>
			<View style={[Styles.row]}>
				<InputField
					label="Temp"
					containerStyle={[Styles.col]}
					inputType="number"
					value={props.temp}
					onValueChange={props.tempChange}
				/>
				<InputField
					label="Non-Lethal"
					containerStyle={[Styles.col]}
					inputType="number"
					value={props.nonlethal}
					onValueChange={props.nonlethalChange}
				/>
			</View>
			<View style={[Styles.col]}>
				<InputField
					label="Damage Resistance"
					inputType="textarea"
					value={props.damageResistance}
					onValueChange={props.drChange}
				/>
				<InputField
					label="Energy Resistance"
					inputType="textarea"
					value={props.energyResistance}
					onValueChange={props.erChange}
				/>
			</View>
		</View>
	)
}
