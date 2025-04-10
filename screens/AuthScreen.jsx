import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomModal from '../components/CustomModal';
import {loginUser} from '../redux/features/authLoginSlice';
export default function AuthScreen() {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const closedEye = require('../asset/images/hidden.png');
  const openEye = require('../asset/images/eye.png');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    buttonText: '',
    cancelButtonText: 'Cancel',
  });
  const {
    loading: loginLoading,
    error: loginError,
    user,
  } = useSelector(state => state.authLogin);

  const handleChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const handleAuth = async () => {
    const {email, password} = formData;

    if (!email || !password) {
      // Alert.alert('Error', 'All fields are required');
      setModalContent({
        title: 'Error',
        message: 'All fields are required',
        buttonText: 'Ok',
        onConfirm: () => {
          setModalVisible(false);
        },
        cancelButtonText: '',
      });
      setModalVisible(true);
      return;
    }

    try {
      const response = await dispatch(loginUser({email, password})).unwrap();

      console.log('Login Response:', response);
      await AsyncStorage.setItem('token', response.token);

      // Alert.alert('Success', response.message);
      setModalContent({
        title: 'Success',
        message: 'Login Successful',
        buttonText: 'Ok',
        onConfirm: () => {
          setModalVisible(false);
        },
        cancelButtonText: '',
      });
      setModalVisible(true);
      navigation.navigate('Application');
    } catch (error) {
      console.error('Login Error:', error);
      // Alert.alert('Error', error.message || 'Something went wrong');
      setModalContent({
        title: 'Error',
        message: error.message || 'Something went wrong',
        buttonText: 'Ok',
        onConfirm: () => {
          setModalVisible(false);
        },
        cancelButtonText: '',
      });
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User logged in:', user);
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../asset/images/logo1.png')}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>App Distributor</Text>
          <Text style={styles.title}>Login</Text>

          <Text>User Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the user email"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
          />
          <Text>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter the Password"
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIconContainer}>
              <Image
                source={isPasswordVisible ? openEye : closedEye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAuth}
            disabled={loginLoading}>
            {loginLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.separator} />
          </View>

          <Text style={styles.qusText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isModalVisible && (
        <CustomModal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={modalContent.onConfirm} // Pass the function to handle deletion
          title={modalContent.title}
          message={modalContent.message}
          buttonText={modalContent.buttonText}
          buttonStyle={{backgroundColor: '#3676F6', color: 'white'}}
          buttonTextStyle={{color: 'white'}}
          cancelButtonText={modalContent.cancelButtonText}
          cancelButtonStyle={{backgroundColor: '#5D5D60', color: 'white'}}
        />
      )}
    </>
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
    height: '80%',
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -9},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconContainer: {
    position: 'absolute',
    top: -50,
    zIndex: 1,
    left: '50%',
    marginLeft: -245,
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    width: 70,
    height: 70,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -25,
    padding: 10,
    zIndex: 1,
  },
  eyeIcon: {
    width: 25,
    height: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
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
  qusText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  getStartedButton: {
    backgroundColor: '#2979FF',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
});
