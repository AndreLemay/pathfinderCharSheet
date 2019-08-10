import * as React from 'react'
import { FeatsSectionProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import IndividualFeatContainer from '../../shared/containers/IndividualFeatContainer'
import Feat from './Feat'

export default function FeatsSection(props: FeatsSectionProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Feats/Abilities" />
			{props.featIds.map((id, index) => {
				return (
					<IndividualFeatContainer
						key={index}
						uuid={id}
						openFeatModal={props.openFeatModal}
						featComponent={Feat}
					/>
				)
			})}
		</div>
	)
}
