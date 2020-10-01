import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {
  Container,
  Content,
  Button,
  Text,
  View,
} from 'native-base';

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
    <Container>
      <Content padder>
        {showRegisteration ?
          <LoginForm navigation={navigation} /> :
          <RegisterForm navigation={navigation} />
        }
        <View style={{alignItems: 'center'}}>
          <Text>or</Text>
        </View>

        <Button block onPress={() => {
          setShowRegisteration(!showRegisteration);
        }}>
          <Text>
            {showRegisteration ? 'Register' :
              'Login'
            }
          </Text>
        </Button>
      </Content>
    </Container>
  );
  // navigation.navigate('Home');
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
