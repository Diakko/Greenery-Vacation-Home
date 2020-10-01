/* eslint-disable max-len */
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogIn} from '../hooks/APIHooks';
import useLoginForm from '../hooks/LoginHooks';
import {Form, Button, Text} from 'native-base';
import FormTextInput from './FormTextInput';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  const {handleInputChange,
    validateOnSend,
    inputs,
    loginErrors,
  } = useLoginForm();

  const doLogin = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed');
      return;
    }

    try {
      const userData = await postLogIn(inputs);
      console.log('user login', userData);
      setIsLoggedIn(true);
      setUser(userData.user);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.error('login error', e.message);
    }
    // navigation.navigate('Home');
  };


  return (
    <Form>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        error={loginErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        error={loginErrors.password}
      />
      <Button block onPress={doLogin}><Text>Login!</Text></Button>
    </Form>

  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
