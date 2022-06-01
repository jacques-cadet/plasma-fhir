import React, { useCallback } from 'react';
import { StyleSheet, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Firebase } from './../model';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  // Occurs when "Logout" is pressed...
  const onLogoutPressed = useCallback(async () => {
    await Firebase.Auth.signOut();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button 
        title="Logout"
        onPress={onLogoutPressed}
      />

      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
