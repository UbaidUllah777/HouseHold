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
<Stack.Navigator initialRouteName="GetStarted"   screenOptions={{
    headerShown: false
  }}>
<Stack.Screen name="GetStarted" component={GetStarted} />
<Stack.Screen name="SignUp" component={SignUp} />
<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
<Stack.Screen name="ResetPassword" component={ResetPassword} />
</Stack.Navigator>
</NavigationContainer>
  );
}
