import React,{useState, useContext} from 'react'
import { StyleSheet, View,ScrollView,Platform} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from '../components/auth/UserInput';
import { Button} from '@rneui/themed';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';


 function SignUp({navigation}) {
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");

  //Context
  const[state,setState]=useContext(AuthContext)



  const handleSubmit=async()=>{
    setLoading(true)
    if( !username||  !email||  !phoneNumber||  !password  ){
      alert("All Fields Are Required!")
      setLoading(false)
      return
    }
    try {
      const {data} = await axios.post(`/signup`,{
        username,
        email,
        phoneNumber,
        password 
      });
        if(data.error){
          alert(data.error)
          setLoading(false);

        }
        else{

          //save to context
          setState(data);
          // save response in async storage
          await AsyncStorage.setItem("@auth", JSON.stringify(data));
          setLoading(false)
          console.log("SIGN UP SUCCESS =>",data)
          alert("SIGN UP SUCCESSFULLY")
          navigation.navigate("Home")
        }
    } catch (error) {
      alert("Signing Up Failed, please try again")

      console.log(error);
      setLoading(false)

      
    }
  }



  return (
<KeyboardAwareScrollView contentContainerStyle={styles.container}>
     <View>
     <Text title bold center style={{
        fontFamily:"poppins",
        fontWeight:700,
        marginTop:20,
        marginBottom:20
      }}>Sign Up</Text>
    <UserInput name="Username" value={username} setValue={setUserName} autoCapitalize="words" autoCorrect={false} />
    <UserInput name="Email"  value={email} setValue={setEmail} autoComplete="email" keyboardType="email-address" />
    <UserInput name="Phone Number"  value={phoneNumber} setValue={setPhoneNumber} />
    <UserInput name="Password"  value={password} setValue={setPassword} secureTextEntry={true} autoComplete="password" />
    {/* <Text>{JSON.stringify({username,email,phoneNumber,password},null,4)}</Text> */}
    <Button
  onPress={handleSubmit}
  title={loading ? "Please Wait..." : "Sign Up"}
  icon={loading ? null : { // Conditionally render the icon based on loading state
    name: 'user',
    type: 'font-awesome',
    size: 20,
    color: 'white',
  }}
  iconRight={!loading} // Set iconRight based on loading state
  iconContainerStyle={{ marginLeft: 20 }}
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
<Text center>Already have account? <Text onPress={() => navigation.navigate("Login")} color="green">Login</Text></Text>
     </View>

     </KeyboardAwareScrollView>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default SignUp