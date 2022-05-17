import React, { createContext, useReducer } from 'react';
import cafeApi from '../api/cafiApi';
import { Usuario, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'cheking' | 'authenticaded' | 'unauthenticaded';
  signup: () => void;
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
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
  };

  const signup = () => {};
  const removeError = () => {};
  const logout = () => {};

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
