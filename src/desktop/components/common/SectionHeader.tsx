import * as React from 'react'
import { SectionHeaderProps } from '../../../shared/api/componentPropTypes'

export default function SectionHeader(props: SectionHeaderProps) {
	return (
		<div className={'section-head'}>
			<label>{props.label}</label>
		</div>
	)
}
