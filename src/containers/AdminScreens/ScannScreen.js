import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LocalizationContext } from '../../constants';

export default ({ navigation }) => {
  const { t } = React.useContext(LocalizationContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data.indexOf('qexpoQrcode') > -1) {
      setDone(true)
      navigation.push('HomeScreen', data)
    } else {
      alert(t('Invalid discount code'))
    }
  };

  if (hasPermission === null) {
    return <Text>{t('Requesting for camera permission')}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{t('No access to camera')}</Text>;
  }

  return (
    <View style={styles.container}>
      {
        !done ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={t('Tap to Scan Again')} onPress={() => setScanned(false)} />}
          </>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
