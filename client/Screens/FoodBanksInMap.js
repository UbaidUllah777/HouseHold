import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

const FoodBanksInMap = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 25.276987,
    longitude: 55.296249,
  });

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text title bold center style={styles.heading}>
          Find nearby food bank
        </Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Selected Location"
            />
          )}
        </MapView>
      </View>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search food item"
          onPress={(data, details = null) => {
            console.log(data, details);
            setSelectedLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          fetchDetails={true}
          styles={{
            textInput: {
              height: 50,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              paddingHorizontal: 15,
              opacity: 0.9,
            },
            container: {
              width: '100%',
              paddingHorizontal: 20,
            },
            listView: {
              backgroundColor: '#ffffff',
              borderRadius: 20,
              marginTop: 10,
            },
          }}
          query={{
            key: 'OUR_GOOGLE_PLACES_API_KEY_WILL_COME_HERE',
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={300}
        />
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image
            source={require('../assets/backArrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    marginTop: 150,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  map: {
    flex: 1,
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
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  searchContainer: {
    position: 'absolute',
    top: 170,
    left: 20,
    right: 20,
  },
});

export default FoodBanksInMap;
