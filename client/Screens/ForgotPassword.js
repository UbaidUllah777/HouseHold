import React,{useState} from 'react'
import { StyleSheet, View,TextInput,Platform, TouchableOpacity,Image} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from "../components/auth/UserInput"
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { OtpInput } from "react-native-otp-entry";


 function ForgotPassword({navigation}) {
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");


        // Function to handle navigation back
        const goBack = () => {
          navigation.goBack();
      };

  const handleSubmit=(text)=>{
    alert("Incorrect OTP")
  }

  const showAlert=(text)=>{
    alert("OTP Sent")
  }


  return (

      <KeyboardAwareScrollView
  enableOnAndroid={true}
  enableAutomaticScroll={(Platform.OS === 'ios')}
>
<View  style={styles.backButtonContainer} >
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
            </TouchableOpacity>
      </View>
    <View  style={{marginTop:"10%"}}>
      <Text title bold center style={{
        fontFamily:"poppins",
        marginTop:20,
        marginBottom:20,
        fontWeight:700,
        marginBottom:'15%',
        marginTop:'25%'
      }}>Vefification Code</Text>
<View style={{marginHorizontal:"10%"}}>
<OtpInput
  numberOfDigits={4}
  focusColor="green"
  focusStickBlinkingDuration={500}
  onTextChange={(text) => console.log(text)}
  onFilled={(text) => handleSubmit(text)}
  theme={{
    containerStyle: styles.container,
    inputsContainerStyle: styles.inputsContainer,
    pinCodeContainerStyle: styles.pinCodeContainer,
    pinCodeTextStyle: styles.pinCodeText,
    focusStickStyle: styles.focusStick,
    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
  }}
/>
</View>


      <TouchableOpacity onPress={showAlert}>
          <Text center style={{marginTop:30}}>I don’t recevie a code! 
            <Text color="green" > Please resend</Text> 
          
          
            </Text>
            </TouchableOpacity> 


    </View>
        </KeyboardAwareScrollView>

   
  )
}

const styles = StyleSheet.create({
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
})

export default ForgotPassword