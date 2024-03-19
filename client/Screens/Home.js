import React, { useContext,useState,useEffect } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Platform, Image, TouchableOpacity,SafeAreaView,StatusBar,ScrollView,ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-shadow-cards';
import axios from 'axios';
import { IconButton, MD3Colors } from 'react-native-paper';

export default function Home({ navigation }) {
    const [state, setState] = useContext(AuthContext);
    const { user } = state;
    const { username, _id } = user || {};
    const [userPoints, setUserPoints] = useState(0);
    const [loading, setLoading] = useState(true);  
    const [currentTipIndex, setCurrentTipIndex] = useState(0);


    const tips = [
        {
            tipID: "1",
            tipText: [
                "- Serve smaller portions to reduce leftovers.",
                "- Save and reheat appropriate portions for later."
            ],
            tipCategory: "Portion Control"
        },
        {
            tipID: "2",
            tipText: [
                "- Store leftovers in airtight containers to maintain freshness.",
                "- Label leftovers with the date to track their freshness."
            ],
            tipCategory: "Leftover Management"
        },
        {
            tipID: "3",
            tipText: [
                "- Use reusable containers instead of disposable ones to reduce waste.",
                "- Compost food scraps to minimize landfill waste."
            ],
            tipCategory: "Waste Reduction"
        },
        {
            tipID: "4",
            tipText: [
                "- Plan meals ahead to avoid overbuying groceries.",
                "- Make a shopping list and stick to it to reduce impulse purchases."
            ],
            tipCategory: "Meal Planning"
        },
        {
            tipID: "5",
            tipText: [
                "- Freeze extra produce before it goes bad for later use in smoothies or soups.",
                "- Use vegetable scraps to make homemade broth."
            ],
            tipCategory: "Produce Preservation"
        },
        {
            tipID: "6",
            tipText: [
                "- Store herbs in a glass of water in the fridge to keep them fresh longer.",
                "- Wrap greens in paper towels to absorb excess moisture and extend their shelf life."
            ],
            tipCategory: "Freshness Preservation"
        },
        {
            tipID: "7",
            tipText: [
                "- Use the oldest ingredients first to prevent them from expiring.",
                "- Rotate items in the pantry to ensure nothing gets forgotten."
            ],
            tipCategory: "Pantry Organization"
        },
        {
            tipID: "8",
            tipText: [
                "- Cook larger batches of meals and freeze portions for quick and convenient meals later.",
                "- Use a vacuum sealer to extend the shelf life of foods."
            ],
            tipCategory: "Batch Cooking"
        },
        {
            tipID: "9",
            tipText: [
                "- Check the expiration dates of products regularly and discard any expired items.",
                "- Donate non-perishable items to food banks before they expire."
            ],
            tipCategory: "Expiration Date Management"
        },
        {
            tipID: "10",
            tipText: [
                "- Use citrus zest to add flavor to dishes instead of throwing away the peels.",
                "- Turn stale bread into breadcrumbs or croutons."
            ],
            tipCategory: "Creative Cooking"
        }
    ];
    

    const fetchUserPoints = async () => {
        try {
            const response = await axios.get(`/food-items?creator=${_id}`);
            const foodItems = response.data;
            const numberOfItemsAddedByUser = foodItems.length;
            const calculatedPoints = numberOfItemsAddedByUser * 103;
            setUserPoints(calculatedPoints);
            setLoading(false); // Update loading state after fetching data
        } catch (error) {
            console.error("Error fetching user points:", error);
            setLoading(false); // Update loading state in case of error
        }
    };


useEffect(() => {
        fetchUserPoints();
    }, [user]);


// Function to navigate to the previous tip
    const goToPreviousTip = () => {
        if (currentTipIndex > 0) {
            setCurrentTipIndex(currentTipIndex - 1);
        }
    };

    // Function to navigate to the next tip
    const goToNextTip = () => {
        if (currentTipIndex < tips.length - 1) {
            setCurrentTipIndex(currentTipIndex + 1);
        }
    };


   const blogs = [
  {
    id: 'blog1',
    title: "The Hidden Impact of Food Waste: Unveiling the Numbers",
    text: "Explore statistics and facts about the environmental and social impact of global food waste",
    blogDetailParaOne: "This blog delves into the profound impact of food waste on both the environment and society. It uncovers startling statistics and facts, shedding light on the magnitude of the issue. From the greenhouse gas emissions generated by decomposing food in landfills to the social implications of hunger and food insecurity, this blog aims to raise awareness about the hidden consequences of wasting food. Furthermore, it examines the economic ramifications of food waste, including the financial losses incurred by households, businesses, and communities. By understanding the hidden impact of food waste, individuals and organizations can take proactive steps to reduce waste and promote a more sustainable food system.",
    blogDetailParaTwo: "Moreover, this blog explores the psychological aspects of food waste, delving into the behaviors and attitudes that contribute to excessive consumption and disposal. It examines the role of consumer culture, advertising, and convenience in shaping food-related habits, highlighting the need for behavioral changes at both the individual and societal levels. Additionally, the blog discusses the ethical considerations surrounding food waste, such as its implications for food justice and equity. By addressing these complex issues, the blog encourages readers to reconsider their relationship with food and adopt practices that minimize waste and maximize sustainability."
  },
  {
    id: 'blog2',
    title: "Spotlight on Sustainable Brands: Supporting Eco-Friendly Food Products",
    text: "Highlight companies and products that focus on sustainability in their production and packaging.",
    blogDetailParaOne: "In this blog, we turn the spotlight on companies and products that prioritize sustainability in their production and packaging processes. From innovative packaging designs to eco-friendly sourcing practices, these brands are leading the way in reducing their environmental footprint. Discover how their commitment to sustainability extends beyond marketing rhetoric to tangible actions that benefit both consumers and the planet. Moreover, this blog explores the role of sustainable certifications and labels in guiding consumers toward environmentally responsible purchasing decisions. By supporting eco-friendly brands, consumers can contribute to the preservation of natural resources and the reduction of waste in the food industry.",
    blogDetailParaTwo: "Furthermore, the blog delves into the technological innovations driving sustainability in the food industry, such as advancements in renewable energy, waste reduction, and supply chain transparency. It highlights the importance of collaboration between businesses, policymakers, and consumers in driving systemic change toward a more sustainable future. Additionally, the blog discusses the social impact of supporting sustainable brands, including job creation, community development, and empowerment of marginalized groups. By amplifying the voices of sustainable businesses, the blog aims to inspire collective action and foster a culture of sustainability."
  },
  {
    id: 'blog3',
    title: "Food Preservation Techniques: Canning, Freezing, and Pickling",
    text: "Provide guides on preserving food at home to extend its shelf life.",
    blogDetailParaOne: "Learn the art of preserving food at home with this comprehensive guide to canning, freezing, and pickling techniques. From preserving seasonal fruits and vegetables to extending the shelf life of homemade jams and pickles, this blog covers everything you need to know to minimize food waste and enjoy fresh produce year-round. Explore step-by-step instructions, handy tips, and delicious recipes that will inspire you to make the most of your harvest and reduce food waste in your kitchen. Additionally, this blog discusses the historical significance of food preservation methods and their cultural relevance in various cuisines around the world. By mastering these traditional techniques, individuals can preserve the flavors of the season and embrace a more sustainable approach to food consumption.",
    blogDetailParaTwo: "Moreover, the blog delves into the science behind food preservation, explaining the principles of acidity, temperature control, and moisture content that ensure the safety and quality of preserved foods. It explores the nutritional benefits of preserved foods, dispelling common myths and misconceptions surrounding their healthfulness. Additionally, the blog discusses modern innovations in food preservation, such as vacuum sealing, dehydration, and fermentation, and their role in extending the shelf life of perishable items. By empowering readers with knowledge and skills, the blog aims to promote self-sufficiency and resilience in the face of food insecurity and environmental challenges."
  },
];

      
      
      

    // Handle loading state
    if (loading) {
        return    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C552B" />
        <Text style={styles.loadingText}>Loading Please Wait...</Text>
      </View>;
    }

    // If username is null, navigate the user to the Login screen
    if (!username) {
        navigation.navigate('Login');
        return null; 
    }

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
        const selectedBlog = blogs.find(blog => blog.id === blogId);
        if (selectedBlog) {
          navigation.navigate('BlogDetail', { title: selectedBlog.title, text: selectedBlog.text, detail:selectedBlog.blogDetailParaOne,paraTwo:selectedBlog.blogDetailParaTwo });
        }
      };
      

    const navigateToScanExpiryDate = () => {
        navigation.navigate('ScanExpiryDate');
    };

    const navigateToFoodBanksInMap = () => {
        navigation.navigate('FoodBanksInMap');
      };

      const navigateToNotifications = () => {
        navigation.navigate('NotificationsScreen');
    };

    const showAlert = () => {
        alert("This function will be added soon!");
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
                        <TouchableOpacity onPress={showAlert}>
                        <IconButton
                                icon="menu"
                                iconColor="white"
                                size={40}
                          
                            />
                        </TouchableOpacity>
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
                             <TouchableOpacity onPress={showAlert} style={styles.serviceContainer}>
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
                            
                 
                        {/* Food Saver Tips */}
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={goToPreviousTip}>
                                <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>&lt;</Text>
                            </TouchableOpacity>

                            <View style={{ flex: 1, margin: 10, backgroundColor: "#23AA473D", borderRadius: 10 }}>
                                <Text style={{ marginTop: 20, marginLeft: 20, marginBottom: 20, fontFamily: "poppins", fontWeight: 600, fontSize: 18, color: "black" }}>
                                    {tips[currentTipIndex].tipCategory}:
                                </Text>
                                <View>
                                    {tips[currentTipIndex].tipText.map((tip, index) => (
                                        <Text key={index} style={styles.listItem}>{tip}</Text>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity onPress={goToNextTip}>
                                <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>&gt;</Text>
                            </TouchableOpacity>
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


                                      {/* Render Blogs */}
                        {blogs.map(blog => (
                        <TouchableOpacity key={blog.id} onPress={() => navigateToBlogDetails(blog.id)}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flex: 1, margin: 10, backgroundColor: "#23AA473D", borderRadius: 10,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ width:"85%", paddingBottom:30 }}>
                                                    <Text style={{ marginTop: 20, marginLeft: 2, marginBottom: 5, fontFamily: "poppins", fontWeight: 700, fontSize: 14, color: "black" }}>
                                                    {blog.title}
                                                    </Text>
                                                    
                                                        <Text><Text style={{fontWeight:900, fontSize:32, marginLeft:5, marginRight:5}}>. </Text>{blog.text}</Text>
                                                
                                                    </View>
                                                    <Text style={{ fontFamily: "poppins", fontWeight: 600, fontSize: 22, color: "black" }}>
                                                        &gt;
                                                    </Text>
                                                </View>
                            </View>
                        </TouchableOpacity>
                        ))}

             

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

<TouchableOpacity onPress={showAlert}>
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

</TouchableOpacity>

<TouchableOpacity onPress={showAlert}>
                    <View style={[styles.container, { width: 50, height: 50 }]}>
                        <Image source={require('../assets/barcodeIcon.png')} style={styles.barCodeImage} />
                    </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToNotifications} >
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
                     </TouchableOpacity>

            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        marginTop: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 50,
        fontFamily: 'poppins',
        fontWeight: '700',
        fontSize: 22,
        color:"black"
      },
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
    LoadingSpinner:{
        marginTop:200,

    }
});
