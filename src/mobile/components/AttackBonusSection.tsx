import * as React from 'react'
import { AttackBonusProps } from '../../shared/api/componentPropTypes'
import Styles from '../styles/Styles'
import { View } from 'react-native'
import SectionHeader from './common/SectionHeader'
import InputField from './common/InputField'
import OutputField from './common/OutputField'

export default function AttackBonusSection(props: AttackBonusProps) {
	return (
		<View style={[Styles.container]}>
			<SectionHeader label="Attack Bonus" />
			<View style={[Styles.row]}>
				<InputField
					label="Base"
					containerStyle={[Styles.col]}
					inputType="number"
					value={props.base}
					onValueChange={props.baseChange}
				/>
				<OutputField
					label="Misc"
					containerStyle={[Styles.col]}
					value={props.miscBonus}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					label="Melee"
					containerStyle={[Styles.col]}
					value={props.meleeBonus}
				/>
				<OutputField
					label="Ranged"
					containerStyle={[Styles.col]}
					value={props.rangedBonus}
				/>
			</View>
		</View>
	)
}
