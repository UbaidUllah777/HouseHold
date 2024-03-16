import React,{useState, useContext} from 'react'
import { StyleSheet, View,Platform} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from "../components/auth/UserInput"
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

 function Login({navigation}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");

  // context
  const[state,setState]=useContext(AuthContext)


  const handleSubmit=async()=>{
    setLoading(true)
    if(  !email||   !password  ){
      alert("All Fields Are Required!")
      setLoading(false)
      return
    }
    try {
      const {data} = await axios.post(`/signin`,{
        email,
        password 
      });
      if(data.error){
        alert(data.error);
        setLoading(false);
      }
    else{   

      setState(data)
      // save response in async storage
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
       setLoading(false)
      console.log("SIGN IN SUCCESS =>",data)
      alert("SIGNED IN SUCCESSFULLY")};
      navigation.navigate("Home")
    } catch (error) {
      alert("Logging In Failed, please try again")
      console.log(error);
      setLoading(false)

      
    }
  }


  const loadFromAsyncStorage = async () => {
    let data= await AsyncStorage.getItem("@auth");
    console.log("FROM ASYNC STORAGE => ", data);
    };
    loadFromAsyncStorage();

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
      }}>Login With Email</Text>
    <UserInput name="Email"  value={email} setValue={setEmail} />
    <UserInput name="Password"  value={password} setValue={setPassword} secureTextEntry={true} autoComplete="password"  />

    <Text  onPress={() => navigation.navigate("ResetPassword")} center style={{
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
              title="Phone Number"
              onPress={() => navigation.navigate("LoginWithPhone")}
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

export default Login