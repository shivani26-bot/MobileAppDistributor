import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function AppDeleteIcon({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{
          width: 35,
          height: 35,
        }}
        source={require('../asset/images/delete.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
