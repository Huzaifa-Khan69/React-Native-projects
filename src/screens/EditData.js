import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../redux/Store';
import Input from '../components/Input';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';
import { Editdata } from '../redux/AuthSlice';

const EditData = ({navigation}) => {
  const {data} = useSelector(store => store.Data.auth);
  const dispatch=useDispatch()
  const [fName, setfName] = useState(data.firstname);
  const [lName, setlName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [city, setCity] = useState(data.city);
  const [occupation, setOccupation] = useState(data.occupation);

  const updatedata = () => {
    const input={
        firstname: fName,
        lastName: lName,
        email: email,
        password: password,
        city: city,
        occupation: occupation,
        id:data.id
    }
    firestore()
      .collection('Users')
      .doc(data.id)
      .update({
        firstname: input.firstname,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        city: input.city,
        occupation: input.occupation,
      })
      .then(() => {
       dispatch(Editdata(input))
      });
      navigation.navigate("Home")
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightyellow',
      }}>
      <Text style={{fontSize: 35, color: 'black'}}>Edit Data</Text>
      <Input
        title={'First Name'}
        placeholder={'John'}
        setText={setfName}
        value={fName}
      />
      <Input
        title={'Last Name'}
        placeholder={'Doe'}
        setText={setlName}
        value={lName}
      />
      <Input
        title={'Email'}
        placeholder={'Xyz@gmail.com'}
        setText={setEmail}
        value={email}
      />
      <Input
        title={'Password'}
        placeholder={'Huz123#!@'}
        setText={setPassword}
        value={password}
      />
      <Input
        title={'City'}
        placeholder={'Eg. Karachi'}
        setText={setCity}
        value={city}
      />
      <Input
        title={'Occupation'}
        placeholder={'Eg. Student'}
        setText={setOccupation}
        value={occupation}
      />
      <Button
        buttonstyle={{marginTop: 20}}
        text={'Update Data'}
        onPress={updatedata}
      />
    </ScrollView>
  );
};

export default EditData;

const styles = StyleSheet.create({});
