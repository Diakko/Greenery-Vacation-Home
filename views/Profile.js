/* eslint-disable no-unused-vars */
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'native-base';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {getAvatar} from '../hooks/APIHooks.js';
import {MaterialCommunityIcons} from '@expo/vector-icons';


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
    <View>
      {user &&
        <View>
          <ImageBackground
            style={{
              width: '100%',
            }}
            source={require('../assets/gradient.png')}>
            <View style={styles.header} >
              <Image source={{uri: mediaUrl + avatar[0].filename}}
                style={styles.avatar}
              />
              <View style={{padding: 3}} >
                <Text style={{
                  color: '#F9EB49',
                  fontFamily: 'Bellota',
                  textAlign: 'right',
                  fontSize: 11,
                }}>Logout</Text>
                <MaterialCommunityIcons
                  style={styles.logOut}
                  name='logout'
                  size={20}
                  color={'#F9EB49'} block onPress={logout} />
              </View>
            </View>
            <Text style={{
              fontFamily: 'Roboto',
              fontSize: 23,
              color: 'white',
              textAlign: 'center',
            }}>{user.full_name}</Text>
            <Text style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              paddingBottom: 20,
              color: 'white',
              textAlign: 'center',
            }}>{user.email}</Text>
          </ImageBackground>
          <View style={styles.bottomContainer}>
            <Button style={styles.formButton}
              block
              onPress={() => {
                navigation.navigate('MyPlants');
              }}>
              <Text style={{color: 'white'}}>My Plants</Text>
            </Button>
            <View style={{padding: 10}}></View>
            <Button style={styles.formButton}
              block
              onPress={() => {
                navigation.navigate('MyCaretakers');
              }}>
              <Text style={{color: 'white'}}>My Caretakers</Text>
            </Button>
          </View>
        </View >
      }
    </View >
  );
};

const styles = StyleSheet.create({
  logOut: {
    color: '#F9EB49',
    fontFamily: 'Bellota',
    textAlign: 'right',
  },
  header: {
    height: 200,
  },
  container: {
    width: null,
    backgroundColor: 'white',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 30,
    width: null,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 60,
  },
  formButton: {
    width: 100,
    backgroundColor: '#4BBD6A',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
    shadowOffset: {
      height: 5,
    },
    alignSelf: 'center',
  },

});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
