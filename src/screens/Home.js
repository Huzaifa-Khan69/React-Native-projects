import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import {Editdata, Logout} from '../redux/AuthSlice';
import firestore, {onSnapshot} from '@react-native-firebase/firestore';
import {AddData} from '../redux/TodoSlice';
import ShowTask from '../components/ShowTask';

const Home = ({navigation}) => {
  const [allData, setallData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState();

  const {data} = useSelector(store => store.Data.auth);

  const [id, setId] = useState();

  const dispatch = useDispatch();
  const EditUserData = () => {
    // dispatch(Editdata())
    navigation.navigate('Edit');
  };
  const logout = () => {
    Alert.alert("Logout",'Are you Sure',[
      {
        text: 'Cancel',
        onPress: () => navigation.navigate("Home"),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>dispatch(Logout())},
    ]);
    
  };
  const getAllData = () => {
    try {
      firestore()
        .collection('Tasks')
        .where('id', '==', data.id)
        // .where('status','==','Incompleted')
        // .orderBy('dateandtime')
        .onSnapshot(querySnapshot => {
          if (!querySnapshot?.empty) {
            setallData(querySnapshot?.docs);
          } else {
            setallData([]);
          }
        });
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const openModal = (taskId, status) => {
    setIsOpen(true);
    if (status === 'Completed') {
      setTaskStatus('Incompleted');
      console.log(taskStatus);
    } else {
      setTaskStatus('Completed');
    }
    setId(taskId);
  };

  const updateStatus = id => {
    firestore()
      .collection('Tasks')
      .doc(id)
      .update({
        status: taskStatus,
      })
      .then(() => {
        console.log('User updated!', id);
        setIsOpen(false);
      });
  };
  const deleteData = id => {
    firestore()
      .collection('Tasks')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!', id);
        setIsOpen(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor: 'lightyellow'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginVertical: 15,
        }}>
        <Text style={{color: 'black', fontSize: 25}}>
          Welcome {data.firstname}
        </Text>
        <Button text={'logout'} buttonstyle={{width: '30%'}} onPress={logout} />
      </View>
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 20}}>First Name: {data.firstname}</Text>
        <Text style={{fontSize: 20}}>Last Name: {data.lastName}</Text>
        <Text style={{fontSize: 20}}>Email: {data.email}</Text>
        <Text style={{fontSize: 20}}>City: {data.city}</Text>
        <Button
          text={'Edit User Data'}
          buttonstyle={{width: '35%', marginTop: 20}}
          onPress={EditUserData}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          text={'Add Task'}
          buttonstyle={{width: '35%', marginTop: 20}}
          onPress={() => navigation.navigate('Form')}
        />
      </View>
      <Modal transparent={true} visible={isOpen} animationType="fade">
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightyellow',
            flex: 1,
          }}>
          <View
            style={{
              width: '90%',
              height: 250,
              justifyContent: 'center',
              backgroundColor: 'white',
              alignItems: 'center',
              borderRadius: 30,
              elevation: 8,
              shadowColor: 'black',
            }}>
            {taskStatus === 'Completed' ? (
              <Button
                text={'Mark as Complete'}
                buttonstyle={{
                  marginBottom: 30,
                  backgroundColor: 'lightblue',
                }}
                onPress={() => updateStatus(id)}
              />
            ) : (
              <Button
                text={'Mark as Incomplete'}
                buttonstyle={{
                  marginBottom: 30,
                  backgroundColor: 'lightblue',
                }}
                onPress={() => updateStatus(id)}
              />
            )}

            <Button
              text={'Delete Task'}
              buttonstyle={{backgroundColor: 'lightblue'}}
              onPress={() => deleteData(id)}
            />
          </View>
        </View>
      </Modal>
      <Text
        style={{
          fontSize: 25,
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          color: 'black',
        }}>
        Incomplete Task
      </Text>
      {allData?.map(item => {
        return item._data.status === 'Incompleted' ? (
          <ShowTask
            key={item.id}
            id={item.id}
            onPress={() => openModal(item.id, item._data.status)}
            title={item._data.title}
            description={item._data.description}
            dateandtime={item._data.dateandtime}
            status={item._data.status}
          />
        ) : null;
      })}
      <Text
        style={{
          fontSize: 25,
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          color: 'black',
        }}>
        Complete Task
      </Text>
      {allData.map(item => {
        return item._data.status === 'Completed' ? (
          <ShowTask
            key={item.id}
            id={item.id}
            onPress={() => openModal(item.id, item._data.status)}
            title={item._data.title}
            description={item._data.description}
            dateandtime={item._data.dateandtime}
            status={item._data.status}
          />
        ) : null;
      })}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
