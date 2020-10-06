/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, {useContext} from 'react';
import {
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {AuthContext} from '../contexts/AuthContext';
import Upload from '../views/Upload';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import {getAvatar} from '../hooks/APIHooks.js';
import {
  AntDesign,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import Caretakers from '../views/Caretakers';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      shifting
      activeColor='white'
      barStyle={{
        backgroundColor: '#4BBD6A',
      }}
    >
      <Tab.Screen name='Home'
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='flower-tulip-outline'
              size={26}
              color='white' />
          ),
        }} />
      <Tab.Screen name='Caretakers'
        component={Caretakers}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='spray-bottle'
              size={28}
              color='white' />
          ),
        }} />
      <Tab.Screen name='Profile'
        component={Profile}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name='user'
              size={25}
              color='white' />
          ),
        }} />
      <Tab.Screen name='Upload'
        component={Upload}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name='clouduploado'
              size={25}
              color='white' />
          ),
        }} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <Stack.Navigator >
      {isLoggedIn ? (
        <>
          <Stack.Screen name='Home' component={TabScreen}
            options={{
              title: 'Greenery',
              headerPressColorAndroid: '#4BBD6A',
              headerStyle: {
                backgroundColor: '#4BBD6A',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Bellota_bold',
                fontSize: 25,
              },
            }} />
          <Stack.Screen name='Single' component={Single} />
          <Stack.Screen name='MyFiles' component={MyFiles} />
          <Stack.Screen name='Modify' component={Modify} />
        </>
      ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name='Login'
              component={Login} />
          </>
        )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
