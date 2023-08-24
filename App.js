import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from './src/pages/Main/DashboardScreen';
import LetterScreen from './src/pages/Letter/LetterScreen';
import ImageScreen from './src/pages/Image/ImageScreen';
import TestScreen from './src/pages/Test/TestScreen';
import TestScreen2 from './src/pages/Test/TestScreen2';
import QuizScreen from './src/pages/Quiz/QuizScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DashboardScreen">
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="LetterScreen" component={LetterScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="TestScreen2" component={TestScreen2} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
