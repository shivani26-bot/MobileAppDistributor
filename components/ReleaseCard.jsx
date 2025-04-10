import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteRelease} from '../redux/features/deleteReleasesSlice';
import {fetchReleasesList} from '../redux/features/getReleasesListSlice';
import CustomModal from './CustomModal';
export default function ReleaseCard({releaseData, appId}) {
  console.log('rd', releaseData);
  const accessToken = AsyncStorage.getItem('token');
  console.log('at', accessToken);

  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    buttonText: '',
    cancelButtonText: 'Cancel',
  });

  const showDeleteConfirmation = releaseId => {
    setModalVisible(true);
    // setAppIdToDelete(appId);
    setModalContent({
      title: 'Dear Customer',
      message: `You are about to delete the version ${releaseData.version}, Please confirm.`,
      onConfirm: () => {
        handleDelete(releaseId);
      },
      buttonText: 'Confirm',
      cancelButtonText: 'Cancel',
    });
  };

  const handleDelete = releaseId => {
    console.log('delappid', releaseId);
    console.log('delete icon clicked');
    dispatch(deleteRelease({accessToken, releaseId}))
      .then(response => {
        console.log('res', response);
        if (response.payload.success) {
          setModalContent({
            title: 'Success',
            message: response.payload.message,
            onConfirm: () => {
              dispatch(fetchReleasesList({accessToken, appId}));
              setModalVisible(false);
            },
            buttonText: 'Ok',
            cancelButtonText: '',
          });
        } else {
          setModalContent({
            title: 'Error',
            message: 'Failed to delete the release',
            onConfirm: () => {
              dispatch(fetchReleasesList({accessToken, appId}));
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
  };
  return (
    <>
      <View style={styles.container}>
        {/*  */}
        <View style={styles.whiteCard}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{releaseData.version}</Text>
          </View>

          <Text style={styles.title}>
            {releaseData.buildNumber} | {releaseData.fileExtension}
          </Text>
          <Text style={styles.labelTitle}>Description :</Text>
          <Text style={styles.description} numberOfLines={2}>
            {releaseData.releaseNote}
          </Text>
        </View>
        <View style={styles.accentCard}>
          <TouchableOpacity
            onPress={() => showDeleteConfirmation(releaseData._id)}>
            <Image
              style={{
                width: 25,
                height: 25,
                marginTop: 60,
              }}
              source={require('../asset/images/delete.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.updateButton} onPress={''}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 40,
    alignItems: 'center',
  },

  whiteCard: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    zIndex: 2,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 4},
  },
  accentCard: {
    backgroundColor: '#2979FF',
    borderRadius: 16,
    marginTop: -60, // overlap
    width: '110%',
    height: 105,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 4},
  },
  tag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#2979FF',
    paddingHorizontal: 35,
    paddingVertical: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 30,
    marginTop: -35,
    marginLeft: -25,
    color: '#000',
  },

  labelTitle: {
    color: '#5D5D60',
    marginBottom: 10,
    marginLeft: -25,
    fontSize: 17,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
  },

  updateButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 3,
    paddingHorizontal: 35,
    borderRadius: 20,
    marginTop: 50,
  },
  updateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
