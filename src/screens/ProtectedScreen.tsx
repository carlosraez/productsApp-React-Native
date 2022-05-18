import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/authContext';

export const ProtectedScreen = () => {
  const { logout, user, token } = useContext(AuthContext);
  console.log(user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Screen</Text>
      <Button title="Logout" onPress={() => logout()} />
      <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text>{JSON.stringify(token, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
