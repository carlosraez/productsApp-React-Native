import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProductosStackParams } from '../router/productsNavigator';

interface Props
  extends StackScreenProps<ProductosStackParams, 'ProductsScreen'> {}

export const ProductScreen = ({ navigation, route }: Props) => {
  const { id, name = '' } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Nuevo Producto',
    });
  }, []);

  return (
    <View>
      <Text>ProductScreen</Text>
      <Text>
        {id} {name}
      </Text>
    </View>
  );
};
