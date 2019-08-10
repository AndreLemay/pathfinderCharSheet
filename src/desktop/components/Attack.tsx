import * as React from 'react'
import OutputField from './common/OutputField'

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
		<div className="attack-item">
			<div className="row">
				<div className="col-10 pr-0">
					<div className="form-row align-items-end">
						<OutputField label="Name" className="col-4" value={props.name} />
						<OutputField
							label="Properties"
							fieldType="textarea"
							className="col-8"
							value={props.description}
						/>
						<OutputField
							label="Range"
							className="col-2"
							fieldType="number"
							value={props.range}
						/>
						<OutputField
							label="Type"
							className="col-2 text-center"
							value={props.type}
						/>
						<OutputField
							label="To-Hit"
							className="col-2 text-center"
							value={props.toHit}
						/>
						<OutputField
							label="Damage"
							className="col-3 text-center"
							value={props.damage}
						/>
						<OutputField
							label="Critical"
							className="col-3 text-center"
							value={props.critical}
						/>
					</div>
				</div>
				<div className="col-2 btn-group-vertical">
					<button className="btn btn-secondary" onClick={props.onEdit}>
						<i className="fas fa-edit" />
					</button>
					<button className="btn btn-secondary" onClick={props.onDelete}>
						<i className="fas fa-trash" />
					</button>
				</div>
			</div>
		</div>
	)
}
