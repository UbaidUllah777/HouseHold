import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios'; // Import axios for making API requests

const ItemDetailScreen = ({ navigation, route }) => {
  const { item } = route.params; // Destructure item from route params
  const [updatedItem, setUpdatedItem] = useState(item); // Initialize updatedItem state with the item details
  const [editMode, setEditMode] = useState(false); // State variable to track edit mode

  const goBack = () => {
    navigation.goBack();
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateItemDetails = async () => {
    try {
      const response = await axios.post('/update-item', {
        id: updatedItem._id,
        updatedItem,
      });
      if (response.data.success) {
        // Show success alert
        Alert.alert('Success', 'Item updated successfully', [{ text: 'OK' }]);
        // Pass the updated item data back to the previous screen
        navigation.navigate('ViewFoodItems', { updatedItem });
      } else {
        // Show failure alert
        Alert.alert('Error', 'Failed to update item', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error(error);
      // Show error alert
      Alert.alert('Error', 'An error occurred', [{ text: 'OK' }]);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      contentContainerStyle={styles.container}
    >
      <Text title bold center style={styles.title}>
        Item Details
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          value={updatedItem.category}
          onChangeText={(text) => setUpdatedItem({ ...updatedItem, category: text })}
          editable={editMode} // Set editable based on edit mode
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Item Name:</Text>
        <TextInput
          style={styles.input}
          value={updatedItem.itemName}
          onChangeText={(text) => setUpdatedItem({ ...updatedItem, itemName: text })}
          editable={editMode} // Set editable based on edit mode
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiry Date:</Text>
        <TextInput
          style={styles.input}
          value={new Date(updatedItem.expiryDate).toLocaleDateString()}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.input}
          value={updatedItem.quantityORweight.toString()}
          onChangeText={(text) => {
            const quantity = parseFloat(text);
            setUpdatedItem({ ...updatedItem, quantityORweight: isNaN(quantity) ? '' : quantity });
          }}
          editable={editMode} // Set editable based on edit mode
        />
      </View>
      <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
        <Text style={styles.editButtonText}>{editMode ? 'OK' : 'Edit'}</Text>
      </TouchableOpacity>
      <Button
        onPress={updateItemDetails}
        title="Confirm"
        titleStyle={styles.buttonTitle}
        buttonStyle={[styles.button, !editMode && styles.disabledButton]}
        containerStyle={styles.buttonContainer}
        disabled={!editMode}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'poppins',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'poppins',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontFamily: 'poppins',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#8e93a1',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 48,
  },
  buttonContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#1C552B',
    borderRadius: 25,
    paddingVertical: 15,
  },
  buttonTitle: {
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingVertical: 10,
  },
  editButtonText: {
    color: '#1C552B',
    fontWeight: '600',
    fontFamily: 'poppins',
  },
});

export default ItemDetailScreen;
