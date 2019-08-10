import * as React from 'react'
import * as $ from 'jquery'

interface InputProps {
	label?: string
	className?: string
	inputType?: 'text' | 'number' | 'textarea'
	value: number | string
	step?: number
	min?: number
	max?: number
	onValueChange: (value: number | string) => void
}

export default function InputField(props: InputProps) {
	function change(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		let valid = event.currentTarget.checkValidity()
		$(event.currentTarget).toggleClass('is-invalid', !valid)

		let val: number | string =
			props.inputType === 'number'
				? event.currentTarget.value !== ''
					? +event.currentTarget.value
					: null
				: event.currentTarget.value
		props.onValueChange(val)
	}

	return (
		<div className={`form-group ${props.className || ''}`}>
			{props.label && props.label.length > 0 && <label>{props.label}</label>}
			{props.inputType !== 'textarea' ? (
				<input
					className="form-control form-control-sm"
					type={props.inputType || 'text'}
					step={
						props.inputType === 'number' && props.step >= 0 ? props.step : undefined
					}
					min={
						props.inputType === 'number' && props.min >= 0 ? props.min : undefined
					}
					max={
						props.inputType === 'number' && props.max >= 0 ? props.max : undefined
					}
					value={props.value !== null ? props.value : ''}
					onChange={change}
				/>
			) : (
				<textarea
					className="form-control form-control-sm"
					onChange={change}
					value={props.value}
				/>
			)}
		</div>
	)
}
