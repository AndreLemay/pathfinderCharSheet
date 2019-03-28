import * as React from 'react';
import { StyleSheet, ScrollView, ViewPagerAndroid, View } from 'react-native';
import { Provider } from "react-redux"
import configureStore from "../shared/store/configureStore";
import AbilityScoreSection from './components/AbilityScoreSection';

const store = configureStore()

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ScrollView>
            {/* <ViewPagerAndroid style={styles.container}> */}
            <AbilityScoreSection key="1" />
            {/* </ViewPagerAndroid> */}
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
