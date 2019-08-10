import { createSelector } from 'reselect'
import CharacterSheetState from '../types'
import { getDexterityBonus } from './abilityScoreSelectors'
import { getBonusTotal } from './bonusSelectors'
import { StatType } from '../../api/enums'

const getMiscInit = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [],
		'statToSum': [StatType.Initiative]
	})

export const getMiscInitiative = createSelector(
	[getMiscInit],
	init => init
)
export const getInitiative = createSelector(
	[getDexterityBonus, getMiscInit],
	(dex, misc) => dex + misc
)
