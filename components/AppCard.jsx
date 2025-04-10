import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DescriptionDialog from './DescriptionDialog';

export default function AppCard({appData}) {
  const osType = appData.osType;
  const appName = appData.appName;
  console.log(osType);

  const [descriptionDialog, setDescriptionDialog] = useState(false);

  const descriptionText =
    'Some description about the application. Do Read the details about the application.';

  console.log(descriptionText.length);
  const isTextLong = descriptionText.length >= 45;
  const truncatedText = isTextLong
    ? `${descriptionText.substring(0, 45)}...`
    : descriptionText;

  const handleReadMore = () => {
    setDescriptionDialog(true);
  };
  const hideDialog = () => setDescriptionDialog(false);

  return (
    <View style={[styles.card, styles.elevation]}>
      <View style={styles.layout}>
        <Text style={{color: '#ffff'}}>
          {osType.charAt(0).toUpperCase() + osType.slice(1)}
        </Text>
      </View>

      <Text style={[styles.appName]}>
        {' '}
        {appName.charAt(0).toUpperCase() + appName.slice(1)}
      </Text>
      <View style={[styles.release, styles.text]}>
        <Text style={[styles.label, styles.text]}>Release Type : </Text>
        <Text style={[styles.text, {marginLeft: 5}]}>
          {appData.releaseType}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={[styles.label, styles.text]}>Description :</Text>

        <Text style={[styles.text, {marginLeft: 32}]}>
          {isTextLong ? truncatedText : descriptionText}{' '}
          {isTextLong && (
            <TouchableOpacity style={styles.opacity} onPress={handleReadMore}>
              <Text
                style={[
                  styles.readMore,
                  styles.text,
                  {
                    marginLeft: 0,
                    marginBottom: -4,
                  },
                ]}>
                More
              </Text>
            </TouchableOpacity>
          )}
        </Text>
        {/* onLayout event is fired whenever the layout of the component changes. In this case, it's fired when the text is rendered, and it provides information about the layout of the Text component, such as its position, width, and height. */}
        {/* e.nativeEvent.layout: This object contains information about the layout of the component. */}
        {/* height: The height of the rendered Text component in pixels. */}

        {descriptionDialog && (
          <DescriptionDialog
            visible={descriptionDialog}
            hideDialog={hideDialog}
            description={descriptionText}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  opacity: {
    width: '25%',
    marginBottom: 10,
  },
  readMore: {
    color: 'blue',
    marginLeft: 32,
  },
  elevation: {
    elevation: 10, //android

    //ios
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 6,
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
    marginLeft: 5,
  },
  text: {
    fontSize: 17,
  },
  description: {
    marginBottom: 10,
    marginLeft: 5,
  },
  label: {
    // fontWeight: '300',
    color: '#5D5D60',
  },
});

// const maxHeight = 60;
// const maxWidth = 290;
// const onTextLayout = e => {
//   const {height, width} = e.nativeEvent.layout;
//   console.log(e.nativeEvent.layout); //gives x,y, width, height
//   console.log('height', height);
//   // setTextHeight(height);
//   if (height > maxHeight && width > maxWidth) setShowMore(true);
//   else setShowMore(false);
// };
// numberOfLines={3}
// onLayout={onTextLayout}
