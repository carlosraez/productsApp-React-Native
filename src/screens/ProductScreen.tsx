import React, { useEffect, useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ProductosStackParams } from '../router/productsNavigator';
import { useGetCategories } from '../hooks/useGetCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/productsContext';

interface Props
  extends StackScreenProps<ProductosStackParams, 'ProductsScreen'> {}

export const ProductScreen = ({ navigation, route }: Props) => {
  const { id = '', name = '' } = route.params;
  const { categories } = useGetCategories();
  const { loadProductbyId, addProducts, udateProducts } =
    useContext(ProductsContext);

  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } =
    useForm({
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    });

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre del producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length > 0) {
      const product = await loadProductbyId(id);
      setFormValue({
        _id: id,
        categoriaId: product.categoria._id,
        img: product.img || '',
        nombre: product.nombre || '',
      });
    }
  };

  const serverUpdate = async () => {
    if (id.length > 0) {
      udateProducts(categoriaId, nombre, id);
    } else {
      if (categoriaId.length === 0) {
        onChange(categories[0]._id, 'categoriaId');
      }
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProducts(nombre, tempCategoriaId);
      onChange(newProduct._id, '_id');
    }
  };

  const loadProductsFromServer = async () => {
    await serverUpdate();
    setIsRefreshing(true);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del Producto:</Text>
        <TextInput
          placeholder="Producto"
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          style={styles.Textinput}
        />
        <Text style={styles.label}>Selecciona la categoria:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(category => (
            <Picker.Item
              label={category.nombre}
              value={category._id}
              key={category._id}
            />
          ))}
        </Picker>
        <Button title="Guardar" onPress={serverUpdate} />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Cámara" onPress={() => {}} />
            <Button title="Galeria" onPress={() => {}} />
          </View>
        )}

        {img.length > 0 && (
          <Image
            source={{ uri: img }}
            style={{
              width: '100%',
              height: 200,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 18,
  },
  Textinput: {
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
  },
});
