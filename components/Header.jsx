import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Avatar, Menu} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/features/authLogoutSlice';
import CustomModal from './CustomModal';
const Header = () => {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.authLogout);
  const navigation = useNavigation();
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    buttonText: '',
    cancelButtonText: 'Cancel',
  });
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser()).unwrap();
      console.log(response);
      await AsyncStorage.removeItem('token');
      setToken(null);
      setVisible(false);
      setModalContent({
        title: 'Success',
        message: 'Logged out successfully',
        buttonText: 'Ok',
        onConfirm: () => {
          setModalVisible(false);
        },
        cancelButtonText: '',
      });
      setModalVisible(true);
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Logout failed:', error);
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

  return (
    <>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../asset/images/logo1.png')}
            style={styles.icon}
          />
        </View>
        <View>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : token ? (
            <>
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                <Avatar.Image
                  size={40}
                  source={require('../asset/images/avatar.png')}
                />
              </TouchableOpacity>

              {visible && (
                <View style={styles.menu}>
                  <Menu.Item
                    onPress={handleLogout}
                    title="Logout"
                    disabled={loading}
                  />
                </View>
              )}
            </>
          ) : null}
        </View>

        {error && <Text style={styles.errorText}>Logout Failed: {error}</Text>}
      </View>

      {isModalVisible && (
        <CustomModal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={modalContent.onConfirm}
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
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    // paddingTop: 20,
    backgroundColor: '#2979FF',
    // borderTopColor: '#000',
    // borderTopWidth: 2,
  },
  // title: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
  iconContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    // borderTopColor: '#000',
    // borderTopWidth: 2,
  },
  icon: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  menu: {
    flex: 1,
    zIndex: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Header;
