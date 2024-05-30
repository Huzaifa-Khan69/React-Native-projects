import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Signup"
        screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
      )
}

export default AuthNavigation

const styles = StyleSheet.create({})