import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import Text from '@kaloraat/react-native-text';

function UserInput({ name, value, setValue,
   autoCapitalize="none",
    autoCorrect=false, 
    autoComplete="off", 
    keyboardType="default",
    secureTextEntry =false,
    placeholder="",
    onChangeText=false
  }) {
  // Load the 'poppins' font
  const [fontsLoaded] = useFonts({
    poppins: require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text style={{
        fontFamily: 'poppins',
        fontWeight:"700"
        
      }}>{name}</Text>
      <TextInput
        style={{
          borderBottomWidth: 0.5,
          height: 48,
          borderBottomColor: '#8e93a1',
          marginBottom: 30,
          fontFamily: 'poppins',
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        secureTextEntry ={secureTextEntry}
        placeholder={placeholder}
       


        
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default UserInput;
