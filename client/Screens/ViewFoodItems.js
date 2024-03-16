import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity,  Platform } from 'react-native';
import Text from '@kaloraat/react-native-text';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@rneui/themed';


const ViewFoodItems = ({ navigation }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/food-items');
      setFoodItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching food items:', error);
      setLoading(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItemCards = () => {
    return foodItems.map((item, index) => (
        <View  key={index} style={styles.foodItemCard}>
          <Image source={require('../assets/cocoloate.png')} style={styles.foodItemImage} />
          <Text center style={styles.itemName}>{item.itemName}</Text>
          <TouchableOpacity key={index} onPress={() => navigateToDetail(item)}>

          <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
    
    ));
  };

  const navigateToDetail = (item) => {
    // Navigate to item detail screen with item data
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
          View added food items
        </Text>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
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
    width: 100,
    height: 100,
  },
  itemName: {
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
    backgroundColor:'green',
    paddingTop:8,
    paddingBottom:8,
    paddingRight:25,
    paddingLeft:25,
    borderRadius:10
  },
});

export default ViewFoodItems;
