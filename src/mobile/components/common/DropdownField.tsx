import * as React from 'react'
import { View, Text, Picker } from 'react-native'
import { Enum, EnumValue } from 'ts-enums'
import Styles from '../../styles/Styles'

interface DropdownProps {
	label?: string
	style?: any[]
	containerStyle?: any[]
	labelStyle?: any[]
	value: EnumValue
	dropdownType: Enum<EnumValue>
	onValueChange: (value: EnumValue) => void
}

export default function DropdownField(props: DropdownProps) {
	function onChange(value: number) {
		props.onValueChange(props.dropdownType.values[+value])
	}

	return (
		<View style={[...(props.containerStyle || []), { 'padding': '5%' }]}>
			{props.label && props.label.length > 0 && (
				<Text style={[...(props.labelStyle || [])]}>{props.label}</Text>
			)}
			<View style={[...(props.style || []), Styles.picker]}>
				<Picker
					style={{ 'width': '100%' }}
					selectedValue={props.value}
					onValueChange={onChange}>
					{props.dropdownType.values.map(x => (
						<Picker.Item key={x.ordinal} label={x.description} value={x.ordinal} />
					))}
				</Picker>
			</View>
		</View>
	)
}
