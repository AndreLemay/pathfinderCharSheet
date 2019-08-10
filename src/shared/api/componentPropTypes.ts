import {
	AlignmentValue,
	GenderValue,
	SizeValue,
	ArmourTypeValue,
	SkillNameValue,
	DamageDieValue,
	AbilityTypeValue
} from './enums'
import { ValueBonus } from '../store/types'

export interface ClassNameProp {
	className?: string
}

export interface SectionHeaderProps extends ClassNameProp {
	label: string
}

export interface AbilityScoreProps extends ClassNameProp {
	label: string
	base: number
	additional: number
	bonus: number
	baseChange: (val: number) => void
}

export interface CharacterProps extends ClassNameProp {
	name: string
	alignment: AlignmentValue
	gender: GenderValue
	race: string
	size: SizeValue
	nameChange: (name: string) => void
	alignmentChange: (alignment: AlignmentValue) => void
	genderChange: (gender: GenderValue) => void
	raceChange: (race: string) => void
	sizeChange: (size: SizeValue) => void
}

export interface HealthProps extends ClassNameProp {
	current: number
	max: number
	temp: number
	nonlethal: number
	damageResistance: string
	energyResistance: string
	currentChange: (current: number) => void
	maxChange: (max: number) => void
	tempChange: (temp: number) => void
	nonlethalChange: (nonlethal: number) => void
	drChange: (dr: string) => void
	erChange: (er: string) => void
}

export interface AttackBonusProps extends ClassNameProp {
	base: number
	miscBonus: number
	meleeBonus: number
	rangedBonus: number
	baseChange: (base: number) => void
}

export interface InitiativeProps extends ClassNameProp {
	initiative: number
	dexBonus: number
	miscBonus: number
}

export interface SaveProps extends ClassNameProp {
	fortSave: number
	reflexSave: number
	willSave: number
	baseFort: number
	baseReflex: number
	baseWill: number
	conBonus: number
	dexBonus: number
	wisBonus: number
	miscFort: number
	miscReflex: number
	miscWill: number
	fortSaveChange: (fort: number) => void
	reflexSaveChange: (reflex: number) => void
	willSaveChange: (will: number) => void
}

export interface ArmourClassProps extends ClassNameProp {
	ac: number
	flatFooted: number
	touch: number
	dexBonus: number
	dodgeBonus: number
	deflectionBonus: number
	armourBonus: number
	shieldBonus: number
	natBonus: number
	sizeBonus: number
}

export interface CombatManeuvreProps extends ClassNameProp {
	cmb: number
	cmd: number
	flatFooted: number
	strBonus: number
	dexBonus: number
	bab: number
	dodgeMod: number
	deflectionMod: number
	sizeMod: number
	miscCMB: number
	miscCMD: number
}

export interface ArmourProps extends ClassNameProp {
	name: string
	description: string
	type: ArmourTypeValue
	maxSpeed: number
	maxDex: number
	checkPenalty: number
	ac: number
	nameChange: (name: string) => void
	descriptionChange: (description: string) => void
	typeChange: (type: ArmourTypeValue) => void
	maxSpeedChange: (maxSpeed: number) => void
	maxDexChange: (maxDex: number) => void
	checkPenaltyChange: (checkPenalty: number) => void
	acChange: (ac: number) => void
}

export interface ShieldProps extends ClassNameProp {
	name: string
	description: string
	checkPenalty: number
	ac: number
	nameChange: (name: string) => void
	descriptionChange: (desc: string) => void
	checkPenaltyChange: (penalty: number) => void
	acChange: (ac: number) => void
}

export interface SkillProps extends ClassNameProp {
	skill: SkillNameValue
	skillBonus: number
	abilityBonus: number
	isClassSkill: boolean
	ranks: number
	miscBonus: number
	armourPenalty: number
	rankChange: (ranks: number) => void
	classSkillChange: (classSkill: boolean) => void
}

export interface SkillsSectionProps extends ClassNameProp {
	skills: number[]
}

export interface EquipmentProps extends ClassNameProp {
	name: string
	description: string
	bonuses: ValueBonus[]
	onEdit: () => void
	onDelete: () => void
}

export interface EquipmentSectionProps extends ClassNameProp {
	equipIds: string[]
	openEquipModal: (
		onSave: (state: EquipInfoBundle) => void,
		equip?: EquipInfoBundle
	) => void
}

export interface EquipInfoBundle {
	name: string
	description: string
	bonuses: ValueBonus[]
}

export interface FeatProps extends ClassNameProp {
	name: string
	description: string
	bonuses: ValueBonus[]
	active: boolean
	onActiveChange: (active: boolean) => void
	onEdit: () => void
	onDelete: () => void
}

export interface FeatsSectionProps extends ClassNameProp {
	featIds: string[]
	openFeatModal: (
		onSave: (state: FeatInfoBundle) => void,
		feat?: FeatInfoBundle
	) => void
}

export interface FeatInfoBundle {
	name: string
	description: string
	bonuses: ValueBonus[]
}

export interface AttackProps extends ClassNameProp {
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

export interface AttacksSectionProps extends ClassNameProp {
	attackAndEquipIds: Array<[string, string]>
	openAttackModal: (
		onSave: (state: AttackInfoBundle) => void,
		attack?: AttackInfoBundle
	) => void
}

export interface AttackInfoBundle {
	name: string
	description: string
	bonuses: ValueBonus[]
	range: number
	type: string
	critRange: number
	critMultiplier: number
	dmgDieCount: number
	dmgDie: DamageDieValue
	toHitBonusAbility: AbilityTypeValue
	dmgBonusAbility: AbilityTypeValue
}

export interface ToolbarProps {
	defaultSaveName: () => string
	getSaveFile: () => any
	load: (data: any) => void
	addEquip: () => void
	addFeat: () => void
	addAttack: () => void
}
