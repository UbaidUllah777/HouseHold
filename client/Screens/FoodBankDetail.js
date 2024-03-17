import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Octicons } from '@expo/vector-icons';

const FoodBankDetail = ({ navigation, route }) => {
  const { foodBankId, foodBankName, foodBankAddress, foodBankPhone, foodBankImagesrc } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text title bold center style={styles.heading}>
            Food Bank Details
          </Text>
          <Text center style={styles.foodBankName}>{foodBankName}</Text>
        </View>

        <View style={styles.imageContainer}>
            <Image source={foodBankImagesrc} style={styles.foodBankImage} />
            </View>

        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}> <Text style={styles.labelText}>Address:</Text> {foodBankAddress}</Text>
          <Text style={styles.detailText}><Text style={styles.labelText}>Phone:</Text> {foodBankPhone}</Text>
        </View>


      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
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
  titleContainer: {
    marginTop: 80,
    marginBottom: 20,
  },
  heading: {
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  foodBankName: {
    fontFamily: 'poppins',
    fontWeight: '700',
    fontSize: 22,
    marginTop: 50,
    color:"#1C552B"
  },
  detailsContainer: {
    padding: 20,
  },
  detailText: {
    fontFamily: 'poppins',
    fontSize: 18,
    marginBottom: 10,
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodBankImage: {
    width: "90%",
    height: 200,
    resizeMode: 'cover',
  },
  labelText:{
    fontFamily: 'poppins',
    fontSize: 22,
    fontWeight:"700",
    marginBottom: 10,
  }
});

export default FoodBankDetail;
