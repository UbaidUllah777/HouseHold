import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Platform, Pressable, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import { Button } from '@rneui/themed';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

function AddFoodItem({ navigation }) {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [quantityORweight, setQuantityORweight] = useState('');
  const [showPicker, setShowPicker] = useState(false);

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

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <Text title bold center style={{
          fontFamily: "poppins",
          fontWeight: 700,
          marginTop: 20,
          marginBottom: 20
        }}>Add Food Item</Text>

        <UserInput name="Category*" value={category} setValue={setCategory} />

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
          title="Add"
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
            marginVertical: 50,
            paddingTop: 10,
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



});

export default AddFoodItem;
