import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GetStarted({ navigation }) {

  // Load the 'poppins' font
  const [fontsLoaded] = useFonts({
    poppins: require('../assets/fonts/poppins/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/GTBG4.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.HomeText}>
            Bytes of Flavor, Zero Waste Savior: “House Hold” – Elevate Your Kitchen Experience!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
            titleStyle={{ fontWeight: '600', fontFamily: 'poppins', color: 'black' }}
            buttonStyle={{
              backgroundColor: '#F9F9Ff',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 25,
              paddingVertical: 12,
              paddingHorizontal: 40
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
    // paddingTop:30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: windowHeight * 0.2,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  HomeText: {
    marginRight: 15,
    marginLeft: 15,
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: windowHeight * 0.05,
    width: '100%',
    alignItems: 'center',
  },
});
