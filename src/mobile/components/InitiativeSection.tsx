import * as React from 'react'
import { InitiativeProps } from '../../shared/api/componentPropTypes'
import { View } from 'react-native'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'
import Styles from '../styles/Styles'

export default function InitiativeSection(props: InitiativeProps) {
	return (
		<View style={{}}>
			<SectionHeader label="Initiative" />
			<View style={[Styles.row]}>
				<OutputField
					containerStyle={[Styles.col]}
					label="Initiative"
					value={props.initiative}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="From DEX"
					value={props.dexBonus}
				/>
				<OutputField
					containerStyle={[Styles.col]}
					label="Misc."
					value={props.miscBonus}
				/>
			</View>
		</View>
	)
}
