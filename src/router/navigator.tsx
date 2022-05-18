import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { ProductsNavigator } from './productsNavigator';
import { AuthContext } from '../context/authContext';

const Stack = createStackNavigator();

export const Navigator = () => {
  const { status } = useContext(AuthContext);
  if (status === 'cheking') {
    return <Stack.Screen name="LoadingScreen" component={LoadingScreen} />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#ffffff',
        },
      }}>
      {status === 'authenticaded' ? (
        <>
          <Stack.Screen
            name="ProductsNavigator"
            component={ProductsNavigator}
          />
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
