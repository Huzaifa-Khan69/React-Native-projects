import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../redux/Store';
import {AddData} from '../redux/TodoSlice';

const Form = ({navigation}) => {
  const {data} = useSelector(store => store.Data.auth);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const date = new Date().toLocaleString();
  const [status, setStatus] = useState(false);

  const addTask = () => {
    firestore()
      .collection('Tasks')
      .doc()
      .set({
        title: title,
        description: description,
        dateandtime:
          new Date().toLocaleDateString() + " "+
          new Date().toLocaleString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
          }),
        status: status ? 'Completed' : 'Incompleted',
        id: data.id,
      })

      .then(() => {
        console.log('Task added!');
        navigation.navigate('Home');
      });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30, color: 'black', paddingBottom: 80}}>
        Add Task To DO
      </Text>
      <Input
        title={'Task Title'}
        placeholder={'eg. Buy mobile'}
        setText={setTitle}
        value={title}
      />
      <Input
        title={'Task Detail'}
        placeholder={'eg. Go to mall and buy mobile'}
        setText={setDescription}
        value={description}
        inputStyle={{height: 200}}
        multiline={true}
      />
      <Button
        text={'Add Task'}
        buttonstyle={{marginTop: 30}}
        onPress={addTask}
      />
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({});
