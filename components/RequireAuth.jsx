import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function RequireAuth({children}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        navigation.replace('Auth');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator style={styles.styling} />
      </View>
    );
  }

  return isAuthenticated ? children : null;
}
const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styling: {
    size: 'large',
    color: '#0000ff',
  },
});
