import * as React from 'react'
import { Input } from 'react-native-elements'

interface InputProps {
	label?: string
	style?: any[]
	labelStyle?: any[]
	containerStyle?: any[]
	inputType?: 'text' | 'number' | 'textarea'
	value: number | string
	onValueChange: (value: number | string) => void
	validator?: (val: string | number) => string // should return error string if needed
}

interface InputState {
	error: string
}

const defaultState: InputState = {
	'error': null
}

export default class InputField extends React.Component<
	InputProps,
	InputState
> {
	state = defaultState
	constructor(props: InputProps) {
		super(props)
	}

	change = (val: string) => {
		let typedVal = this.props.inputType === 'number' ? +val : val
		let err = this.props.validator(typedVal)
		this.setState({ 'error': err })
		this.props.onValueChange(typedVal)
	}

	render() {
		return (
			<Input
				inputStyle={[...(this.props.style || [])]}
				containerStyle={[...(this.props.containerStyle || [])]}
				labelStyle={[...(this.props.labelStyle || [])]}
				label={this.props.label}
				keyboardType={this.props.inputType === 'number' ? 'numeric' : 'default'}
				multiline={this.props.inputType === 'textarea'}
				numberOfLines={3}
				value={this.props.value as string}
				onChangeText={this.props.onValueChange}
				errorMessage={this.state.error}
			/>
		)
	}
}
