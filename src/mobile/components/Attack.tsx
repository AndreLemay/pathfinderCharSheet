import * as React from 'react'
import OutputField from './common/OutputField'
import { View } from 'react-native'
import Styles from '../styles/Styles'

interface AttackProps {
	name: string
	description: string
	range: number
	type: string
	toHit: string
	damage: string
	critical: string
	onEdit: () => void
	onDelete: () => void
}

export default function Attack(props: AttackProps) {
	return (
		<View>
			<View style={[Styles.row]}>
				<OutputField label="Name" value={props.name} />
				<OutputField
					label="Properties"
					inputType="textarea"
					value={props.description}
				/>
				<OutputField label="Range" value={props.range} />
				<OutputField label="Type" value={props.type} />
				<OutputField label="To-Hit" value={props.toHit} />
				<OutputField label="Damage" value={props.damage} />
				<OutputField label="Critical" value={props.critical} />
			</View>
		</View>
	)
}
