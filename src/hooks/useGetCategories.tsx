import { useState, useEffect } from 'react';
import cafeApi from '../api/cafiApi';
import { CategoiresResponse, Categoria } from '../interfaces/appInterfaces';

export const useGetCategories = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [categories, setCategories] = useState<Categoria>([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await cafeApi.get<CategoiresResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };
  return {
    categories,
    isLoading,
  };
};
