import React,{useState} from 'react'
import { StyleSheet, View,TextInput,Platform} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from "../components/auth/UserInput"
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';



 function LoginWithPhone({navigation}) {
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");



  const handleSubmit=async()=>{
    setLoading(true)
    if(  !password||   !phoneNumber  ){
      alert("All Fields Are Required!")
      setLoading(false)
      return
    }
    try {
      const {data} = await axios.post('http://localhost:8081/api/signin',{
      
        phoneNumber,
        password
      });
        setLoading(false)
      console.log("SIGN IN SUCCESS =>",data)
      alert("SIGNED IN SUCCESSFULLY")
    } catch (error) {
      console.log(error);
      setLoading(false)

      
    }
  }




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
        marginBottom:'15%',
        marginTop:'25%'
      }}>Login With Phone Number</Text>
    <UserInput name="Phone Number"  value={phoneNumber} setValue={setPhoneNumber} />
    <UserInput name="Password"  value={password} setValue={setPassword} secureTextEntry={true} autoComplete="password" />

    <Text onPress={() => navigation.navigate("ResetPassword")}  center style={{
      color:"green",
    }}>Forgot password?</Text>
    <Button
              
              onPress={handleSubmit}
              title={loading ? "Please Wait..." : "Log In"}

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
                <Text center style={{
      color:"gray",
      marginTop:20
    }}>Don’t have an account? <Text onPress={() => navigation.navigate("SignUp")} color="green">Sign Up</Text></Text>


<Text center style={{
      color:"gray",
      marginTop:20
    }}>________ or  Sign In With ________</Text>

<Button
              title="Email"
              onPress={() => navigation.navigate("Login")} 
              titleStyle={{ fontWeight: '600',fontFamily:'poppins', color:'black' }}
              buttonStyle={{
                backgroundColor: '#F9F9Ff',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 25,
                paddingVertical:15,
              }}

              containerStyle={{
              
                marginHorizontal: 50,
                marginVertical: 10,
                paddingTop:10,
              }}
            />

    </View>
        </KeyboardAwareScrollView>

   
  )
}

const styles = StyleSheet.create({})

export default LoginWithPhone