import React from 'react';
import { useFonts } from 'expo-font';
import GetStarted from './Screens/GetStarted';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import LoginWithPhone from './Screens/LoginWithPhone';
import ForgotPassword from './Screens/ForgotPassword';
import ResetPassword from './Screens/ResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import AddFoodItem from './Screens/AddFoodItem';
import ViewFoodItems from './Screens/ViewFoodItems';
import ItemDetailScreen from './Screens/ItemDetailScreen';
import ViewFoodBanks from './Screens/ViewFoodBanks';
import FoodBankDetail from './Screens/FoodBankDetail';
import ScanExpiryDate from './Screens/ScanExpiryDate';
import FoodBanksInMap from './Screens/FoodBanksInMap';


import {AuthProvider} from "./context/auth"




const Stack = createNativeStackNavigator();
export default function App() {
    // Load the 'poppins' font
    const [fontsLoaded] = useFonts({
      poppins: require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    });
  
    if (!fontsLoaded) {
      return null;
    }
  return (
<NavigationContainer>
<AuthProvider>
<Stack.Navigator initialRouteName="Login"   screenOptions={{
    headerShown: false
  }}>
<Stack.Screen name="GetStarted" component={GetStarted} />
<Stack.Screen name="SignUp" component={SignUp} />
<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
<Stack.Screen name="ResetPassword" component={ResetPassword} />
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="AddFoodItem" component={AddFoodItem} />
<Stack.Screen name="ViewFoodItems" component={ViewFoodItems} />
<Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
<Stack.Screen name="ViewFoodBanks" component={ViewFoodBanks} />
<Stack.Screen name="FoodBankDetail" component={FoodBankDetail} />
<Stack.Screen name="ScanExpiryDate" component={ScanExpiryDate} />
<Stack.Screen name="FoodBanksInMap" component={FoodBanksInMap} />
</Stack.Navigator>
</AuthProvider>
</NavigationContainer>
  );
}
