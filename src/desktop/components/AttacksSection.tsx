import * as React from 'react'
import { AttacksSectionProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import IndividualAttackContainer from '../../shared/containers/IndividualAttackContainer'
import Attack from './Attack'

export default function AttacksSection(props: AttacksSectionProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Attacks" />
			{props.attackAndEquipIds.map((ids, index) => {
				return (
					<IndividualAttackContainer
						key={index}
						attackUuid={ids[0]}
						equipUuid={ids[1]}
						openAttackModal={props.openAttackModal}
						attackComponent={Attack}
					/>
				)
			})}
		</div>
	)
}
