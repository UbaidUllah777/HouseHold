import React, { useContext,useState,useEffect } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Platform, Image, TouchableOpacity,SafeAreaView,StatusBar,ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MenuButton from "../components/UI/MenuButton";
import { Card } from 'react-native-shadow-cards';
import axios from 'axios';

export default function Home({ navigation }) {
    const [state, setState] = useContext(AuthContext);
    const { user } = state;
    const { username, _id } = user || {};
    const [userPoints, setUserPoints] = useState(0); // State to store user points

    const fetchUserPoints = async () => {
        try {
            // Fetch food items associated with the signed-in user
            const response = await axios.get(`/food-items?creator=${_id}`);
            const foodItems = response.data;
            // Calculate total points based on the number of food items added by the user
            const numberOfItemsAddedByUser = foodItems.length;
            const calculatedPoints = numberOfItemsAddedByUser * 103;
            setUserPoints(calculatedPoints);
        } catch (error) {
            console.error("Error fetching user points:", error);
        }
    };

    useEffect(() => {
        // Fetch user points when the component mounts or when user changes
        fetchUserPoints();
    }, [user]);
    const goBack = () => {
        navigation.navigate('Login');
    };

    const navigateToAddFoodItem = () => {
        navigation.navigate('AddFoodItem'); // Navigate to AddFoodItem screen
    };

    const navigateToViewFoodItem = () => {
        navigation.navigate('ViewFoodItems'); // Navigate to AddFoodItem screen
    };

    const navigateToViewFoodBanks = () => {
        navigation.navigate('ViewFoodBanks'); // Navigate to AddFoodItem screen
    };

    const navigateToBlogDetails = (blogId) => {
        navigation.navigate('BlogDetails', { id: blogId });
    };

    const navigateToScanExpiryDate = () => {
        navigation.navigate('ScanExpiryDate');
    };

    const navigateToFoodBanksInMap = () => {
        navigation.navigate('FoodBanksInMap');
      };
      if (!username) {
        // If username is null, navigate the user to the Login screen
        goBack();
        return null; // Return null or any loading component if needed
    }
    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
                stickyHeaderIndices={[1]}
                extraScrollHeight={100}
            >
  <StatusBar   barStyle="dark-content" backgroundColor="#ffff" />
                {/* Header */}
                <View style={{ marginTop: 0 }}>
                    <View style={{
                        
                        backgroundColor: "#20542c",
                        height: 80,
                        width: "100%",
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        flexDirection: 'row', // Arrange children horizontally
                        alignItems: 'center', // Center children vertically
                        justifyContent: 'space-between', // Push children to opposite edges
                        paddingHorizontal: 10,
                        
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
                                    Hi, <Text style={{
                                        fontFamily: "poppins",
                                        fontWeight: 700,
                                        fontSize: 22,
                                        color: "white"
                                    }}>{state.user.username}</Text>
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
                        <MenuButton />
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    {/* Rewards */}
                    <Card style={{ margin: 10, width: "95%" }}>
                        {/* Rewards content */}
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
                            {userPoints} pt
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

 {/* Services */}
                            <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.servicesContainer}
                        >
                            {/* Add Food Item */}
                            <TouchableOpacity onPress={navigateToAddFoodItem} style={styles.serviceContainer}>
                                <View style={styles.serviceContent}>
                                <View style={{ width: 70, height: 70,backgroundColor:"white", margin:10, borderRadius:30 }}>
                                                    <Image source={require('../assets/addFoodItem.png')} style={{    width: '70%',
                                                                height: '70%',
                                                                marginLeft: 11,
                                                                marginTop:8
                                                                }} />
                                                                                                        
                                            </View>
                                    <Text style={styles.serviceText}>Add food item</Text>
                                </View>
                            </TouchableOpacity>
                            {/* View Food Items */}
                            <TouchableOpacity onPress={navigateToViewFoodItem} style={styles.serviceContainer}>
                            <View style={styles.serviceContent}>
                                <View style={{ width: 70, height: 70,backgroundColor:"white", margin:10, borderRadius:30 }}>
                                                    <Image source={require('../assets/viewFoodItems.png')} style={{    width: '70%',
                                                                height: '70%',
                                                                marginLeft: 11,
                                                                marginTop:8
                                                                }} />
                                                                                                        
                                            </View>
                                    <Text style={styles.serviceText}>View food Items</Text>
                                </View>
                            </TouchableOpacity>
                            {/* View Food Bank */}
                            <TouchableOpacity onPress={navigateToViewFoodBanks} style={styles.serviceContainer}>
                            <View style={styles.serviceContent}>
                                <View style={{ width: 70, height: 70,backgroundColor:"white", margin:10, borderRadius:30 }}>
                                                    <Image source={require('../assets/viewFoodBanks.png')} style={{    width: '70%',
                                                                height: '70%',
                                                                marginLeft: 11,
                                                                marginTop:8
                                                                }} />
                                                                                                        
                                            </View>
                                    <Text style={styles.serviceText}>View Food Bank</Text>
                                </View>
                            </TouchableOpacity>
                             {/* Find Food Bank */}
                            <TouchableOpacity onPress={navigateToFoodBanksInMap} style={styles.serviceContainer}>
                            <View style={styles.serviceContent}>
                                <View style={{ width: 70, height: 70,backgroundColor:"white", margin:10, borderRadius:30 }}>
                                                    <Image source={require('../assets/findFoodbank.png')} style={{    width: '70%',
                                                                height: '70%',
                                                                marginLeft: 11,
                                                                marginTop:8
                                                                }} />
                                                                                                        
                                            </View>
                                    <Text style={styles.serviceText}>Find food bank</Text>
                                </View>
                            </TouchableOpacity>

                            
                             {/* Scan Expiry date */}
                             <TouchableOpacity onPress={navigateToScanExpiryDate} style={styles.serviceContainer}>
                            <View style={styles.serviceContent}>
                                <View style={{ width: 70, height: 70,backgroundColor:"white", margin:10, borderRadius:30 }}>
                                                    <Image source={require('../assets/scanExpiry.png')} style={{    width: '70%',
                                                                height: '70%',
                                                                marginLeft: 11,
                                                                marginTop:8
                                                                }} />
                                                                                                        
                                            </View>
                                    <Text style={styles.serviceText}>Scan expiry date</Text>
                                </View>
                            </TouchableOpacity>
                           
                        </ScrollView>

  

                  
  
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
                    <TouchableOpacity onPress={() => navigateToBlogDetails('blog1')} >
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
                    </TouchableOpacity>
                    
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

                </View>

            </KeyboardAwareScrollView>

            {/* Footer */}
            <View style={{
                backgroundColor: "#20542c",
                height: 60,
                width: "100%",
                flexDirection: 'row', // Arrange children horizontally
                alignItems: 'center', // Center children vertically
                justifyContent: 'space-between', // Push children to opposite edges
                paddingHorizontal: 10
            }}>

                    <View style={{ 
                        width: 50,
                         height: 50, 
                        overflow: 'hidden',
                        justifyContent: "center",
                        alignContent: "center",
                        margin: 5
                            }}>
                        <Image source={require('../assets/homeIcon.png')} style={styles.barCodeImage} />
                    </View>


                    <View style={[styles.container, { width: 50, height: 50 }]}>
                        <Image source={require('../assets/barcodeIcon.png')} style={styles.barCodeImage} />
                    </View>

                    <View style={{ 
                        width: 50,
                         height: 50, 
                        overflow: 'hidden',
                        justifyContent: "center",
                        alignContent: "center",
                        margin: 5
                            }}>
                        <Image source={require('../assets/bellIcon.png')} style={styles.barCodeImage} />
                    </View>

            </View>
        </View>
        </SafeAreaView>
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
    barCodeImage: {
        width: '55%',
        height: '55%',
        marginLeft: 11
    },
    serviceImage: {
        width: '50%',
        height: '50%',
        marginLeft: 11
    },
    listItem: {
        fontFamily: "poppins",
        fontWeight: 600,
        fontSize: 14,
        color: "black",
        marginTop: 5,
        marginLeft: 10
    },
    
    servicesContainer: {
        flexDirection: 'row',
    },
    serviceContainer: {
        marginRight: 10,
        height:180,
        backgroundColor:"#23AA473D",
        borderRadius:15,
        width:120
    },
    serviceContent: {
        alignItems: 'center',
    },
    serviceText: {
        fontFamily: "poppins",
        fontWeight: 600,
        fontSize: 19,
        color: "black",
        textAlign: 'center',
    },
});
