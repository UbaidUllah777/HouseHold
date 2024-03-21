import React,{useState, useContext} from 'react'
import { StyleSheet, View,Platform,Modal,TouchableOpacity,Image} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from "../components/auth/UserInput"
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

 function LoginWithPhone({navigation}) {
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");

  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    // Function to handle modal close
    const closeModal = () => {
      setModalVisible(false);
      navigation.navigate("Home")
    };


  // context
  const[state,setState]=useContext(AuthContext)


  const handleSubmit=async()=>{
    setLoading(true)
    if(  !phoneNumber ||   !password  ){
      alert("All Fields Are Required!")
      setLoading(false)
      return
    }
    try {
      const {data} = await axios.post(`/signin-with-phone`,{
        phoneNumber,
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
      // alert("SIGNED IN SUCCESSFULLY")
      
      // navigation.navigate("Home")

      
      setModalVisible(true);
    };


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
      }}>Login With Phone Number</Text>
    <UserInput name="Phone Number"  value={phoneNumber} setValue={setPhoneNumber} />
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
    <Modal visible={modalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <AntDesign name="close" size={24} color="#1C552B" />
      </TouchableOpacity>
      <Image source={require('../assets/modalImage.png')} style={styles.modalImage} />
      <Text style={styles.thankYouText}>Login Successful!</Text>
      <Text style={styles.successText}>You have Loggged in to  your account successfully.</Text>
    </View>
  </View>
          </Modal>
        </KeyboardAwareScrollView>

   
  )
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
})

export default LoginWithPhone