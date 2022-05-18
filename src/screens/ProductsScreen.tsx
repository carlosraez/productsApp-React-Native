import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ProductsContext } from '../context/productsContext';
import { ProductosStackParams } from '../router/productsNavigator';

interface Props
  extends StackScreenProps<ProductosStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: undefined,
                name: 'Nuevo Producto',
              })
            }>
            <Text>Agregar</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  separator: {
    height: 1,
    borderBottomWidth: 5,
    marginVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
