import * as React from 'react'
import {
	ModalState,
	AttackInfoBundle
} from '../../shared/api/componentPropTypes'
import { Modal, Text, View, StyleProp, ViewStyle } from 'react-native'
import {
	DamageDie,
	AbilityType,
	BonusType,
	StatType,
	SkillName
} from '../../shared/api/enums'
import InputField from './common/InputField'
import Styles from '../styles/Styles'
import OutputField from './common/OutputField'
import { CheckBox } from 'react-native-elements'
import SectionHeader from './common/SectionHeader'

const defaultState: ModalState = {
	visible: false,
	name: '',
	description: '',
	range: 0,
	type: '',
	bonuses: [],
	dmgDieCount: 1,
	dmgDie: DamageDie['2'],
	critRange: 20,
	critMultiplier: 2,
	toHitBonusAbility: AbilityType.Strength,
	dmgBonusAbility: AbilityType.Strength,
	curStatBonusType: BonusType.Alchemical,
	curStatAffected: StatType.AllSaves,
	curStatBonusAmt: 0,
	curSkillBonusType: BonusType.Alchemical,
	curSkillAffected: SkillName.Acrobatics,
	curSkillBonusAmt: 0
}

interface AttackTypeInputProps {
	label: string
	value: string
	containerStyle?: StyleProp<ViewStyle>
	onValueChange: (val: string) => void
}

class AttackTypeInput extends React.Component<AttackTypeInputProps, any> {
	state = {
		bludgeoning: false,
		piercing: false,
		slashing: false
	}

	constructor(props: AttackTypeInputProps) {
		super(props)

		this.state.bludgeoning = props.value.indexOf('B') >= 0
		this.state.piercing = props.value.indexOf('P') >= 0
		this.state.slashing = props.value.indexOf('S') >= 0
	}

	getValue() {
		return `${this.state.bludgeoning ? 'B' : ''}${
			this.state.piercing ? 'P' : ''
		}${this.state.slashing ? 'S' : ''}`
	}

	render() {
		return (
			<View style={this.props.containerStyle}>
				<SectionHeader label={this.props.label} />
				<View style={[Styles.row]}>
					<CheckBox
						containerStyle={[Styles.col]}
						title="Bludgeoning"
						checked={this.state.bludgeoning}
						onPress={() => {
							this.setState(
								prevState => {
									return { bludgeoning: !prevState.bludgeoning }
								},
								() => {
									this.props.onValueChange(this.getValue())
								}
							)
						}}
					/>
					<CheckBox
						containerStyle={[Styles.col]}
						title="Piercing"
						checked={this.state.piercing}
						onPress={() => {
							this.setState(
								prevState => {
									return { piercing: !prevState.piercing }
								},
								() => {
									this.props.onValueChange(this.getValue())
								}
							)
						}}
					/>
					<CheckBox
						containerStyle={[Styles.col]}
						title="Slashing"
						checked={this.state.slashing}
						onPress={() => {
							this.setState(
								prevState => {
									return { slashing: !prevState.slashing }
								},
								() => {
									this.props.onValueChange(this.getValue())
								}
							)
						}}
					/>
				</View>
			</View>
		)
	}
}

export default class AttackModal extends React.Component<any, ModalState> {
	state = defaultState
	private readonly modalRef: React.RefObject<Modal>
	private def: Promise<AttackInfoBundle>
	private defResolve: (arg0: AttackInfoBundle) => void
	private defReject: () => void

	constructor(props) {
		super(props)
		this.modalRef = React.createRef()
	}

	open = (attack?: AttackInfoBundle) => {
		this.setState(defaultState)
		this.def = new Promise((resolve, reject) => {
			this.defResolve = resolve
			this.defReject = reject
		})
		if (attack) {
			this.setState({
				name: attack.name,
				description: attack.description,
				bonuses: attack.bonuses,
				range: attack.range,
				type: attack.type,
				dmgDieCount: attack.dmgDieCount,
				dmgDie: attack.dmgDie,
				critRange: attack.critRange,
				critMultiplier: attack.critMultiplier
			})
		}
		this.setState({ visible: true })

		return this.def
	}

	render() {
		return (
			<Modal
				ref={this.modalRef}
				animationType="fade"
				transparent={false}
				visible={this.state.visible}>
				<View>
					<SectionHeader label="New Attack" />
					<View style={[Styles.row]}>
						<InputField
							containerStyle={[Styles.col]}
							label="Name"
							value={this.state.name}
							onValueChange={name => this.setState({ name: name.toString() })}
						/>
						<OutputField
							containerStyle={[Styles.col]}
							label="Properties"
							value={this.state.bonuses.map(bonus => bonus.asString(true)).join(' ')}
						/>
					</View>
					<View style={[Styles.row]}>
						<InputField
							containerStyle={[Styles.col]}
							label="Description"
							inputType="textarea"
							value={this.state.description}
							onValueChange={desc => {
								this.setState({ description: desc.toString() })
							}}
						/>
					</View>
					<View style={[Styles.row]}>
						<InputField
							containerStyle={[Styles.col]}
							label="Range"
							inputType="number"
							value={this.state.range}
							onValueChange={range => {
								this.setState({ range: range !== null ? +range : null })
							}}
						/>
					</View>
					<View style={[Styles.row]}>
						<AttackTypeInput
							containerStyle={[Styles.col]}
							label="Type"
							value={this.state.type}
							onValueChange={type => {
								this.setState({ type })
							}}
						/>
					</View>
				</View>
			</Modal>
		)
	}
}
