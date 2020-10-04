/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {
  AntDesign,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='flower-tulip-outline'
              size={34}
              color='black' />
          ),
        }} />
      <Tab.Screen name='Profile' component={Profile}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name='user'
              size={25}
              color='black' />
          ),
        }} />
      <Tab.Screen name='Upload' component={Upload}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name='clouduploado'
              size={37}
              color='black' />
          ),
        }} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name='Home' component={TabScreen}
            options={{title: 'Greenery'}} />
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
