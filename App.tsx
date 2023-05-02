import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import StackNavigator from './StackNavigator';
import { store } from './store/store';

//definitionen af alle screens brugt i appen.
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Overblik: undefined;
  Leaderboard: undefined;
  Tips: undefined;
};

//liste af alle de ekstra fonts der bliver brugt i appen.
const fetchFonts = () =>
  Font.loadAsync({
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
    'ChivoMono-Regular': require('./assets/fonts/ChivoMono-Regular.ttf'),
    'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
    'ConcertOne-Regular': require('./assets/fonts/ConcertOne-Regular.ttf'),
    'PTSerif-Bold': require('./assets/fonts/PTSerif-Bold.ttf'),
    'PTSerif-Regular': require('./assets/fonts/PTSerif-Regular.ttf'),
  });



export default function App() {
  LogBox.ignoreAllLogs();
  //følgende stykke loader alle nødvendige fonts før appen starter
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err: any) => console.log(err)}
      />
    );
  }




  return (
    // provider wrapperen sikrer reducer funktionalitet
    <Provider store={store}>
      {/* Stack navigator componenten har alle appens screens og database funktionalitet. */}
      <StackNavigator />

    </Provider>
  );
}

