import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({buttonstyle,textstyle,onPress,text}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[{
        width: '60%',
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent:"center"
      },buttonstyle]}>
      <Text style={[{fontSize: 20,color:"black"},textstyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
