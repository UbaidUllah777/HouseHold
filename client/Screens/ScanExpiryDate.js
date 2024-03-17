import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const ScanExpiryDate = () => {
  const [scannedExpiryDate, setScannedExpiryDate] = useState(null);


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Expiry Date</Text>
      <Button title="Start Scanning" onPress={startScanning} />
      {scannedExpiryDate && (
        <Text style={styles.scannedText}>Scanned Expiry Date: {scannedExpiryDate}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scannedText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default ScanExpiryDate;
