import * as React from 'react'
import { EquipmentSectionProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import IndividualEquipmentContainer from '../../shared/containers/IndividualEquipmentContainer'
import Equipment from './Equipment'

export default function EquipmentSection(props: EquipmentSectionProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Equipment" />
			{props.equipIds.map((id, index) => {
				return (
					<IndividualEquipmentContainer
						key={index}
						uuid={id}
						openEquipModal={props.openEquipModal}
						equipmentComponent={Equipment}
					/>
				)
			})}
		</div>
	)
}
