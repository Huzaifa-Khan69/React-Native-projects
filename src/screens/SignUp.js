import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import firestore from '@react-native-firebase/firestore';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [id,setId]=useState("")

  const addData = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('res===>', );
        console.log('User account created & signed in!');
        firestore()
        .collection('Users')
        .doc(res.user.uid)
        .set({
          firstname: fName,
          lastName: lName,
          email: email,
          password: password,
          city: city,
          occupation: occupation,
          id:res.user.uid
        })
        .then(() => {
          navigation.navigate('Login');
        })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
      });
   
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightyellow',
      }}>
      <Text style={{fontSize: 35, color: 'black'}}>Sign Up</Text>
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
      <Button buttonstyle={{marginTop: 20}} onPress={addData} text={"Submit"}/>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Already have an Account?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            borderRadius: 10,
            paddingHorizontal: 5,
          }}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
