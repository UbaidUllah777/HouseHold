import React,{useState} from 'react'
import { StyleSheet, View,TextInput,Platform} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from "../components/auth/UserInput"
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


 function ResetPassword() {
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState("");
  return (

      <KeyboardAwareScrollView
  enableOnAndroid={true}
  enableAutomaticScroll={(Platform.OS === 'ios')}
>
    <View >
      <Text title bold center style={{
        fontFamily:"poppins",
        marginTop:20,
        marginBottom:20,
        fontWeight:700,
        marginTop:'25%'
      }}>Reset Password</Text>
      <Text center style={{
        fontFamily:"poppins",
        marginTop:2,
        marginBottom:20,
        fontWeight:400,
        marginBottom:'15%',
      }}>Please enter your email address to 
      request a password reset</Text>
      <UserInput name="Email"  value={email} setValue={setEmail} autoComplete="email" keyboardType="email-address" />

    <Button
              title="Send OTP"

              iconRight
              iconContainerStyle={{ marginLeft: 20 }}
              titleStyle={{ fontWeight: '600',fontFamily:'poppins' }}
              buttonStyle={{
                backgroundColor: '#1C552B',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 25,
                paddingVertical:15,
              }}

              containerStyle={{
              
                marginHorizontal: 50,
                marginVertical: 5,
                paddingTop:10,
              }}
            />




    </View>
        </KeyboardAwareScrollView>

   
  )
}

const styles = StyleSheet.create({})

export default ResetPassword