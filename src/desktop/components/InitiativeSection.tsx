import * as React from 'react'
import { InitiativeProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'

export default function InitiativeSection(props: InitiativeProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Initiative" />
			<OutputField
				className="col"
				label="Total"
				value={props.initiative}
				fieldType="number"
			/>
			<OutputField
				className="col"
				label="From DEX"
				value={props.dexBonus}
				fieldType="number"
			/>
			<OutputField
				className="col"
				label="Misc"
				value={props.miscBonus}
				fieldType="number"
			/>
		</div>
	)
}
