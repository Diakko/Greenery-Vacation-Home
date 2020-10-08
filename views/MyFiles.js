/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView, ImageBackground} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const MyFiles = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{width: '100%'}}
        source={require('../assets/gradient.png')}>
        <List navigation={navigation} all={false} />
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

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
