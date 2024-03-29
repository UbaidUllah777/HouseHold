import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Octicons } from '@expo/vector-icons';

const ViewFoodBanks = ({ navigation }) => {

  const [foodBanks, setFoodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulating fetching food banks data
    setFoodBanks([
        {
            "foodBankId": "fb5",
            "foodBankName": "Al Muraqqabat food bank",
            "foodBankAddress": "123 Al Muraqqabat Street, Dubai",
            "foodBankPhone": "+971 4 123 4567",
            "foodBankImagesrc": require('../assets/foodbank.png')
          },
          {
            "foodBankId": "fb6",
            "foodBankName": "Al Rashidiya food bank",
            "foodBankAddress": "456 Al Rashidiya Avenue, Dubai",
            "foodBankPhone": "+971 4 765 4321",
            "foodBankImagesrc": require('../assets/foodbank.png')
          },
          {
            "foodBankId": "fb7",
            "foodBankName": "Al Satwa food bank",
            "foodBankAddress": "789 Al Satwa Road, Dubai",
            "foodBankPhone": "+971 4 987 6543",
            "foodBankImagesrc": require('../assets/foodbank.png')
          },
          {
            "foodBankId": "fb8",
            "foodBankName": "Al Nahda food bank",
            "foodBankAddress": "321 Al Nahda Street, Dubai",
            "foodBankPhone": "+971 4 321 0987",
            "foodBankImagesrc": require('../assets/foodbank.png')
          },
          {
            "foodBankId": "fb9",
            "foodBankName": "Al Karama food bank",
            "foodBankAddress": "567 Al Karama Avenue, Dubai",
            "foodBankPhone": "+971 4 567 8901",
            "foodBankImagesrc": require('../assets/foodbank.png')
          },
          {
            "foodBankId": "fb10",
            "foodBankName": "Al Qusais food bank",
            "foodBankAddress": "890 Al Qusais Road, Dubai",
            "foodBankPhone": "+971 4 890 1234",
            "foodBankImagesrc": require('../assets/foodbank.png')
          }
          
    ]);
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItemCards = () => {
    return foodBanks
      .filter(item => item.foodBankName.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToDetail(item)}>
          <View style={styles.foodItemCard}>
            <Image source={item.foodBankImagesrc} style={styles.foodItemImage} />
            <Text center style={styles.foodBankName}>{item.foodBankName}</Text>
            <TouchableOpacity onPress={() => navigateToDetail(item)}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ));
  };

  const navigateToDetail = (item) => {
    navigation.navigate('FoodBankDetail', { 
      foodBankId: item.foodBankId,
      foodBankName: item.foodBankName,
      foodBankAddress: item.foodBankAddress,
      foodBankPhone: item.foodBankPhone,
      foodBankImagesrc: item.foodBankImagesrc
    });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text title bold center style={styles.heading}>
          View food banks
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search food items"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Octicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        style={{ flex: 1 }}
      >
        <View style={styles.gridContainer}>{renderItemCards()}</View>
      </KeyboardAwareScrollView>
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterIcon: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#1C552B',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  foodItemCard: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    width: 155,
  },
  foodItemImage: {
    resizeMode: 'contain',
    width: 145,
    height: 110,
    borderRadius:30
  },
  foodBankName: {
    fontFamily: 'poppins',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'poppins',
    textAlign: 'center',
    backgroundColor: '#1C552B',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ViewFoodBanks;
