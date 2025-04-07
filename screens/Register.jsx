import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/features/authRegisterSlice';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, error} = useSelector(state => state.authRegister);

  // Handle input changes
  const handleChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  // Handle registration
  const handleRegister = async () => {
    const {name, email, password} = formData;

    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await dispatch(
        registerUser({name, email, password}),
      ).unwrap();
      await AsyncStorage.setItem('token', response.token);
      Alert.alert('Success', response.message);
      navigation.navigate('Auth');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your User name"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
        />

       
        <Text>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile number"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
        />
         <Text>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="Role"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2979FF',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 30,
    //paddingTop: 0,
    paddingBottom: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -9},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 22,
    marginBottom: 40,
    marginTop: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2979FF',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
