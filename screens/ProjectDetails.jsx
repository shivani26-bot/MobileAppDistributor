import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppDeleteIcon from '../components/AppDeleteIcon';
import {deleteApplication} from '../redux/features/deleteAppSlice';
import {fetchAppList} from '../redux/features/getAppListSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../components/CustomModal';
import {NavigationContainer} from '@react-navigation/native';
import AppCard from '../components/AppCard';
import Release from '../components/Release';

export default function ProjectDetails({route, navigation}) {
  const {appData} = route.params;

  const dispatch = useDispatch();
  console.log('data', appData);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [appIdToDelete, setAppIdToDelete] = useState(null);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    buttonText: '',
    cancelButtonText: 'Cancel',
  });
  //   const accessToken = AsyncStorage.getItem('token');
  const accessToken = AsyncStorage.getItem('token');
  console.log('at', accessToken);

  useEffect(() => {
    // Dynamically set the headerRight button with the delete icon
    navigation.setOptions({
      headerRight: () => (
        // <AppDeleteIcon onPress={() => showDeleteConfirmation(appData._id)} />
        <AppDeleteIcon
          onPress={() => showDeleteConfirmation(appData._id, navigation)}
        />
      ),
    });
  }, [navigation, appData]);

  const showDeleteConfirmation = (appId, navigation) => {
    setModalVisible(true);
    // setAppIdToDelete(appId);
    setModalContent({
      title: 'Delete Application',
      message: 'Are you sure you want to delete this application?',
      onConfirm: () => {
        handleDelete(appId, navigation);
      },
      buttonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });
  };

  const handleDelete = (appId, navigation) => {
    if (!accessToken) {
      setModalContent({
        title: 'Error',
        message: 'Something went wrong',
        onConfirm: () => setModalVisible(false),
        buttonText: 'Ok',
        cancelButtonText: '',
      });
      setModalVisible(true);
      return;
    }
    // console.log('delappid', appId);
    console.log('delete icon clicked');
    console.log('get all the application');
    dispatch(deleteApplication({accessToken, appId}))
      .then(response => {
        console.log('res', response);
        if (response.payload.success) {
          setModalContent({
            title: 'Success',
            message: response.payload.message,
            onConfirm: () => {
              dispatch(fetchAppList(accessToken));
              navigation.navigate('Application');
              setModalVisible(false);
            },
            buttonText: 'Ok',
            cancelButtonText: '',
          });
          // dispatch(fetchAppList(accessToken));
          // navigation.navigate('Application');
        } else {
          setModalContent({
            title: 'Error',
            message: 'Failed to delete the application',
            onConfirm: () => {
              dispatch(fetchAppList(accessToken));
              // navigation.navigate('Application');
              setModalVisible(false);
            },
            buttonText: 'Ok',
            cancelButtonText: '',
          });
        }
      })
      .catch(error => {
        setModalContent({
          title: 'Error',
          message: 'Something went wrong. Please try again later',
          onConfirm: () => {
            setModalVisible(false);
          },
          buttonText: 'Ok',
          cancelButtonText: '',
        });
      });

    // setModalVisible(false);
  };

  return (
    <>
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
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <View style={styles.app}>
            <AppCard appData={appData} />
          </View>
        </View>

        <View style={[styles.releaseContainer, styles.elevation]}>
          <Release />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2979FF',
    // justifyContent: 'flex-start',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  appContainer: {
    // borderColor: '#000',
    // borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  app: {
    // borderColor: '#000',
    // borderWidth: 1,
    width: '100%',
  },
  releaseContainer: {
    backgroundColor: '#fff',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  elevation: {
    elevation: 20,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 6,
  },
});

// const showDeleteConfirmation = (appId, navigation) => {
//   Alert.alert(
//     'Delete Application',
//     'Are you sure you want to delete this application?',
//     [
//       {
//         text: 'No', // If 'No' is pressed, do nothing

//         style: 'cancel',
//       },
//       {
//         text: 'Yes', // If 'Yes' is pressed, proceed with deletion
//         onPress: () => handleDelete(appId, navigation),
//       },
//     ],
//     {cancelable: true}, // Allow dismissing by clicking outside
//   );
// };

// const handleDelete = (appId, navigation) => {
//   if (!accessToken) {
//     Alert.alert('Error', 'No access token available');
//     return;
//   }
//   console.log('delappid', appId);
//   console.log('delete icon clicked');
//   console.log('get all the application');
//   dispatch(deleteApplication({accessToken, appId}))
//     .then(response => {
//       console.log('res', response);
//       if (response.payload.success) {
//         Alert.alert('Success', response.payload.message);
//         dispatch(fetchAppList(accessToken));
//         navigation.navigate('Application');
//       } else {
//         Alert.alert(
//           'Error',
//           response.payload.message || 'Failed to delete the application',
//         );
//       }
//     })
//     .catch(error => {
//       console.log('error during delete', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later');
//     });
// };
