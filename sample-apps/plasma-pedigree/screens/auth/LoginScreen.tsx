//
// Screen for logging in.
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

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Occurs when "Log In" is pressed...
    const onLoginPressed = useCallback(async () => {
        // Make sure fields are filled in...
        if (!email) { Alert.alert("Please enter an email address."); return; }
        if (!password) { Alert.alert("Please enter a password."); return; }

        // Try to sign in...
        Keyboard.dismiss();
        setIsLoading(true);

        try {
            await Firebase.Auth.signInWithEmailAndPassword(email, password);
            //setIsLoading(false);  // Don't do this, or we'll get a warning that component is already unmounted
            // Navigation handled by SplashScreen
        } catch (error: any) {
            setIsLoading(false);
            Alert.alert(error?.message || "Login failed");
        }
    }, [email, password]);
    
    // TODO: Remove animation
    // TODO: Figure out if this way does NOT add to the navigation history stack (because we don't want it to)

    // Occurs when user presses "Signup"...
    const onSignupPressed = useCallback(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Signup' }]
        })
      );
    }, []);

    // Occurs when user presses "Forgot Password"...
    const onForgotPasswordPressed = useCallback(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'ForgotPassword' }]
        })
      );
    }, []);

    // Occurs when user presses "Try as Guest"...
    const onTryAsGuestPressed = useCallback(() => {
      // TODO: Implement Try as Guest feature
    }, []);

    return (
        <ScrollView style={styles.backgroundImage}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={{paddingTop:50}} />
            <Text style={{ fontWeight: "bold", fontSize: 16}}>Plasma Pedigree</Text>
            <View style={{paddingTop:10}} />
  
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
  
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={"#343434"}
              underlineColorAndroid="rgba(0,0,0,0)"
              value={password}
              onChangeText={setPassword}
            />
  
            <TouchableHighlight onPress={onLoginPressed} style={styles.buttonDark}>
              <Text style={styles.buttonDarkText}>Login</Text>
            </TouchableHighlight>
  
            <View style={{paddingTop:20}} />
            <ActivityIndicator animating={isLoading} size="large" color="white" />
  
            <TouchableOpacity onPress={onSignupPressed}>
              <Text style={styles.whiteTextBlackOutline}>Or create an account...</Text>
            </TouchableOpacity>
  
            <View style={{paddingTop:20}} />
            <TouchableOpacity onPress={onForgotPasswordPressed}>
              <Text style={styles.whiteTextBlackOutline}>Forgot password...</Text>
            </TouchableOpacity>
  
            <View style={{paddingTop:20}} />
            <TouchableOpacity onPress={onTryAsGuestPressed}>
              <Text style={styles.whiteTextBlackOutline}>Try as guest...</Text>
            </TouchableOpacity>
  
          </KeyboardAvoidingView>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "#d8b4fe",
  },

  logoImage: {
    height: 150,
    resizeMode: "contain",
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin:20,
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
    textShadowOffset:{width:1,height:1},
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