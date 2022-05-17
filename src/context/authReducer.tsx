import { Usuario } from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'cheking' | 'authenticaded' | 'unauthenticaded';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | { type: 'signUp'; payload: { token: string; user: Usuario } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'logout' }
  | { type: 'notAuthenticatet' };

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'unauthenticaded',
        token: null,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        token: action.payload.token,
        status: 'authenticaded',
        errorMessage: '',
        user: action.payload.user,
      };
    case 'logout':
    case 'notAuthenticatet':
      return {
        ...state,
        token: null,
        status: 'unauthenticaded',
        user: null,
      };

    default:
      return state;
  }
};
