import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import { Button, withTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    // Check if email contains "@" and ends with ".com"
    setIsValidEmail(email.includes('@') && email.endsWith('.com'));
  }, [email]);

  // Function to handle navigation back
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
    >
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
      </View>

      <View>
        <Text title bold center style={styles.title}>
          Reset Password
        </Text>
        <Text center style={styles.description}>
          Please enter your email address to request a password reset
        </Text>
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoComplete="email"
          keyboardType="email-address"
        />

        <Button
          title="Send OTP"
          onPress={() => navigation.navigate('ForgotPassword')}
          disabled={!isValidEmail} // Disable button if email is invalid
          titleStyle={{ fontWeight: '600', fontFamily: 'poppins' }}
          buttonStyle={{
            backgroundColor: '#1C552B',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 25,
            paddingVertical: 15,
          }}
          containerStyle={{
            marginHorizontal: 50,
            marginVertical: 5,
            paddingTop: 10,
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    bottom: 10,
  },
  title: {
    fontFamily: 'poppins',
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 700,
    marginTop: '40%',
  },
  description: {
    fontFamily: 'poppins',
    marginTop: 2,
    marginBottom: 20,
    fontWeight: 400,
    marginBottom: '15%',
  },
});

export default ResetPassword;
