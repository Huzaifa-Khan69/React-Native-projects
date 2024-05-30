import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthNavigation from './AuthNavigation';
import MainNavigation from "./MainNavigation"
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { store } from '../redux/Store';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userloggedIn}=useSelector(store=>store.Data.auth)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthRoute"
        screenOptions={{headerShown: false}}>
        {userloggedIn ? (
          <Stack.Screen name="MainRoute" component={MainNavigation} /> 
        ) : ( 
          <Stack.Screen name="AuthRoute" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
