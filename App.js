import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import mealsReducer from './store/reducers/meals'
import {Provider} from 'react-redux'

enableScreens();
//to merger multiple reducers
/*const rootReducer = combineReducers({
  meals: mealsReducer  //we will be able to work with state managed by mealsReucer with the help of meals property.
});*/
const mealsStore = createStore(mealsReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'cinzel-regular': require('./assets/fonts/Cinzel-Medium.ttf'),
    'cinzel-bold': require('./assets/fonts/Cinzel-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if(!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }
  return (
    <Provider store={mealsStore}>
      <MealsNavigator />
    </Provider>
  );
}

