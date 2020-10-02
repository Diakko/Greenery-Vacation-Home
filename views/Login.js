import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {
  Content,
  Text,
  View,
} from 'native-base';
import {ImageBackground, KeyboardAvoidingView, StyleSheet} from 'react-native';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  const [showRegisteration, setShowRegisteration] = useState(true);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        console.log('token valid: ', userData);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (e) {
        console.error('token check failed');
      }
      // navigation.navigate('home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <ImageBackground source={require('../assets/gradient.png')}
      style={{width: '100%', height: '100%'}}>
      <Content padder>
        <MaterialCommunityIcons
          style={{alignSelf: 'center', paddingTop: 30}}
          name="flower-tulip-outline"
          size={100}
          color={'#F9EB49'}
        />
        <Text style={styles.welcomeText}>
          Welcome to Greenery!
        </Text>
        <KeyboardAvoidingView>
          {showRegisteration ?
            <LoginForm navigation={navigation} /> :
            <RegisterForm navigation={navigation} />
          }

          <View style={{paddingTop: 10}}></View>
          <Text block onPress={() => {
            setShowRegisteration(!showRegisteration);
          }}>
            <Text style={styles.formText} >
              {
                showRegisteration ? 'Create Account' :
                  'Return to Login'
              }
            </Text>
          </Text>
          <View style={{paddingBottom: 50}}></View>
        </KeyboardAvoidingView>
      </Content>
    </ImageBackground >
  );
  // navigation.navigate('Home');
};

const styles = StyleSheet.create({
  formText: {
    color: '#165A28',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Bellota',
  },
  welcomeText: {
    fontFamily: 'Bellota_bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 30,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
