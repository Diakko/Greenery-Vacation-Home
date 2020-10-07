import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const Caretakers = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} all={true} plants={false} />
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

Caretakers.propTypes = {
  navigation: PropTypes.object,
};

export default Caretakers;
