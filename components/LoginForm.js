/* eslint-disable max-len */
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogIn} from '../hooks/APIHooks';
import useLoginForm from '../hooks/LoginHooks';
import {Form, Button, Text, View} from 'native-base';
import FormTextInput from './FormTextInput';
import {StyleSheet} from 'react-native';


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
      <View style={styles.container}>
        <Button style={styles.formButton} block onPress={doLogin}><Text>Login</Text></Button>
      </View>
    </Form>

  );
};

const styles = StyleSheet.create({
  formButton: {
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

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
