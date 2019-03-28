import * as React from 'react';
import { StyleSheet, ScrollView, ViewPagerAndroid, View, Text } from 'react-native';
import { Provider } from "react-redux"
import configureStore from "../shared/store/configureStore";
import AbilityScoreSection from './components/AbilityScoreSection';

const store = configureStore()

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <ViewPagerAndroid style={{ flex: 1 }}>
              <View key="1"><AbilityScoreSection /></View>
            </ViewPagerAndroid>
          </ScrollView>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
});
