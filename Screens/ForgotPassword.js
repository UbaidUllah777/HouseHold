import React,{useState} from 'react'
import { StyleSheet, View,TextInput,Platform} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from "../components/auth/UserInput"
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { OtpInput } from "react-native-otp-entry";


 function ForgotPassword() {
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");
  return (

      <KeyboardAwareScrollView
  enableOnAndroid={true}
  enableAutomaticScroll={(Platform.OS === 'ios')}
>
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
  onFilled={(text) => console.log(`OTP is ${text}`)}
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

    <Text center style={{marginTop:30}}>I don’t recevie a code! <Text color="green"> Please resend</Text> </Text>


    </View>
        </KeyboardAwareScrollView>

   
  )
}

const styles = StyleSheet.create({})

export default ForgotPassword