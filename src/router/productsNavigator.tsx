import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductScreen } from '../screens/ProductScreen';

export type ProductosStackParams = {
  ProductsScreen: undefined;
  ProductScreen: { id?: string; name?: string };
};

const Stack = createStackNavigator<ProductosStackParams>();

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#ffffff',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{ title: 'productos' }}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
