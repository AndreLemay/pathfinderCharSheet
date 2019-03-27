import * as React from 'react';
import { StyleSheet, ScrollView, ViewPagerAndroid } from 'react-native';
import { Provider } from "react-redux"
import configureStore from "../shared/store/configureStore";
import AbilityScoreSection from './components/AbilityScoreSection';

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ScrollView>
          <ViewPagerAndroid>
            <AbilityScoreSection key="1"/>
          </ViewPagerAndroid>
        </ScrollView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
