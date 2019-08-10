import * as React from 'react'
import { SaveProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'
import InputField from './common/InputField'

export default function SaveSection(props: SaveProps) {
	return (
		<div className={props.className}>
			<SectionHeader label="Saves" />
			<div className="form-row">
				<OutputField
					label="Fortitude"
					fieldType="number"
					className="col"
					value={props.fortSave}
				/>
				<InputField
					label="Base"
					inputType="number"
					className="col"
					min={0}
					value={props.baseFort}
					onValueChange={props.fortSaveChange}
				/>
				<OutputField
					label="CON"
					fieldType="number"
					className="col"
					value={props.conBonus}
				/>
				<OutputField
					label="Misc"
					fieldType="number"
					className="col"
					value={props.miscFort}
				/>
			</div>
			<div className="form-row">
				<OutputField
					label="Reflex"
					fieldType="number"
					className="col"
					value={props.reflexSave}
				/>
				<InputField
					label="Base"
					inputType="number"
					className="col"
					min={0}
					value={props.baseReflex}
					onValueChange={props.reflexSaveChange}
				/>
				<OutputField
					label="DEX"
					fieldType="number"
					className="col"
					value={props.dexBonus}
				/>
				<OutputField
					label="Misc"
					fieldType="number"
					className="col"
					value={props.miscReflex}
				/>
			</div>
			<div className="form-row">
				<OutputField
					label="Will"
					fieldType="number"
					className="col"
					value={props.willSave}
				/>
				<InputField
					label="Base"
					inputType="number"
					className="col"
					min={0}
					value={props.baseWill}
					onValueChange={props.willSaveChange}
				/>
				<OutputField
					label="WIS"
					fieldType="number"
					className="col"
					value={props.wisBonus}
				/>
				<OutputField
					label="Misc"
					fieldType="number"
					className="col"
					value={props.miscWill}
				/>
			</div>
		</div>
	)
}
