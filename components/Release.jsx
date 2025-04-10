import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReleasesList} from '../redux/features/getReleasesListSlice';
import ReleaseCard from './ReleaseCard';
export default function Release({appId}) {
  console.log('raid', appId);
  const accessToken = AsyncStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) dispatch(fetchReleasesList({accessToken, appId}));
  }, []);
  const releasesList = useSelector(state => state.releasesList.items);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchReleasesList({accessToken, appId}));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View>
      <Text style={styles.heading}>Releases</Text>
      <FlatList
        style={styles.cardContainer}
        data={releasesList}
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
              You don’t have any releases yet. Start by adding one!
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <ReleaseCard releaseData={item} appId={appId} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 140,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 220,
    paddingBottom: 20,
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
});
