import * as React from 'react'
import {
	StyleSheet,
	ScrollView,
	ViewPagerAndroid,
	View,
	Text,
	StatusBar
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from '../shared/store/configureStore'
import AbilityScoreSection from './components/AbilityScoreSection'
import CharacterSection from './components/CharacterSection'
import CharacterContainer from '../shared/containers/CharacterContainer'
import InitiativeSection from './components/InitiativeSection'
import InitiativeContainer from '../shared/containers/InitiativeContainer'
import SavesContainer from '../shared/containers/SavesContainer'
import SaveSection from './components/SaveSection'
import HealthContainer from '../shared/containers/HealthContainer'
import HealthSection from './components/HealthSection'
import AttackBonusContainer from '../shared/containers/AttackBonusContainer'
import AttackBonusSection from './components/AttackBonusSection'
import ArmourClassContainer from '../shared/containers/ArmourClassContainer'
import ArmourClassSection from './components/ArmourClassSection'
import CombatManeuverContainer from '../shared/containers/CombatManeuversContainer'
import CombatManeuverSection from './components/CombatManeuverSection'
import ArmourContainer from '../shared/containers/ArmourContainer'
import ArmourSection from './components/ArmourSection'
import ShieldContainer from '../shared/containers/ShieldContainer'
import ShieldSection from './components/ShieldSection'

const store = configureStore()

export class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ 'flex': 1, 'paddingTop': StatusBar.currentHeight }}>
					<ScrollView style={{ 'flex': 1 }} contentContainerStyle={{ 'flex': 1 }}>
						<ViewPagerAndroid style={{ 'flex': 1 }}>
							<View key="1">
								<AbilityScoreSection />
								<InitiativeContainer initiativeComponent={InitiativeSection} />
							</View>
							<View key="2">
								<CharacterContainer characterSectionComponent={CharacterSection} />
								<SavesContainer saveComponent={SaveSection} />
							</View>
							<View key="3">
								<HealthContainer healthSectionComponent={HealthSection} />
								<AttackBonusContainer attackBonusComponent={AttackBonusSection} />
							</View>
							<View key="4">
								<ArmourClassContainer armourClassComponent={ArmourClassSection} />
								<CombatManeuverContainer
									combatManeuverComponent={CombatManeuverSection}
								/>
							</View>
							<View key="5">
								<ArmourContainer armourComponent={ArmourSection} />
								<ShieldContainer shieldComponent={ShieldSection} />
							</View>
						</ViewPagerAndroid>
					</ScrollView>
				</View>
			</Provider>
		)
	}
}
