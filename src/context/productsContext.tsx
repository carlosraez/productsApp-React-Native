import React, { createContext, useState } from 'react';
import cafeApi from '../api/cafiApi';
import { Producto } from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProducts: (categoryId: string, productName: string) => Promise<void>;
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
  const loadProducts = async () => {};
  const addProducts = async (categoryId: string, productName: string) => {};
  const udateProducts = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};
  const deleteProducts = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};
  const loadProductbyId = async (productId: string) => {
    throw new Error('No se encontro el producto');
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
