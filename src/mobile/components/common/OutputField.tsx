import * as React from 'react'
import { Input } from 'react-native-elements'
import Styles from '../../styles/Styles'

interface OutputProps {
	label?: string
	style?: any[]
	labelStyle?: any[]
	containerStyle?: any[]
	inputType?: 'text' | 'number' | 'textarea'
	value: number | string
}

export default function OutputField(props: OutputProps) {
	return (
		<Input
			inputStyle={[...(props.style || [])]}
			containerStyle={[...(props.containerStyle || [])]}
			labelStyle={[...(props.labelStyle || [])]}
			label={props.label}
			multiline={props.inputType === 'textarea'}
			numberOfLines={3}
			value={props.value as string}
		/>
	)
}
