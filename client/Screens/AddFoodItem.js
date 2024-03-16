import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Image, Platform, Pressable, TouchableOpacity  } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import { Button } from '@rneui/themed';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

function AddFoodItem({ navigation }) {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [quantityORweight, setQuantityORweight] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [loading,setLoading]=useState(false);

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

      const handleSubmit=async()=>{
        setLoading(true)
        if( !category||  !itemName||  !expiryDate||  !quantityORweight  ){
          alert("All Fields Are Required!")
          setLoading(false)
          return
        }
        try {
          const {data} = await axios.post(`/add-food-item`,{
            category,
            itemName,
            expiryDate,
            quantityORweight,
            creator:signedUserId
            
          });
            if(data.error){
              alert(data.error)
              setLoading(false);
    
            }
            else{
    
              setLoading(false)
              console.log("ITEM ADDING UP SUCCESS =>",data)
              alert( `${itemName} Added Successfully`)
              // navigation.navigate("Home")
            }
        } catch (error) {
          alert("Adding Food Item Up Failed, please try again")
    
          console.log(error);
          setLoading(false)
    
          
        }
      }
    


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
    
      <View  style={{ marginHorizontal: 12,  marginBottom:10, opacity:.5,backgroundColor:"#fefefe", paddingHorizontal:10, borderRadius:20,height:60 }}>
   
                      <Picker     style={{
          borderBottomWidth: 0.5,
          height: 48,
          borderBottomColor: '#8e93a1',
          marginBottom: 30,
          fontFamily: 'poppins',
          borderWidth: 1, // Add border width
          borderColor: '#8e93a1', // Add border color
          borderRadius: 8, // Add border radius
          marginBottom: 20,
          fontFamily: 'poppins',
        }}
                          selectedValue={category}
                          onValueChange={(itemValue) => setCategory(itemValue)}
                      >
                          <Picker.Item label="Select category" value="" />
                          {foodCategories.map((category, index) => (
                              <Picker.Item key={index} label={category} value={category} />
                          ))}
                      </Picker>
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

        <Button
          title={!loading ? "Add": "Adding Item please wait"}
          onPress={handleSubmit}
          titleStyle={{ fontWeight: '600', fontFamily: 'poppins' }}
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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



});

export default AddFoodItem;
