import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Platform, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function BlogDetail({ route }) {
  const { title, text, detail,paraTwo } = route.params;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
              <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        style={{ flex: 1 }}
      >
 
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.blogText}>{text}</Text>
      <Text style={styles.blogDetails}>{detail}</Text>
      <Text style={styles.blogDetails}>{paraTwo}</Text>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "poppins",
    textAlign:"justify",
    marginTop:65
  },
  blogText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "poppins",
    color:"#1C552B"
  },
  blogDetails: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "poppins",
    textAlign:"justify"
  },
});
