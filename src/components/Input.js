import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Input = ({placeholder, title,setText,value,inputStyle,multiline}) => {
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        // justifyContent: 'center',

        marginTop: 12,
      }}>
      <View>
        <Text style={{fontSize: 20, fontWeight: 500,color:"black"}}>{title}</Text>
      </View>
      <TextInput
      multiline={multiline}
        placeholder={placeholder}
        onChangeText={setText}
        value={value}
        style={[{
          width: '85%',
          height: 45,
          borderWidth: 1,
          borderRadius: 25,
          textAlign: 'center',
          fontSize: 15,
          marginTop:8
        },inputStyle]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
