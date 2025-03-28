import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './screens/AuthScreen';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Login/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
