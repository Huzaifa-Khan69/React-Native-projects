import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import EditData from '../screens/EditData';
import Form from '../screens/Form';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Edit" component={EditData}/>
          <Stack.Screen name="Form" component={Form}/>
      </Stack.Navigator>
      )
}

export default MainNavigation

const styles = StyleSheet.create({})