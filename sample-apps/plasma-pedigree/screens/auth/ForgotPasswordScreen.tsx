
//
// Screen for sending a password reset.
//

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types';
import { Firebase } from '../../model';

export default function ForgotPasswordScreen({ navigation }: RootStackScreenProps<'ForgotPassword'>) {
    const [email, setEmail] = useState<string>('a@gmail.com');
    const [isLoading, setIsLoading] = useState<boolean>(false);

     // Occurs when "Reset Password" is pressed...
     const onResetPasswordPressed = useCallback(async () => {
        // Make sure fields are filled in...
        if (!email) { Alert.alert("Please enter an email address."); return; }

        // Try to reset password...
        Keyboard.dismiss();
        setIsLoading(true);
        try {
            await Firebase.Auth.sendPasswordResetEmail(email);
            setIsLoading(false);
            Alert.alert("A password reset email has been sent to your inbox.");
            onBackToLoginPressed();
        } catch(error: any) {
            setIsLoading(false);
            Alert.alert(error?.message || "Reset Password failed");
        }
    }, [email]);

    // Occurs when "Back to Login" is pressed...
    const onBackToLoginPressed = useCallback(() => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        );
    }, []);

    return (
        <ScrollView style={styles.backgroundImage}>
          <KeyboardAvoidingView behavior="height" style={styles.container}>
  
            <View style={{paddingTop:100}} />
            <Text style={styles.headerText}>Forgot Password</Text>
            <View style={{paddingTop:20}} />
            <Text style={styles.instructionText}>Please enter your email address below to reset your password</Text>
            <View style={{paddingTop:20}} />
  
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={"#343434"}
              underlineColorAndroid="rgba(0,0,0,0)"
              value={email}
              onChangeText={setEmail}
            />
  
            <TouchableHighlight onPress={onResetPasswordPressed} style={styles.buttonDark}>
              <Text style={styles.buttonDarkText}>Reset Password</Text>
            </TouchableHighlight>
  
            <View style={{paddingTop:20}} />
            <TouchableOpacity onPress={onBackToLoginPressed}>
              <Text style={styles.whiteTextBlackOutline}>Back to login...</Text>
            </TouchableOpacity>
  
            <View style={{paddingTop:20}} />
            <ActivityIndicator animating={isLoading} size="large" color="white" />
  
          </KeyboardAvoidingView>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "#d8b4fe",
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin:20,
  },

  instructionText: {
    textAlign:"center",
    backgroundColor: "transparent",
    color: "white",
  },

  textInput: {
    alignSelf: "stretch",
    textAlign: "center",
    fontSize:18,
    marginTop:5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#343434",
    borderWidth: 1,
    color: "#343434",
    backgroundColor: "rgba(220, 220, 220, 0.8)"
  },

  whiteTextBlackOutline: {
    color: "white",
    backgroundColor: "transparent",
    fontWeight:"bold",
    fontSize:20,
    textShadowColor:"black",
    textShadowRadius:3,
    textShadowOffset:{width:1,height:1}
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "white",
  },

  buttonDark: {
    alignSelf: "stretch",
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#6b21a8",
  },

  buttonDarkText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});