import React, { createContext, useState, useEffect } from 'react';
import cafeApi from '../api/cafiApi';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProducts: (categoryId: string, productName: string) => Promise<Producto>;
  udateProducts: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProducts: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  loadProductbyId: (productId: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO: cambiar Any
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {
  const [products, setproducts] = useState<Producto[]>([]);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setproducts([...resp.data.productos]);
    console.log(resp.data.productos);
  };
  const addProducts = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    try {
      const resp = await cafeApi.post<Producto>('/productos', {
        nombre: productName,
        categoria: categoryId,
      });
      setproducts([...products, resp.data]);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  const udateProducts = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    try {
      const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
        nombre: productName,
        categoria: categoryId,
      });
      setproducts(
        products.map(product =>
          product._id === productId ? resp.data : product,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProducts = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};

  const loadProductbyId = async (productId: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/producto/${productId}`);
    return resp.data;
  };
  const uploadImage = async (data: any, id: string) => {}; //TODO: cambiar Any
  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProducts,
        udateProducts,
        deleteProducts,
        loadProductbyId,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
