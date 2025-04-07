import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {Button, Modal, Portal, Provider} from 'react-native-paper';

const CustomModal = ({
  visible,
  onDismiss,
  onConfirm,
  title,
  message,
  buttonText,
  buttonStyle,
  buttonTextStyle,
  cancelButtonText,
  cancelButtonStyle,
}) => {
  console.log(title);
  console.log(message);
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} style={styles.overlay}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.buttonContainer}>
            {cancelButtonText && (
              <Button
                onPress={onDismiss}
                labelStyle={{color: cancelButtonStyle?.color || 'white'}}
                style={[styles.button, cancelButtonStyle]}>
                <Text style={{fontSize: 18, fontWeight: 'light'}}>
                  {cancelButtonText}
                </Text>
              </Button>
            )}
            {buttonText && (
              <Button
                title={buttonText}
                onPress={onConfirm}
                labelStyle={{color: buttonStyle?.color || 'white'}}
                style={[styles.button, buttonStyle]}>
                {' '}
                <Text style={{fontSize: 18, fontWeight: 'light'}}>
                  {buttonText}
                </Text>
              </Button>
            )}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 23,
    // fontWeight: 'bold',
    marginBottom: 15,
  },
  message: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: '47%',
    borderRadius: 20,
    padding: 2,
  },
});

export default CustomModal;
