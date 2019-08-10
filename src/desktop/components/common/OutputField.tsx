import * as React from 'react'

interface OutputProps {
	className?: string
	label?: string
	fieldType?: 'text' | 'number' | 'textarea'
	value: string | number
}

export default function OutputField(props: OutputProps) {
	return (
		<div className={`form-group ${props.className || ''}`}>
			{props.label && props.label.length > 0 && <label>{props.label}</label>}
			{props.fieldType !== 'textarea' ? (
				<input
					tabIndex={-1}
					className="form-control form-control-sm form-control-plaintext"
					type={props.fieldType || 'text'}
					value={props.value}
					readOnly={true}
				/>
			) : (
				<textarea
					className="form-control form-control-sm"
					readOnly={true}
					value={props.value}
				/>
			)}
		</div>
	)
}
