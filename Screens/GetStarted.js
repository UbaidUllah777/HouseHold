import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, ButtonGroup, withTheme } from '@rneui/themed';

export default function GetStarted({navigation}) {
    return (
        <View style={styles.container}>
          <Text style={styles.HomeText}>Bytes of Flavor, Zero Waste Savior:  “House Hold” – Elevate Your Kitchen Experience!</Text>
          <Image  style={styles.HomeLogo} source = {require('../assets/HouseHoldLogo.png')} />
          <Button
                  title="GET STARTED"
                  onPress={() => navigation.navigate("SignUp")}

                  buttonStyle={{
                    borderColor: 'rgba(78, 116, 289, 1)',
                  }}
                  type="outline"
                  titleStyle={{ color: 'wheat' }}
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 50,
                    borderRadius:5,
                    paddingTop:50
                  }}
                />
    
    
          <StatusBar style="auto" />
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C552B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    HomeText: {
    marginRight:15,
    marginLeft:15,
    fontSize:22,
    color:'wheat',
    marginBottom:'15%'
  
     
    },
    HomeLogo: {
  
  width:200,
  height:200,
     
    },
  });
  