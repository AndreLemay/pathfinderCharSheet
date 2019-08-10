import * as React from 'react'
import { ArmourClassProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'

export default function ArmourClassSection(props: ArmourClassProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Armour Class" />
			<div className="form-row align-items-end">
				<OutputField
					label="Armour Class"
					className="col"
					fieldType="number"
					value={props.ac}
				/>
				<OutputField label="Base" className="col" fieldType="number" value={10} />
				<OutputField
					label="DEX"
					className="col"
					fieldType="number"
					value={props.dexBonus}
				/>
				<OutputField
					label="Dodge"
					className="col"
					fieldType="number"
					value={props.dodgeBonus}
				/>
				<OutputField
					label="Deflection"
					className="col"
					fieldType="number"
					value={props.deflectionBonus}
				/>
				<OutputField
					label="Armour"
					className="col"
					fieldType="number"
					value={props.armourBonus}
				/>
				<OutputField
					label="Shield"
					className="col"
					fieldType="number"
					value={props.shieldBonus}
				/>
				<OutputField
					label="Natural"
					className="col"
					fieldType="number"
					value={props.natBonus}
				/>
				<OutputField
					label="Size"
					className="col"
					fieldType="number"
					value={props.sizeBonus}
				/>
			</div>
			<div className="form-row align-items-end">
				<OutputField
					label="Flat-Footed"
					className="col"
					fieldType="number"
					value={props.flatFooted}
				/>
				<OutputField label="Base" className="col" fieldType="number" value={10} />
				<div className="col" />
				<div className="col" />
				<OutputField
					label="Deflection"
					className="col"
					fieldType="number"
					value={props.deflectionBonus}
				/>
				<OutputField
					label="Armour"
					className="col"
					fieldType="number"
					value={props.armourBonus}
				/>
				<OutputField
					label="Shield"
					className="col"
					fieldType="number"
					value={props.shieldBonus}
				/>
				<OutputField
					label="Natural"
					className="col"
					fieldType="number"
					value={props.natBonus}
				/>
				<OutputField
					label="Size"
					className="col"
					fieldType="number"
					value={props.sizeBonus}
				/>
			</div>
			<div className="form-row align-items-end">
				<OutputField
					label="Touch"
					className="col"
					fieldType="number"
					value={props.touch}
				/>
				<OutputField label="Base" className="col" fieldType="number" value={10} />
				<OutputField
					label="DEX"
					className="col"
					fieldType="number"
					value={props.dexBonus}
				/>
				<OutputField
					label="Dodge"
					className="col"
					fieldType="number"
					value={props.dodgeBonus}
				/>
				<OutputField
					label="Deflection"
					className="col"
					fieldType="number"
					value={props.deflectionBonus}
				/>
				<div className="col" />
				<div className="col" />
				<div className="col" />
				<OutputField
					label="Size"
					className="col"
					fieldType="number"
					value={props.sizeBonus}
				/>
			</div>
		</div>
	)
}
