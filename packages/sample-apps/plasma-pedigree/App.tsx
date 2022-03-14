import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from "firebase/compat/app";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { RootNavigation, MainTabNavigation } from './navigation';
import ApiKeys from './constants/ApiKeys';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

   // Track user authentication...
   const [isAuthenticationReady, setIsAuthenticationReady] = useState<boolean>(false);
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize Firebase app...
  if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

  // Listen for firebase auth changes and update authenticated status...
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { 
      setIsAuthenticationReady(true);
      setIsAuthenticated(!!user); 
    });
    return () => unsubscribe(); // Cleanup subscription on unmount (https://usehooks.com/useAuth/)
  }, []);

  // Splash Screen...
  if (!isLoadingComplete || !isAuthenticationReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {(isAuthenticated) ? <MainTabNavigation colorScheme={colorScheme} /> : <RootNavigation colorScheme={colorScheme} />}
      <StatusBar />
    </SafeAreaProvider>
  );

  /*
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
  */
}
