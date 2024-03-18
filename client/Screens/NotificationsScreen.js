import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from "../context/auth";
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

export default function NotificationsScreen() {
    const [state, setState] = useContext(AuthContext);

    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from the backend
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notifications'); // Change POST to GET
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
    
        fetchNotifications();
    }, []);
    

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity onPress={goBack} style={styles.closeButton}>
                    <Image source={require('../assets/Close.png')} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                style={{ flex: 1 }}
            >
                {/* Notifications list */}
                <View style={styles.notificationsContainer}>
                    {/* Display notifications */}
                    {notifications.slice().reverse().map((notification, index) => (
                        <View key={index} style={index % 2 === 0 ? styles.evenNotification : styles.oddNotification}>
                            <Text style={styles.notificationText}>
                                <Text style={styles.nameText}>
                                    {notification.creatorName === state.user.username ? 'You' : notification.creatorName}
                                </Text> added new item : <Text style={styles.itemText}>{notification.itemName}</Text>
                            </Text>
                        </View>
                    ))}
                </View>

            </KeyboardAwareScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily:"poppins"
    },
    closeButton: {
        padding: 10,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    notificationsContainer: {
        flex: 1,
        padding: 10,
    },
    evenNotification: {
        backgroundColor: '#ECE2C8',
        height: 40,
        justifyContent: 'center', // Center text vertically
        marginBottom: 5,
        borderRadius: 5
    },
    oddNotification: {
        backgroundColor: '#ECDAAA',
        height: 40,
        justifyContent: 'center', 
        marginBottom: 5,
        borderRadius: 5
    },
    notificationText: {
        fontSize: 14,
        textAlign: 'center', 
        fontFamily: "poppins"
    },
    nameText: {
        fontWeight: 'bold',
        color: '#72ABE1', 
        fontFamily: "poppins"
    },
    itemText: {
        fontStyle: 'italic',
        color: 'green', 
        fontFamily: "poppins"
    },
});

