import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useState, useEffect} from 'react';

const ViewUser = () => {
  const [data, setData] = useState([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(undefined);

  //
  const getAPIData = async () => {
    //api call

    const url = 'http://localhost:3000/users';
    const result = await fetch(url);
    const res = await result.json();
    setData(res);
    if (res) {
      setShowLoader(false);
    }
  };

  // show user
  useEffect(() => {
    getAPIData();
  }, []);

  //delete user
  const deleteUser = async id => {
    const url = 'http://localhost:3000/users';
    let result = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    result = await result.json();
    if (result) {
      console.warn('User Deleted');
      getAPIData();
    }
  };

  //update user
  const updateUser = data => {
    setShowModal(true);
    setSelectedUser(data);
  };

  // const displayLoader = () => {
  //   setShowLoader(true);
  // };
  //View Data
  return (
    <View style={styles.container}>
      <View style={styles.dataWrapper}>
        <View style={{flex: 2}}>
          <Text style={{backgroundColor: '#ddd'}}>Name</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Age</Text>
        </View>
        <View style={{flex: 2}}>
          <Text>Email</Text>
        </View>
        <View style={{flex: 2}}>
          <Text>Delete</Text>
        </View>
        <View style={{flex: 2}}>
          <Text>Update</Text>
        </View>
      </View>

      {
        data.length ? (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.dataWrapper}>
                <View style={{flex: 2}}>
                  <Text style={{backgroundColor: '#ddd'}}>{item.name}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.age}</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text>{item.email}</Text>
                </View>
                <View style={{flex: 2}}>
                  <Button title="Delete" onPress={() => deleteUser(item.id)} />
                </View>
                <View style={{flex: 2}}>
                  <Button title="Update" onPress={() => updateUser(item)} />
                </View>
              </View>
            )}
          />
        ) : (
          <ActivityIndicator size={'large'} color={'blue'} />
        )
        //null
      }

      <Modal visible={showModal} transparent={true}>
        <UserModel
          setShowModal={setShowModal}
          selectedUser={selectedUser}
          getAPIData={getAPIData}
        />
      </Modal>
    </View>
  );
};

//Model and Update
const UserModel = props => {
  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    if (props.selectedUser) {
      setName(props.selectedUser.name);
      setAge(props.selectedUser.age.toString());
      setEmail(props.selectedUser.email);
    }
  }, [props.selectedUser]);

  const updateUser = async () => {
    console.warn(name, age, email);

    const url = 'http://localhost:3000/users';

    const id = props.selectedUser.id;

    let result = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, age, email}),
    });
    result = await result.json();
    if (result) {
      console.warn('User Updated');
      props.getAPIData();
      props.setShowModal(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={text => setAge(text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={{marginBottom: 5}}>
          <Button title="Update" onPress={updateUser} />
        </View>

        <Button title="Close" onPress={() => props.setShowModal(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataWrapper: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'skyblue',
    width: 200,
    marginBottom: 10,
  },
});
export default ViewUser;
