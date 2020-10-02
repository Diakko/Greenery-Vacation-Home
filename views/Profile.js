import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  Button,
  CardItem,
  Icon,
  Container,
  Content,
  Card,
  Body,
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {getAvatar} from '../hooks/APIHooks.js';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(AuthContext);
  const [avatar, setAvatar] = useState([{filename: ''}]);

  const fetchAvatar = async () => {
    setAvatar(await getAvatar());
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('profile.js', avatar[0].filename);

  console.log('logged in userdata: ', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Content padder>
        {user &&
          <Card style={{height: 600}}>
            <CardItem header bordered>
              <Icon name='person' />
              <Text>Username: {user.username}</Text>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: mediaUrl + avatar[0].filename}}
                style={{
                  height: 100,
                  width: null,
                  flex: 1,
                  borderRadius: 100,
                }}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>{user.full_name}</Text>
                <Text>{user.email}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  onPress={() => {
                    navigation.navigate('MyFiles');
                  }}>
                  <Text>My Files</Text>
                </Button>
                <Text block onPress={logout}>
                  <Text style={styles.formText}>Log out</Text>
                </Text>
              </Body>
            </CardItem>
          </Card>
        }
      </Content>
    </Container>
  );
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

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
