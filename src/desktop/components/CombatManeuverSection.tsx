import * as React from 'react'
import { CombatManeuvreProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'

export default function CombatManeuverSection(props: CombatManeuvreProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Combat Manoeuvres" />
			<div className="form-row align-items-end">
				<OutputField
					label="CMB"
					className="col"
					fieldType="number"
					value={props.cmb}
				/>
				<OutputField
					label="STR"
					className="col"
					fieldType="number"
					value={props.strBonus}
				/>
				<OutputField
					label="BAB"
					className="col"
					fieldType="number"
					value={props.bab}
				/>
				<OutputField
					label="Size"
					className="col"
					fieldType="number"
					value={props.sizeMod}
				/>
				<OutputField
					label="Misc"
					className="col"
					fieldType="number"
					value={props.miscCMB}
				/>
				<div className="col" />
				<div className="col" />
				<div className="col" />
				<div className="col" />
			</div>
			<div className="form-row align-items-end">
				<OutputField
					label="CMD"
					className="col"
					fieldType="number"
					value={props.cmd}
				/>
				<OutputField label="Base" className="col" fieldType="number" value={10} />
				<OutputField
					label="STR"
					className="col"
					fieldType="number"
					value={props.strBonus}
				/>
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
					value={props.dodgeMod}
				/>
				<OutputField
					label="Deflection"
					className="col"
					fieldType="number"
					value={props.deflectionMod}
				/>
				<OutputField
					label="BAB"
					className="col"
					fieldType="number"
					value={props.bab}
				/>
				<OutputField
					label="Size"
					className="col"
					fieldType="number"
					value={props.sizeMod}
				/>
				<OutputField
					label="Misc"
					className="col"
					fieldType="number"
					value={props.miscCMD}
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
				<OutputField
					label="STR"
					className="col"
					fieldType="number"
					value={props.strBonus}
				/>
				<div className="col" />
				<div className="col" />
				<OutputField
					label="Deflection"
					className="col"
					fieldType="number"
					value={props.deflectionMod}
				/>
				<OutputField
					label="BAB"
					className="col"
					fieldType="number"
					value={props.bab}
				/>
				<OutputField
					label="Size"
					className="col"
					fieldType="number"
					value={props.sizeMod}
				/>
				<OutputField
					label="Misc"
					className="col"
					fieldType="number"
					value={props.miscCMD}
				/>
			</div>
		</div>
	)
}
