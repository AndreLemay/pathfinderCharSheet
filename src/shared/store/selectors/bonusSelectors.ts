import { createSelector } from 'reselect'
import CharacterSheetState, {
	EquipmentState,
	FeatState,
	ValueBonus
} from '../types'
import { BonusTypeValue, BonusType } from '../../api/enums'
import { EnumValue } from 'ts-enums'

interface StatSumBundle {
	from: Array<EquipmentState | FeatState>
	includedBonuses: BonusTypeValue[]
	statToSum: EnumValue[]
}

interface BonusSelectorProps {
	includedBonuses: BonusTypeValue[]
	statToSum: EnumValue[]
}

const sumBonuses = (bundle: StatSumBundle): number => {
	let { from, includedBonuses, statToSum } = bundle
	let add = 0
	let bonusesByType: { [key: number]: ValueBonus[] } = {}

	// initialize types dictionary based on what's included
	if (includedBonuses.length > 0) {
		// these affect everything, so just add them always
		includedBonuses.push(BonusType.Racial)
		includedBonuses.push(BonusType.Trait)
		includedBonuses.push(BonusType.Inherent)

		includedBonuses.forEach((type: BonusTypeValue) => {
			bonusesByType[type.ordinal] = []
		})
	} else {
		BonusType.values.forEach((type: BonusTypeValue) => {
			includedBonuses.push(type)
			bonusesByType[type.ordinal] = []
		})
	}

	// sort all equipment bonuses into their respective buckets
	from.forEach(item => {
		if (item) {
			item.bonuses.forEach(bonus => {
				if (
					bonusesByType[bonus.bonusType.ordinal] !== undefined &&
					statToSum.indexOf(bonus.affected) >= 0
				) {
					bonusesByType[bonus.bonusType.ordinal].push(bonus)
				}
			})
		}
	})

	add = includedBonuses.reduce((sum: number, type: BonusTypeValue) => {
		if (includedBonuses.length === 0 || type.stacksWithSelf) {
			return (
				sum +
				bonusesByType[type.ordinal].reduce((acc: number, cur: ValueBonus) => {
					return acc + cur.bonusAmount
				}, 0)
			)
		}
		else {
			return (
				sum +
				bonusesByType[type.ordinal].reduce((acc: number, cur: ValueBonus) => {
					return Math.max(acc, cur.bonusAmount)
				}, 0)
			)
		}
	}, 0)

	return add
}
const getEquipment = (state: CharacterSheetState) => state.equipment
const getFeats = (state: CharacterSheetState) =>
	state.feats.filter(item => item.active)
const getBundle = (
	state: CharacterSheetState,
	props: BonusSelectorProps
): StatSumBundle => {
	let fromArr: Array<EquipmentState | FeatState> = [
		...getFeats(state),
		...getEquipment(state)
	]

	return {
		from: fromArr,
		includedBonuses: props.includedBonuses,
		statToSum: props.statToSum
	}
}

export const getBonusTotal = createSelector(
	[getBundle],
	sumBonuses
)
