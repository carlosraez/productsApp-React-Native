import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    console.log('email: ', email);
    console.log('password: ', password);
    Keyboard.dismiss();
  };
  return (
    <>
      {/* background */}
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
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
            onSubmitEditing={onLogin}
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
            onSubmitEditing={onLogin}
          />
          {/* button login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity style={loginStyles.button}>
              <Text style={loginStyles.buttonText} onPress={onLogin}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {/* create new account */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};