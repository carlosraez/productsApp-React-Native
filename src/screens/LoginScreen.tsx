import React from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';

export const LoginScreen = () => {
  return (
    <>
      {/* background */}
      <Background />
      <View style={loginStyles.}>
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
          //TODO: onChange Value
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={loginStyles.label}>Contraseña: </Text>
        <TextInput
          placeholder="******"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="default"
          underlineColorAndroid="white"
          style={[
            loginStyles.inputField,
            Platform.OS === 'ios' && loginStyles.inputIOS,
          ]}
          selectionColor="white"
          //TODO: onChange Value
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* button login */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {/* create new account */}
        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity onPress={() => console.log('press')}>
            <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
