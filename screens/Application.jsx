import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppCard from '../components/AppCard';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AppCard from '../components/AppCard';
import {fetchAppList} from '../redux/features/getAppListSlice';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

export default function Application() {
  const navigation = useNavigation();
  console.log(navigation);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchAppList(accessToken));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const accessToken = AsyncStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) dispatch(fetchAppList(accessToken));
  }, []);
  const applicationList = useSelector(state => state.appList.items);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={[styles.appContainer, styles.elevation]}>
        <FlatList
          style={styles.cardContainer}
          data={applicationList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#9Bd35A', '#689F38']}
              progressBackgroundColor="#fff"
            />
          }
          ListEmptyComponent={
            <View style={styles.noAppsModal}>
              <Image
                source={require('../asset/images/empty-box.png')}
                style={styles.emptyBox}
              />
              <Text style={{fontSize: 20, marginTop: 10, textAlign: 'center'}}>
                You don’t have any applications yet. Start by adding one!
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Project Details', {appData: item})
              }>
              <AppCard appData={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2979FF',
    borderTopColor: '#000',
    borderTopWidth: 2,
  },
  emptyBox: {
    width: 150,
    height: 150,
  },
  noAppsModal: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
    marginHorizontal: 'auto',
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
    marginTop: 20,
    padding: 12,
  },
  cardContainer: {
    // borderColor: '#000',
    // borderWidth: 1,

    // padding: 0,
    marginBottom: 46,
  },
});
