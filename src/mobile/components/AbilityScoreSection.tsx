import * as React from 'react'
import { View } from 'react-native'
import SectionHeader from './common/SectionHeader'
import StrengthContainer from '../../shared/containers/ability_scores/StrengthContainer'
import DexterityContainer from '../../shared/containers/ability_scores/DexterityContainer'
import ConstitutionContainer from '../../shared/containers/ability_scores/ConstitutionContainer'
import IntelligenceContainer from '../../shared/containers/ability_scores/IntelligenceContainer'
import WisdomContainer from '../../shared/containers/ability_scores/WisdomContainer'
import CharismaContainer from '../../shared/containers/ability_scores/CharismaContainer'
import AbilityScore from './AbilityScore'
import Styles from '../styles/Styles'

export default function AbilityScoreSection() {
	return (
		<View style={{}}>
			<SectionHeader label="Ability Scores" />
			<StrengthContainer abilityScoreComponent={AbilityScore} />
			<DexterityContainer abilityScoreComponent={AbilityScore} />
			<ConstitutionContainer abilityScoreComponent={AbilityScore} />
			<IntelligenceContainer abilityScoreComponent={AbilityScore} />
			<WisdomContainer abilityScoreComponent={AbilityScore} />
			<CharismaContainer abilityScoreComponent={AbilityScore} />
		</View>
	)
}
