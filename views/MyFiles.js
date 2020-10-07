import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const MyFiles = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} all={false} />
      <StatusBar style="auto" />
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
