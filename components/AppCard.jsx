import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function AppCard({appData}) {
  return (
    <View style={[styles.card, styles.elevation]}>
      <View style={styles.layout}>
        <Text style={{color: '#ffff'}}>{appData.osType}</Text>
      </View>

      <Text style={[styles.appName]}> {appData.appName}</Text>
      <View style={[styles.release, styles.text]}>
        <Text style={[styles.label, styles.text]}>Release Type : </Text>
        <Text style={[styles.text, {marginLeft: 5}]}>
          {appData.releaseType}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={[styles.label, styles.text]}>Description :</Text>
        <Text style={[styles.text, {marginLeft: 32}]}>
          Some Description about the application.
        </Text>
      </View>
    </View>
    // <View style={[styles.card, styles.elevation]}>
    //   <View style={styles.layout}>
    //     <Text style={{color: '#ffff'}}>Android</Text>
    //   </View>

    //   <Text style={[styles.appName]}>Play Store</Text>
    //   <View style={[styles.release, styles.text]}>
    //     <Text style={[styles.label, styles.text]}>Release Type : </Text>
    //     <Text style={[styles.text, {marginLeft: 5}]}>Beta</Text>
    //   </View>
    //   <View style={styles.description}>
    //     <Text style={[styles.label, styles.text]}>Description :</Text>
    //     <Text style={[styles.text, {marginLeft: 32}]}>
    //       The Play Store is the official digital distribution platform
    //     </Text>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor: '#ffff',
    borderRadius: 15,

    width: '100%',
    height: 'auto',
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#0054FE',
    borderBottomWidth: 4,
    borderBottomColor: '#0054FE',
    marginVertical: 12,
  },
  elevation: {
    elevation: 10, //android

    //ios
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 6,
  },
  firstRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  layout: {
    backgroundColor: '#0054FE',

    padding: 6,
    width: 110,
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
  },
  appName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },
  release: {
    marginVertical: 6,
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
  },
  description: {
    marginBottom: 10,
  },
  label: {
    // fontWeight: '300',
    color: '#5D5D60',
  },
});
