import * as React from 'react'
import { SectionHeaderProps } from '../../../shared/api/componentPropTypes'
import { View, Text } from 'react-native'
import Styles from '../../styles/Styles'

export default function SectionHeader(props: SectionHeaderProps) {
	return (
		<View style={[Styles.row, Styles.sectionHeader]}>
			<Text>{props.label}</Text>
		</View>
	)
}
