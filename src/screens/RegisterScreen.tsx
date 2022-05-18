import React, { useContext, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { email, password, name, onChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const { signup, errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    errorMessage.length > 0 &&
      Alert.alert('Registro Incorrecto', errorMessage, [
        { text: 'Ok', onPress: () => removeError },
      ]);
  }, [errorMessage, removeError]);

  const onRegister = () => {
    signup({ email, password, name });
    Keyboard.dismiss();
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856D6' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Registro</Text>
          {/* buton Name */}
          <Text style={loginStyles.label}>Nombre de usuario: </Text>
          <TextInput
            placeholder="Escribe tu nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="default"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'name')}
            value={name}
            autoCapitalize="words"
            onSubmitEditing={onRegister}
          />
          {/* button email */}
          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'email')}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onRegister}
          />
          <Text style={loginStyles.label}>Contraseña: </Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="default"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onRegister}
          />
          {/* button login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity style={loginStyles.button}>
              <Text style={loginStyles.buttonText} onPress={onRegister}>
                Crear Cuenta
              </Text>
            </TouchableOpacity>
          </View>
          {/* create new account */}
          <TouchableOpacity
            style={loginStyles.buttonReturn}
            onPress={() => navigation.replace('LoginScreen')}>
            <Text style={loginStyles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
