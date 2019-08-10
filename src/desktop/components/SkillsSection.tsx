import * as React from 'react'
import SectionHeader from './common/SectionHeader'
import IndividualSkillContainer from '../../shared/containers/IndividualSkillContainer'
import { SkillsSectionProps } from '../../shared/api/componentPropTypes'
import Skill from './Skill'

export default function SkillsSection(props: SkillsSectionProps) {
	return (
		<div className={`skill-table ${props.className}`}>
			<SectionHeader label="Skills" />
			<div className="form-row align-items-end skill-table-head">
				<div className="col-4"/>
				<div className="col">
					<label>Trained Only</label>
				</div>
				<div className="col">
					<label>Skill Bonus</label>
				</div>
				<div className="col">
					<label>Ability Bonus</label>
				</div>
				<div className="col">
					<label>Class Skill</label>
				</div>
				<div className="col">
					<label>Ranks</label>
				</div>
				<div className="col">
					<label>Misc</label>
				</div>
				<div className="col">
					<label>Armour Check Penalty</label>
				</div>
			</div>
			<div className="skill-table-body">
				{Object.keys(props.skills).map(skillOrd => {
					return (
						<IndividualSkillContainer
							key={skillOrd}
							skillOrd={+skillOrd}
							skillComponent={Skill}
						/>
					)
				})}
			</div>
		</div>
	)
}
