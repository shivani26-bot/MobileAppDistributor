import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppCard from '../components/AppCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAppList} from '../redux/features/getAppListSlice';

export default function Application() {
  const accessToken = AsyncStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) dispatch(fetchAppList(accessToken));
  }, []);
  const applicationList = useSelector(state => state.appList.items);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.appContainer, styles.elevation]}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.cardContainer}>
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
        </ScrollView> */}

        <FlatList
          style={styles.cardContainer}
          data={applicationList}
          renderItem={({item}) => {
            return <AppCard appData={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2979FF',
  },
  elevation: {
    elevation: 20, //android
    //ios
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 15,
    backgroundColor: '#ffff',
  },
  appContainer: {
    height: '100%',
    // borderTopColor: '#000',
    // borderTopWidth: 2,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 80,
    padding: 12,
  },
  cardContainer: {
    // borderColor: '#000',
    // borderWidth: 1,

    padding: 4,
    marginBottom: 46,
  },
});
