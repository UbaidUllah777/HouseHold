import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';

const Review = ({ navigation }) => {




  const [rating, setRating] = useState(0); // Current rating selected by the user
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Load the 'poppins' font
  const [fontsLoaded] = useFonts({
    poppins: require('../assets/fonts/poppins/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  // Function to handle rating selection
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Function to get the text based on the rating
  const getRatingText = () => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "How was your experience ?";
    }
  };

  // Function to handle modal close
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate("Home")
  };

  // Function to handle submission
  const handleSubmit = () => {
    if (rating !== 0) {
      setModalVisible(true);
    }
  };
  
        // Function to handle navigation back
        const goBack = () => {
          navigation.goBack();
      };

  return (
    <View style={styles.container}>
      <View  style={styles.backButtonContainer} >
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
            </TouchableOpacity>
      </View>
      <Image source={require('../assets/reviewImage.png')} style={styles.image} />
      <View style={{width:"70%", alignSelf:"center"}}>
      <Text style={styles.questionText}>How was your experience?</Text>
      </View>
      <Text style={[styles.ratingText, rating >= 3 ? styles.goodRating : styles.poorRating, rating === 0 ? styles.noRating : null]}>

          {getRatingText()}
        </Text>
      <View style={styles.starsContainer}>
  {[1, 2, 3, 4, 5].map((index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleRating(index)}
      style={{ marginLeft: 8 }} // Adjust the marginLeft here
    >
      <AntDesign
        name={index <= rating ? 'star' : 'staro'}
        size={30}
        color={index <= rating ? '#FFC529' : 'black'}
      />
    </TouchableOpacity>
  ))}
      </View>

      <View style={{width:"70%", alignSelf:"center"}}>
              
            <TextInput
                            style={{
                                borderBottomWidth: 0.5,
                                height: 48,
                                borderBottomColor: '#8e93a1',
                                marginBottom: 30,
                                fontFamily: 'poppins',
                              }}
                        placeholder="Write review"
                
                        placeholderTextColor="#11182744"

                

                      />
            </View>


<Button
            title="Submit"
            onPress={handleSubmit}
             disabled={rating === 0}
            titleStyle={{ fontWeight: '600', fontFamily: 'poppins', color: 'white' }}
            buttonStyle={{
              backgroundColor: '#1C552B',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 25,
              paddingVertical: 12,
              paddingHorizontal: 60
            }}
          />
          
          <Modal visible={modalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <AntDesign name="close" size={24} color="#1C552B" />
      </TouchableOpacity>
      <Image source={require('../assets/modalImage.png')} style={styles.modalImage} />
      <Text style={styles.thankYouText}>Thank you for your review!</Text>
      <Text style={styles.successText}>Your review has been submitted successfully.</Text>
    </View>
  </View>
        </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    width: 20,
    height: 20,
  
},
backButtonContainer: {
  position: 'absolute',
  top: 30,
  left: 10,
  zIndex: 1,
  bottom:10
},
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, 
    padding:10,
    backgroundColor:"#fefefe",
    borderRadius:10
},
  
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:"poppins",
    alignSelf:"center",
    alignItems:"center",
    textAlign:"center"
  },
  noRating: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "poppins",
    color: "gray",
  },
  

poorRating: {
  fontSize: 18,
  marginBottom: 10,
  fontFamily: "poppins",
  color: "red",
},
goodRating: {
  fontSize: 18,
  marginBottom: 10,
  fontFamily: "poppins",
  color: "green",
},
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%', 
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 25, 
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'poppins',
    color: '#1C552B',
  },
  successText: {
    fontSize: 14,
    fontFamily: 'poppins',
    marginBottom: 20,
    textAlign: 'center',
    color:"#1C552B"
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
});

export default Review;
