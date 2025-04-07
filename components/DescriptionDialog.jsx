import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';

const DescriptionDialog = ({visible, hideDialog, description}) => {
  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text style={styles.description} variant="bodyMedium">
            {description}
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 17,
  },
});
export default DescriptionDialog;
