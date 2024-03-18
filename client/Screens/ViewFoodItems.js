import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Platform,ActivityIndicator } from 'react-native';
import Text from '@kaloraat/react-native-text';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Octicons } from '@expo/vector-icons';
import { AuthContext } from "../context/auth";


const ViewFoodItems = ({ navigation,route }) => {
  const [state, setState] = useContext(AuthContext)
  const signedInUserID= state.user._id

    // Inside the component
    useEffect(() => {
      // Check if there are updated item data passed from the ItemDetailScreen
      if (route.params && route.params.updatedItem) {
        // Update the state with the updated item data
        setFoodItems(prevFoodItems => {
          const updatedItemId = route.params.updatedItem._id;
          return prevFoodItems.map(item => {
            if (item._id === updatedItemId) {
              // Replace the old item with the updated item
              return route.params.updatedItem;
            } else {
              return item;
            }
          });
        });
      }
    }, [route.params]);

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      // Send a request to fetch food items for the signed-in user
      const response = await axios.get(`/food-items?creator=${signedInUserID}`);
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
    return foodItems
      .filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToDetail(item)}>
          <View style={styles.foodItemCard}>
            <Image source={require('../assets/cocoloate.png')} style={styles.foodItemImage} />
            <Text center style={styles.itemName}>{item.itemName}</Text>
            <TouchableOpacity onPress={() => navigateToDetail(item)}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ));
  };

  const navigateToDetail = (item) => {
    navigation.navigate('ItemDetail', { item });
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search food items"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterIcon}>
             <Octicons name="filter" size={24} color="white"  />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        style={{ flex: 1 }}
      >
        {loading ? 
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1C552B" />
            <Text style={styles.loadingText}>Loading Please Wait...</Text>
          </View>
         : 
          <View style={styles.gridContainer}>{renderItemCards()}</View>
        }
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
    backgroundColor: '#1C552B',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  loadingContainer: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 50,
    fontFamily: 'poppins',
    fontWeight: '700',
    fontSize: 22,
    color:"black"
  },
});

export default ViewFoodItems;
