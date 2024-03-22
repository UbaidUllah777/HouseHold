import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "@rneui/themed";
import { useFonts } from "expo-font";
import Text from "@kaloraat/react-native-text";

const { width, height } = Dimensions.get("window");

export default function BarCodeScan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const animatedValue = new Animated.Value(0);

  const [fontsLoaded] = useFonts({
    poppins: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!scanned) {
      // Start the animation when barcode scanning is active
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start(({ finished }) => {
        if (finished) {
          console.log("Animation loop finished");
        }
      });
    } else {
      // Stop the animation when barcode scanning is finished
      Animated.timing(animatedValue).stop();
    }
  }, [scanned, animatedValue]);
  


  const resetBarcodeScan = () => {
    setScanned(false);
  };




  const handleBarCodeScanned = ({  textBlocks }) => {
    setScanned(true);
    console.log(` Scan Result :  ${textBlocks} `);


  };
  
  // Function to handle navigation back
  const goBack = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image
            source={require("../assets/backArrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>
       
      </View>

      <View>
      <Text
          title
          bold
          center
          style={{
            fontFamily: "poppins",
            fontWeight: 700,
            marginTop: 100,
            marginBottom: 20,
         
          }}
        >
          Scan barcode
        </Text>
      </View>

      <View style={styles.cameraContainer}>
    <Camera
  
        onTextRecognized={scanned ? undefined : handleBarCodeScanned}
  style={styles.camera}
  ratio="1:1"
/>
        <View style={styles.overlay}>
          <View style={styles.borderLeftTop} />
          <View style={styles.borderRightTop} />
          <View style={styles.borderLeftBottom} />
          <View style={styles.borderRightBottom} />
        </View>
        <Animated.View
          style={[
            styles.line,
            {
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 280],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Scan Again"
            onPress={resetBarcodeScan}
            titleStyle={{ fontWeight: "600", fontFamily: "poppins" }}
            buttonStyle={{
              backgroundColor: "#1C552B",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 25,
              paddingVertical: 13,
              paddingHorizontal: 40,
              marginVertical: 10,
            }}
            containerStyle={{
              marginHorizontal: 50,
              marginVertical: 5,
              paddingTop: 10,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: "#fefefe",
    borderRadius: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
  },

  backButtonContainer: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
    bottom: 10,
  },
 titleContainer: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
    bottom: 10,
  },
  cameraContainer: {
    width: width * 0.8,
    height: width * 0.8,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  line: {
    position: "absolute",
    left: width * 0.05,
    right: width * 0.05,
    height: 2,
    backgroundColor: "red",
    width: "90%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  borderLeftTop: {
    position: "absolute",
    top: -5,
    left: -5,
    width: 25,
    height: 25,
    borderColor: "grey",
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  borderRightTop: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 25,
    height: 25,
    borderColor: "grey",
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  borderLeftBottom: {
    position: "absolute",
    bottom: -5,
    left: -5,
    width: 25,
    height: 25,
    borderColor: "grey",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  borderRightBottom: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 25,
    height: 25,
    borderColor: "grey",
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
