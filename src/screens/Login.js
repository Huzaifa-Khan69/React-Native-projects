import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import { login } from '../redux/AuthSlice';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const handlelogin = () => {
    auth()
      .signInWithEmailAndPassword(
        email,
        password
      )
      .then(res => {
        console.log("res==>",res.user.uid)
        console.log('signed in!');
        dispatch(login(res.user.uid))
      })
      .catch(error => {
        Alert.alert("Invalid email or password")
      });
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'lightyellow'}}>
      <View
        style={{
          marginTop: 100,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 35, color: 'black'}}>Login</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            width: '90%',
          }}>
          <Input
            title={'Email'}
            placeholder={'Xyz@gmail.com'}
            value={email}
            setText={setEmail}
            inputStyle={{borderColor: 'orange', color: 'black'}}
          />
          <Input
            title={'password'}
            placeholder={'Huz123#!@'}
            value={password}
            setText={setPassword}
            inputStyle={{borderColor: 'orange'}}
          />
          <Button buttonstyle={{marginTop: 20}} onPress={handlelogin} text={"Submit"}/>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Don't have an Account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{
              borderRadius: 10,
              paddingHorizontal: 5,
            }}>
            <Text style={{fontSize: 20}}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
