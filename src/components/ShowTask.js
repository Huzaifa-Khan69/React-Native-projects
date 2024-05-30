import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ShowTask = ({title, description, dateandtime, status,onPress,id}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        flexDirection: 'column',
        width: '80%',
        height: 180,
        paddingLeft: 15,
        justifyContent: 'center',
        alignSelf:"center",
        marginLeft: 5,
        marginTop: '1%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 25,
          width: '90%',
          color: 'black',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          height: 80,
          width: '90%',
          color: 'black',
        }}>
        {description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '5%',
          width: '90%',
        }}>
        <Text style={{color: 'black'}}>{dateandtime}</Text>
        <Text style={{marginRight: 5, color: 'black'}}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShowTask;

const styles = StyleSheet.create({});
