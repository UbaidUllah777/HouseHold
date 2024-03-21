import React,{useState, useContext} from 'react'
import { StyleSheet, View,ScrollView,Platform,Modal,TouchableOpacity,Image} from 'react-native'
import  Text from '@kaloraat/react-native-text'
import UserInput from '../components/auth/UserInput';
import { Button} from '@rneui/themed';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';


 function SignUp({navigation}) {
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");
  
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    // Function to handle modal close
    const closeModal = () => {
      setModalVisible(false);
      navigation.navigate("Login")
    };

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
          // alert("SIGN UP SUCCESSFULLY")
          // navigation.navigate("Home")
          setModalVisible(true);
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
     <Modal visible={modalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <AntDesign name="close" size={24} color="#1C552B" />
      </TouchableOpacity>
      <Image source={require('../assets/modalImage.png')} style={styles.modalImage} />
      <Text style={styles.thankYouText}>Sign Up Successful!</Text>
      <Text style={styles.successText}>You have created your account successfully.</Text>
    </View>
  </View>
          </Modal>
     </KeyboardAwareScrollView>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
});

export default SignUp