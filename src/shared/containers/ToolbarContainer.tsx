import * as React from 'react'
import { connect } from 'react-redux'
import {
	loadCharacter,
	addAttack,
	addFeat,
	addEquip
} from '../store/actions/toolbarActions'
import CharacterSheetState, {
	EquipmentState,
	ValueBonus,
	FeatState,
	AttackState
} from '../store/types'
import {
	AttackInfoBundle,
	ToolbarProps,
	EquipInfoBundle,
	FeatInfoBundle
} from '../api/componentPropTypes'
import { EnumValue } from 'ts-enums'
import { StatTypeValue } from '../api/Enums'
import uuid = require('uuid')

interface OwnProps {
	openFeatModal: (
		onSave: (state: FeatInfoBundle) => void,
		feat?: FeatInfoBundle
	) => void
	openEquipModal: (
		onSave: (state: EquipInfoBundle) => void,
		equip?: EquipInfoBundle
	) => void
	openAttackModal: (
		onSave: (state: AttackInfoBundle) => void,
		attack?: AttackInfoBundle
	) => void
	toolbarComponent: React.ComponentClass<ToolbarProps>
}

interface StateProps {
	state: CharacterSheetState
}

interface DispatchProps {
	load: (data: any) => void
	addFeat: (feat: FeatState) => void
	addEquip: (equip: EquipmentState) => void
	addAttack: (attack: AttackState, equip: EquipmentState) => void
}

type ToolbarContainerProps = OwnProps & StateProps & DispatchProps

class ToolbarContainer extends React.Component<ToolbarContainerProps> {
	render() {
		return React.createElement(this.props.toolbarComponent, {
			defaultSaveName: this.defaultSaveName,
			getSaveFile: this.stateAsSav,
			load: this.props.load,
			addAttack: this.onAddAttackClicked,
			addEquip: this.onAddEquipClicked,
			addFeat: this.onAddFeatClicked
		})
	}
	private readonly stateAsSav = (): any => {
		let copyProps = (obj: any): any => {
			let newObj: any = {}
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
				switch (typeof obj[key]) {
					default:
						newObj[key] = obj[key]
						break
					case 'object':
						if (obj[key] instanceof EnumValue) {
							newObj[key] = (obj[key] as EnumValue).ordinal
						} else if (obj[key] instanceof Array) {
							newObj[key] = (obj[key] as any[]).map(item => copyProps(item))
						} else {
							newObj[key] = copyProps(obj[key])
						}
						break
				}
			}
			}

			if (obj instanceof ValueBonus) {
				newObj.affectedType =
					obj.affected instanceof StatTypeValue ? 'stat' : 'skill'
			}

			return newObj
		}

		let state = this.props.state

		return copyProps(state)
	}

	private readonly onAddFeatClicked = () => {
		this.props.openFeatModal(this.addFeat)
	}

	private readonly onAddEquipClicked = () => {
		this.props.openEquipModal(this.addEquipment)
	}

	private readonly onAddAttackClicked = () => {
		this.props.openAttackModal(this.addAttack)
	}

	private readonly addEquipment = (bundle: EquipInfoBundle) => {
		this.props.addEquip({
			uuid: uuid.v4(),
			...bundle
		})
	}

	private readonly addFeat = (bundle: FeatInfoBundle) => {
		this.props.addFeat({
			uuid: uuid.v4(),
			...bundle,
			active: true
		})
	}

	private readonly addAttack = (bundle: AttackInfoBundle) => {
		let {
			name,
			description,
			bonuses,
			range,
			type,
			dmgDieCount,
			dmgDie,
			critRange,
			critMultiplier,
			toHitBonusAbility,
			dmgBonusAbility
		} = bundle
		let equip: EquipmentState = {
			uuid: uuid.v4(),
			name,
			description,
			bonuses
		}
		let attack: AttackState = {
			uuid: uuid.v4(),
			name,
			description,
			range,
			type,
			dmgDieCount,
			dmgDie,
			critRange,
			critMultiplier,
			toHitBonusAbility,
			dmgBonusAbility,
			equipId: equip.uuid
		}
		this.props.addAttack(attack, equip)
	}

	private readonly defaultSaveName = () => this.props.state.character.name
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		state
	}
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		load: data => dispatch(loadCharacter(data)),
		addAttack: (attack, equip) => dispatch(addAttack(attack, equip)),
		addFeat: feat => dispatch(addFeat(feat)),
		addEquip: equip => dispatch(addEquip(equip))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToolbarContainer)
