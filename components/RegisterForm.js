import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {
  Button,
  Text,
  Form,
  View,
} from 'native-base';
import {postRegistration, postLogIn} from '../hooks/APIHooks';
import {StyleSheet} from 'react-native';

const RegisterForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(AuthContext);
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    checkUserAvailable,
    registerErrors,
    validateOnSend,
  } = useSignUpForm();

  const doRegister = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed');
      return;
    }
    try {
      const result = await postRegistration(inputs);
      console.log('new user created:', result);
      const userData = await postLogIn(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (e) {
      console.log('registeration error', e.message);
    }
  };

  console.log('RegisterForm', registerErrors);

  return (
    <Form>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          checkUserAvailable(event);
          handleInputEnd('username', event);
        }}
        error={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={(event) => handleInputEnd('password', event)}
        secureTextEntry={true}
        error={registerErrors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Confirm Password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        onEndEditing={(event) => handleInputEnd('confirmPassword', event)}
        secureTextEntry={true}
        error={registerErrors.confirmPassword}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) => handleInputEnd('email', event)}
        error={registerErrors.email}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) => handleInputEnd('full_name', event)}
        error={registerErrors.full_name}
      />
      <View style={styles.container}>
        <Button style={styles.formButton} block onPress={doRegister}>
          <Text>Register</Text>
        </Button>
      </View>
    </Form>
  );
};

const styles = StyleSheet.create({
  formButton: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 250,
    backgroundColor: '#4BBD6A',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
    shadowOffset: {
      height: 5,
    },
  },
  container: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
