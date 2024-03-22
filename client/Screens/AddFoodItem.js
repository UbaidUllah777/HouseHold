import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Image, Platform, Pressable, TouchableOpacity,Modal  } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import { Button } from '@rneui/themed';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown'
import FoodImage from '../components/UI/FoodImage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

function AddFoodItem({ navigation }) {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [quantityORweight, setQuantityORweight] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const [loading,setLoading]=useState(false);
  const [uploadImage,setUploadImage]=useState("")
  const [image, setImage]=useState({
    url:"",
    public_id:""
  })

  const [imageIsUplaoded, setImageIsUplaoded]= useState(false)

  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  // Function to handle modal close
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate("Home")
  };






  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
        toggleDatePicker();
      setExpiryDate(selectedDate);
    }
    toggleDatePicker();
  };


  const confirmIOSDate=()=>{
    setExpiryDate(expiryDate.toDateString());
    toggleDatePicker();

}
  // Context
  const [state, setState] = useContext(AuthContext);
      // List of food item categories
      const foodCategories = [
        'Dairy',
        'Fruit',
        'Vegetables',
        // Add more categories as needed
    ];

        // Function to handle navigation back
        const goBack = () => {
          navigation.goBack();
      };

       const signedUserId=state.user._id

    
    
    const handleImageUpload=async ()=>{

      let permissionResult =  await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (permissionResult.granted=== false) {
          alert("Camera access is required");
          return;
          }
          // get image from image Library
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4,3],
        base64: true,
        });
        // console.log("PICKER RESULT ==> ", pickerResult);

        // console.log("PICKER RESULT", pickerResult);
        if (pickerResult.canceled === true) {
          console.log("CANCELED")
          return;
          }
          // save to state for preview
          let base64Image = `data:image/jpg;base64,${pickerResult.assets[0].base64}`;
           setUploadImage(base64Image);
          
           
        
              try {
                // Send to backend for uploading to Cloudinary
                const { data } = await axios.post("/upload-image", { image: base64Image });

                // Log the response
                console.log("UPLOADED RESPONSE => ", data);

                // Update the image state with the response data
                setImage({
                  url: data.secure_url,
                  public_id: data.public_id
                });
                setImageIsUplaoded(true)

              } catch (error) {
                console.error("Error uploading image:", error);
                setImageIsUplaoded(false)
              }

    }

    const handleBarcodeScanNavigation=()=>{
      navigation.navigate("BarCodeScan")
    }
    const handleSubmit = async () => {
      setLoading(true);
      if (!category || !itemName || !expiryDate || !quantityORweight || !image) {
          alert("All Fields Are Required!");
          setLoading(false);
          return;
      }
      try {
          const { data } = await axios.post(`/add-food-item`, {
              category,
              itemName,
              expiryDate,
              quantityORweight,
              image,
              creator: signedUserId,
              creatorName: state.user.username 
          });
          if (data.error) {
              alert(data.error);
              setLoading(false);
          } else {
              setLoading(false);
              console.log("ITEM ADDING UP SUCCESS =>", data);
         
              // navigation.navigate("Home")

              

                setModalVisible(true);

          }
      } catch (error) {
          console.log("Error:", error.response.data); 
          alert("Adding Food Item Up Failed, please try again. Error: " + error.response.data.error); 
          setLoading(false);
      }
  };


  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {/* Header */}
      <View  style={styles.backButtonContainer} >
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
            </TouchableOpacity>
      </View>
      <View>
        <Text title bold center style={{
          fontFamily: "poppins",
          fontWeight: 700,
          marginTop:80,
          marginBottom: 20
        }}>Add Food Item</Text>
          <View style={{marginHorizontal: 24,}}>              
              <Text  style={{
                fontFamily: 'poppins',
                fontWeight:"700",
                marginBottom:5
                
                
              }}>Category<Text  style={{
                fontFamily: 'poppins',
                fontWeight:"700",
               color:"red"
                
                
              }}>*</Text></Text></View>
    
      <View  style={{ marginHorizontal: 12,  marginBottom:10, opacity:.6,backgroundColor:"#fefefe",  borderRadius:20,height:60 }}>
   
                        <SelectDropdown
                    buttonStyle={{ backgroundColor: "#fefefe" ,opacity:.6,width:"100%",marginTop:2, borderRadius:20,}}
                    buttonTextStyle={{fontFamily:"poppins" ,marginLeft:-5,fontWeight:"600"}}
                    data={foodCategories}
                    onSelect={(selectedItem, index) => {
                      setCategory(selectedItem); // Update the category state
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />


                  </View>

        <UserInput name="Item Name*" value={itemName} setValue={setItemName} />

        <View style={{ marginHorizontal: 24 }}>

        <Text style={{
        fontFamily: 'poppins',
        fontWeight:"700"
        
      }}>Expiry Date <Text style={{color:"red"}}>*</Text> </Text>
       {/* Show DateTimePicker if showPicker is true */}
       {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={expiryDate}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

                {showPicker && Platform.OS ==="ios" &&
                (
                <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}>
               <TouchableOpacity style={[styles.button,styles.pickerButton,{backgroundColor:"#11182711"}]} onPress={toggleDatePicker}>
                <Text>Cancel</Text>
               </TouchableOpacity>

               
               <TouchableOpacity style={[styles.button,styles.pickerButton,{backgroundColor:"#11182711"}]} onPress={confirmIOSDate}>
                <Text>Confirm</Text>
               </TouchableOpacity>
                </View>
                )
                }
        <Pressable onPress={toggleDatePicker}>
          <TextInput
                 style={{
                    borderBottomWidth: 0.5,
                    height: 48,
                    borderBottomColor: '#8e93a1',
                    marginBottom: 30,
                    fontFamily: 'poppins',
                  }}
            placeholder="Select Expiry Date"
            value={expiryDate.toDateString()} // Convert expiryDate to string
            placeholderTextColor="#11182744"
            editable={false}
            onPressIn={toggleDatePicker}

          />
        </Pressable>

        </View>
        
       

        <UserInput name="Quantity or weight*" value={quantityORweight} setValue={setQuantityORweight} />

        <View style={{marginHorizontal:40}}>
          <Text style={{ fontWeight: '700', fontFamily: 'poppins',marginBottom:10 }}>Select Food Image*</Text>
          <FoodImage>
                    {image && image.url? (
                        <Image
                        source={{ uri: image.url}}
                        style={{ resizeMode: "contain", width: 100, height: 100 }}
                        />
                        ) : uploadImage ? (
                        <Image
                        source={{ uri: uploadImage}}
                        style={{ resizeMode: "contain", width: 100, height: 100 }}
                        />
          ):(
         <TouchableOpacity onPress={handleImageUpload}>
          <FontAwesome5  name="camera" size={35} color="green" />
         </TouchableOpacity>
            )}
        </FoodImage>

                {image || image.url?(         <TouchableOpacity onPress={handleImageUpload}>
          <Text
            style={{alignSelf:"center", color:"green", fontFamily:"poppins", marginTop:-10}}
          
          >Change Image</Text>
         </TouchableOpacity>):<></>}
        </View>

        <Button
          title={!loading ? "Add": "Adding Item please wait"}
          onPress={handleSubmit}
          titleStyle={{ fontWeight: '600', fontFamily: 'poppins' }}
          disabled={!(imageIsUplaoded)}
          buttonStyle={{
            backgroundColor: '#1C552B',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 25,
            paddingVertical: 15,
          }}
          containerStyle={{
            marginHorizontal: 50,
            marginVertical: 25,
            paddingTop: 10,
          }}
        />


    <Button
              title="Scan"
              titleStyle={{ fontWeight: '600', fontFamily: 'poppins' }}
              onPress={handleBarcodeScanNavigation}
              buttonStyle={{
                backgroundColor: 'black',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 25,
                paddingVertical: 15,
              }}
              containerStyle={{
                marginHorizontal: 50,
                marginVertical: 5,
                
              }}
            />
      </View>


      <Modal visible={modalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <AntDesign name="close" size={24} color="#1C552B" />
      </TouchableOpacity>
      <Image source={require('../assets/modalImage.png')} style={styles.modalImage} />
      <Text style={styles.thankYouText}>Item adding Successful!</Text>
      <Text style={styles.successText}>You have added Food Item successfully.</Text>
    </View>
  </View>
          </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({

  
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


  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontFamily: "poppins",
    fontWeight: "700",
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    fontFamily: "poppins",
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#11182744',
    padding: 10,
    marginBottom: 20,
  },
  datePicker:{
    height:120,
    marginTop:-10
  },

pickerButton:{
    paddingHorizontal:20,
},
button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
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

});

export default AddFoodItem;
