import { View,  TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Text from "@kaloraat/react-native-text";
import { Button } from '@rneui/themed';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function ExpiryDateScan() {


    const [imageUri, setImageUri] = useState(null);
    const [labels, setLabels] = useState([]);
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({ 
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
            console.log(result);
        } catch (error) {
            console.error('Error picking Image: ', error );
        }
    };

    const analyzeImage = async () => {
        try {
            if (!imageUri) {
                alert('Please select an image first!!');
                return;
            }

            const apiKey = "AIzaSyABxx-6U0Ghrzks15nGzK6A5pm0Xobd3Rc";
            const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

            // read the image file from local URI and convert it to base64
            const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData = {
                requests: [
                    {
                        image: {
                            content: base64ImageData,
                        },
                        features: [{ type: 'TEXT_DETECTION', maxResults: 5}],
                    },
                ]
            };

            const apiResponse = await axios.post(apiURL, requestData);
            console.log(apiResponse)
        } catch(error) {
            console.error('Error Scanning Expiry Date: ', error);
            alert('Error Scanning Expiry Date ', error);
        }
    };

    // Function to handle navigation back
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Image
                        source={require("../assets/backArrow.png")}
                        style={styles.backArrow}
                    />
                </TouchableOpacity>
            </View>

            <View>
                <Text
                    title
                    bold
                    center
                    style={{
                        fontFamily: "poppins",
                        fontWeight: 700,
                        marginTop: 100,
                        marginBottom: 20,
                    }}
                >
                    Scan Expiry Date
                </Text>
            </View>

            {imageUri && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: imageUri }}
                        style={styles.image}
                    />
                    <View style={styles.topLeftCorner} />
                    <View style={styles.topRightCorner} />
                    <View style={styles.bottomLeftCorner} />
                    <View style={styles.bottomRightCorner} />
                </View>
            )}

            <TouchableOpacity onPress={pickImage}>
                <FontAwesome5  name="camera" size={35} color="green" />
            </TouchableOpacity>

            <Button
                title="Scan"
                titleStyle={{ fontWeight: '600', fontFamily: 'poppins' }}
                onPress={analyzeImage}
                buttonStyle={{
                    backgroundColor: '#1C552B',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 25,
                    paddingVertical: 11,
                    paddingHorizontal:50
                }}
                containerStyle={{
                    marginHorizontal: 50,
                    marginVertical: 5,
                }}
            />

            {labels.length > 0 && (
                <View>
                    <Text style={styles.label}>
                        Labels:
                    </Text>
                    {
                        labels.map((label)=> (
                            <Text
                                key={label.mid}
                                style={styles.outputtext}
                            >
                                {label.description}
                            </Text>
                        ))
                    }
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 10,
        backgroundColor: "#fefefe",
        borderRadius: 10,
    },
    backArrow: {
        width: 20,
        height: 20,
    },
    backButtonContainer: {
        position: "absolute",
        top: 30,
        left: 10,
        zIndex: 1,
        bottom: 10,
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "black",
        position: "relative",
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    topLeftCorner: {
        position: "absolute",
        top: -5,
        left: -5,
        width: 25,
        height: 25,
        borderColor: "grey",
        borderTopWidth: 2,
        borderLeftWidth: 2,
    },
    topRightCorner: {
        position: "absolute",
        top: -5,
        right: -5,
        width: 25,
        height: 25,
        borderColor: "grey",
        borderTopWidth: 2,
        borderRightWidth: 2,
    },
    bottomLeftCorner: {
        position: "absolute",
        bottom: -5,
        left: -5,
        width: 25,
        height: 25,
        borderColor: "grey",
        borderBottomWidth: 2,
        borderLeftWidth: 2,
    },
    bottomRightCorner: {
      position: "absolute",
      bottom: -5,
      right: -5,
      width: 25,
      height: 25,
      borderColor: "grey",
      borderBottomWidth: 2,
      borderRightWidth: 2,
    },
  });
  