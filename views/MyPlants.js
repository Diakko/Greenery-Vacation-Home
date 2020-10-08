/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView, ImageBackground} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const MyPlants = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/gradient.png')}>
        <List navigation={navigation} all={false} plants={true} />
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

MyPlants.propTypes = {
  navigation: PropTypes.object,
};

export default MyPlants;
