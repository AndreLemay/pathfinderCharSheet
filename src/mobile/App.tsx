import * as React from 'react';
import { StyleSheet, ScrollView, ViewPagerAndroid, View, Text, StatusBar } from 'react-native';
import { Provider } from "react-redux"
import configureStore from "../shared/store/configureStore";
import AbilityScoreSection from './components/AbilityScoreSection';
import CharacterSection from './components/CharacterSection';
import CharacterContainer from "../shared/containers/CharacterContainer"
import InitiativeSection from "./components/InitiativeSection"
import InitiativeContainer from "../shared/containers/InitiativeContainer"
import Styles from './styles/Styles';

const store = configureStore()

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <ViewPagerAndroid style={{ flex: 1 }}>
              <View key="1">
                <AbilityScoreSection />
                <InitiativeContainer initiativeComponent={InitiativeSection} />
              </View>
              <View key="2">
                <CharacterContainer characterSectionComponent={CharacterSection} />
              </View>
            </ViewPagerAndroid>
          </ScrollView>
        </View>
      </Provider>
    );
  }
}
