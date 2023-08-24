import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const DashboardScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to Image Test"
        onPress={() => navigation.navigate('ImageScreen')}
      />
      <Button
        title="Go to Test 1"
        onPress={() => navigation.navigate('TestScreen')}
      />
      <Button
        title="Go to Test 2"
        onPress={() => navigation.navigate('TestScreen2')}
      />
      <Button
        title="Go to Quiz"
        onPress={() => navigation.navigate('QuizScreen')}
      />
      <Button
        title="Go to Letter Test"
        onPress={() => navigation.navigate('LetterScreen')}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
