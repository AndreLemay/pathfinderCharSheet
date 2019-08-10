import * as React from 'react'
import { SaveProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'
import InputField from './common/InputField'
import { View } from 'react-native'
import Styles from '../styles/Styles'

export default function SaveSection(props: SaveProps) {
	return (
		<View>
			<SectionHeader label="Saves" />
			<View style={[Styles.row]}>
				<OutputField
					containerStyle={[Styles.col]}
					label="Fortitude"
					inputType="number"
					value={props.fortSave}
				/>
				<InputField
					containerStyle={[Styles.col]}
					label="Base"
					inputType="number"
					value={props.baseFort}
					onValueChange={props.fortSaveChange}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="CON"
					inputType="number"
					value={props.conBonus}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="Misc"
					inputType="number"
					value={props.miscFort}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					containerStyle={[Styles.col]}
					label="Reflex"
					inputType="number"
					value={props.reflexSave}
				/>
				<InputField
					containerStyle={[Styles.col]}
					label="Base"
					inputType="number"
					value={props.baseReflex}
					onValueChange={props.reflexSaveChange}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="DEX"
					inputType="number"
					value={props.dexBonus}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="Misc"
					inputType="number"
					value={props.miscReflex}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					containerStyle={[Styles.col]}
					label="Will"
					inputType="number"
					value={props.willSave}
				/>
				<InputField
					containerStyle={[Styles.col]}
					label="Base"
					inputType="number"
					value={props.baseWill}
					onValueChange={props.willSaveChange}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="WIS"
					inputType="number"
					value={props.wisBonus}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="Misc"
					inputType="number"
					value={props.miscWill}
				/>
			</View>
		</View>
	)
}
