import * as React from 'react'
import { ValueBonus } from '../../shared/store/types'

interface EquipmentProps {
	className?: string
	name: string
	description: string
	bonuses: ValueBonus[]
	onEdit: () => void
	onDelete: () => void
}

export default function Equipment(props: EquipmentProps) {
	return (
		<div className={`equipment-item ${props.className}`}>
			<div className="row">
				<div className="col-10 pr-0">
					<div className="form-row align-items-center">
						<div className="col-12">
							<div className="form-group row">
								<div className="col-2">
									<label>Name</label>
								</div>
								<div className="col-10">
									<input
										type="text"
										className="form-control form-control-sm"
										readOnly={true}
										value={props.name}
									/>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="form-group row">
								<div className="col-2">
									<label>Properties</label>
								</div>
								<div className="col-10">
									<textarea
										className="form-control form-control-sm"
										readOnly={true}
										value={
											props.bonuses
												.map(bonus => {
													return bonus.asString(true)
												})
												.join(' ') +
											(props.bonuses.length > 0 ? '\n' : '') +
											props.description
										}
									/>
								</div>
							</div>
						</div>
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
