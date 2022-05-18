import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafiApi';
import {
  Usuario,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'cheking' | 'authenticaded' | 'unauthenticaded';
  signup: ({ name, email, password }: RegisterData) => void;
  signin: ({ email, password }: LoginData) => void;
  removeError: () => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

const atuhInicitalState: AuthState = {
  status: 'cheking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, atuhInicitalState);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const resp = await cafeApi.get('/auth');
      if (resp.status !== 200) {
        return dispatch({ type: 'notAuthenticatet' });
      }

      dispatch({
        type: 'signUp',
        payload: { token: resp.data.token, user: resp.data.user },
      });
    } else {
      dispatch({ type: 'notAuthenticatet' });
    }
  };

  const signin = async ({ email, password }: LoginData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
        correo: email,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: { token: data.token, user: data.usuario },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'información incorrecta',
      });
    }
  };

  const signup = async ({ email, name, password }: RegisterData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', {
        correo: email,
        nombre: name,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: { token: data.token, user: data.usuario },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      console.log(error);

      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la información',
      });
    }
  };

  const removeError = () => {};
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signup,
        signin,
        removeError,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
