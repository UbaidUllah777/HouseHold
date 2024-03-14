import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";

import { StyleSheet, View, Platform, Image } from 'react-native'
import UserInput from "../components/auth/UserInput"
import { Button } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuButton from "../components/UI/MenuButton";
import {Card} from 'react-native-shadow-cards';

export default function Home() {
    const [state, setState] = useContext(AuthContext)
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
        >

              {/* Header */}
            <View style={{
                marginTop: "10%",
                backgroundColor: "#20542c",
                height: 80,
                width: "100%",
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
                flexDirection: 'row', // Arrange children horizontally
                alignItems: 'center', // Center children vertically
                justifyContent: 'space-between', // Push children to opposite edges
                paddingHorizontal: 10
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.container, { width: 70, height: 70 }]}>
                        <Image source={require('../assets/dp.png')} style={styles.DPimage} />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 700,
                            fontSize: 22,
                            color: "white"
                        }}>
                            Hi, Doha
                        </Text>
                        <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 600,
                            fontSize: 16,
                            color: "white"
                        }}>
                            Welcome back!
                        </Text>
                    </View>
                </View>

                {/* Menu Icon */}
                                <MenuButton/>
            </View>

            
              {/* Rewards */}

              <Card style={{ margin: 10, width:"95%"}}>
              <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"space-around"}}>
                    <View style={[styles.container, { width: 110, height: 220 }]}>
                        <Image source={require('../assets/rewardsImage.png')} style={styles.DPimage} />
                    </View>
                    <View>
                  
                   <View  style={{flexDirection:"row"}}>
                  <View>
                  <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 300,
                            fontSize: 22,
                            color: "black"
                        }}>
                          Your Points 
                        </Text>
                        <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 700,
                            fontSize: 28,
                            color: "black"
                        }}>
                            4790 pt
                        </Text> 
                  </View>
                  <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 600,
                            fontSize: 22,
                            color: "black",
                            marginTop:15,
                            marginLeft:10

                        }}>
                          &gt;
                        </Text>
                    </View> 
                <View style={{flexDirection:"row"}}>
                <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 300,
                            fontSize: 22,
                            color: "black",
                            marginTop:15

                        }}>
                           Rewards
                        </Text>           
                             <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 600,
                            fontSize: 22,
                            color: "black",
                            marginTop:15,
                            marginLeft:10

                        }}>
                          &gt;
                        </Text>
                </View>
                    </View>
                </View>
              </Card>



            
              {/* Services */}

              <Text style={{
                            fontFamily: "poppins",
                            fontWeight:600,
                            fontSize: 28,
                            color: "black",
                            marginTop:15,
                            marginLeft:10

                        }}>Services</Text>

                        <View style={{flexDirection:"row"}}>
                        <View style={{ margin: 10, flex:1, width:110,backgroundColor:"#23AA473D", borderRadius:10}}>
                        <View style={[styles.serviceContainer, { width: 70, height: 70 }]}>
                        <Image source={require('../assets/addFoodItem.png')} style={styles.serviceImage} />
                        
                    </View>
                    <Text style={{
                            fontFamily: "poppins",
                            fontWeight:600,
                            fontSize: 19,
                            color: "black",
                            marginTop:3,
                            marginLeft:10,
                            paddingBottom:10

                        }}>Add food item</Text>
                        </View>

                        
                        <View style={{ margin: 10, flex:1, width:110,backgroundColor:"#23AA473D", borderRadius:10}}>
                        <View style={[styles.serviceContainer, { width: 70, height: 70 }]}>
                        <Image source={require('../assets/viewFoodItems.png')} style={styles.serviceImage} />
                        
                    </View>
                    <Text style={{
                            fontFamily: "poppins",
                            fontWeight:600,
                            fontSize: 19,
                            color: "black",
                            marginTop:3,
                            marginLeft:10,
                            paddingBottom:10

                        }}>View food items</Text>
                        </View>

                        
                        <View style={{ margin: 10, flex:1, width:110,backgroundColor:"#23AA473D", borderRadius:10}}>
                        <View style={[styles.serviceContainer, { width: 70, height: 70 }]}>
                        <Image source={require('../assets/findFoodbank.png')} style={styles.serviceImage} />
                        
                    </View>
                    <Text style={{
                            fontFamily: "poppins",
                            fontWeight:600,
                            fontSize: 19,
                            color: "black",
                            marginTop:3,
                            marginLeft:10,
                            paddingBottom:10

                        }}>Find food bank</Text>
                        </View>
                        </View>

  
              {/* Global insights */}

              <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 600,
                            fontSize: 28,
                            color: "black",
                            marginTop:15,
                            marginLeft:10

                        }}>Global insights</Text>

<View style={{flexDirection:"row",justifyContent:"center"}}>
    <Image 
        source={require('../assets/globalInsights.jpeg')} 
        style={{width:"90%", height:300, marginTop:5, marginBottom:10, resizeMode: "contain"}} 
    />
</View>


              {/* Food Saver Tips */}


              <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 600,
                            fontSize: 28,
                            color: "black",
                            marginTop:15,
                            marginLeft:10

                        }}>Food Saver Tips</Text>
                            
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>
        &lt;
    </Text>

    <View style={{ flex: 1, margin: 10, backgroundColor: "#23AA473D", borderRadius: 10 }}>
        <Text style={{ marginTop: 20, marginLeft: 20, marginBottom: 20, fontFamily: "poppins", fontWeight: 600, fontSize: 18, color: "black" }}>
            Portion Control:
        </Text>
        <View style={{ }}>
            <Text style={styles.listItem}>- Serve smaller portions to reduce leftovers.</Text>
            <Text style={styles.listItem}>- Save and reheat appropriate portions for later.</Text>
        </View>
    </View>

    <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>
         &gt;
    </Text>
                    </View>



      {/* Blogs */}


      <Text style={{
                            fontFamily: "poppins",
                            fontWeight: 600,
                            fontSize: 28,
                            color: "black",
                            marginTop:15,
                            marginLeft:10

                        }}>Blogs</Text>
                                      {/* Blogs 1*/}
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
  

                        <View style={{ flex: 1, margin: 10, backgroundColor: "#23AA473D", borderRadius: 10,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width:"85%", paddingBottom:30 }}>
                            <Text style={{ marginTop: 20, marginLeft: 2, marginBottom: 5, fontFamily: "poppins", fontWeight: 700, fontSize: 14, color: "black" }}>
                            "The Hidden Impact of Food Waste: Unveiling the Numbers"
                            </Text>
                            
                                <Text><Text style={{fontWeight:900, fontSize:32, marginLeft:5, marginRight:5}}>.</Text>Explore statistics and facts about the environmental and social impact of global food waste</Text>
                          
                            </View>
                            <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>
                                &gt;
                            </Text>
                        </View>

 
                    </View>
                    
                    {/* Blogs 2*/}
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                        <View style={{ flex: 1, margin: 10, backgroundColor: "#23AA473D", borderRadius: 10,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width:"85%", paddingBottom:30 }}>
                            <Text style={{ marginTop: 20, marginLeft: 2, marginBottom: 5, fontFamily: "poppins", fontWeight: 700, fontSize: 14, color: "black" }}>
                            "Spotlight on Sustainable Brands: Supporting Eco-Friendly Food Products"
                            </Text>
                            
                                <Text><Text style={{fontWeight:900, fontSize:32, marginLeft:5, marginRight:5}}>.</Text>Highlight companies and products that focus on sustainability in their production and packaging.</Text>
                            
                            </View>
                            <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>
                                &gt;
                            </Text>
                        </View>

                        

 



                    </View>

                       
                    {/* Blogs 3*/}
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                        <View style={{ flex: 1, margin: 10, backgroundColor: "#23AA473D", borderRadius: 10,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width:"85%", paddingBottom:30 }}>
                            <Text style={{ marginTop: 20, marginLeft: 2, marginBottom: 5, fontFamily: "poppins", fontWeight: 700, fontSize: 14, color: "black" }}>
                            "Food Preservation Techniques: Canning, Freezing, and Pickling"

                            </Text>
                            
                                <Text><Text style={{fontWeight:900, fontSize:32, marginLeft:5, marginRight:5}}>.</Text>Provide guides on preserving food at home to extend its shelf life.</Text>
                            
                            </View>
                            <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>
                                &gt;
                            </Text>
                        </View>







                        </View>




        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: "white",
        justifyContent: "center",
        alignContent: "center",
        margin: 5
    },
    serviceContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: "white",
        justifyContent: "center",
        alignContent: "center",
        margin: 15
    },
    DPimage: {
        width: '70%',
        height: '70%',
        marginLeft: 11
    },
    serviceImage: {
        width: '70%',
        height: '70%',
        marginLeft: 11
    },
    listItem: {
        fontFamily: "poppins",
        fontWeight: 600,
        fontSize: 14,
        color: "black",
        marginTop: 5,
        marginLeft: 10
    }
});
