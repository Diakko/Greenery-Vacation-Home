import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const Home = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} all={true} plants={true} />
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

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
