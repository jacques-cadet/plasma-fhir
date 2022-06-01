
//
// Screen for creating a new account. Asks user for email and password.
//

// TODO: NEXT: Social login

import React, { useState, useCallback } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types';
import { Firebase } from '../../model';

export default function SignupScreen({ navigation }: RootStackScreenProps<'Signup'>) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSignupPressed = useCallback(async () => {
        // Make sure fields are filled in...
        if (!email) { Alert.alert("Please enter an email address."); return; }
        if (!password) { Alert.alert("Please enter a password."); return; }
        if (password !== passwordConfirm) { Alert.alert("Passwords do not match"); return; }

        // Try to sign up...
        Keyboard.dismiss();
        setIsLoading(true);

        try {
            await Firebase.Auth.createUserWithEmailAndPassword(email, password, true, {}, {});
            //setIsLoading(false);  // Don't do this, or we'll get a warning that component is already unmounted
            // Navigation handled by SplashScreen
        } catch (error: any) {
            setIsLoading(false);
            Alert.alert(error?.message || "Signup failed");
            console.error(error);
        }
    }, [email, password, passwordConfirm]);

    // Occurs when user presses "Login"...
    const onLoginPressed = useCallback(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      );
    }, []);

    return (
        <ScrollView style={styles.backgroundImage}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={{paddingTop:50}} />
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
  
              <TextInput
                style={styles.textInput}
                placeholder="Password, again"
                secureTextEntry={true}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={"#343434"}
                underlineColorAndroid="rgba(0,0,0,0)"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
              />
  
              <TouchableHighlight onPress={onSignupPressed} style={styles.buttonDark}>
                <Text style={styles.buttonDarkText}>Signup</Text>
              </TouchableHighlight>
  
              <View style={{paddingTop:20}} />
              <ActivityIndicator animating={isLoading} size="large" color="white" />
  
              <TouchableOpacity onPress={onLoginPressed}>
                <Text style={styles.whiteTextBlackOutline}>I already have an account...</Text>
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
    textShadowOffset:{width:1,height:1}
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