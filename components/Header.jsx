import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Avatar, Menu} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/features/authLogoutSlice';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.authLogout);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      await AsyncStorage.removeItem('token');
      setToken(null);
      setVisible(false);
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#2979FF',
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
