/* eslint-disable no-unused-vars */
import {StyleSheet} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item, View, Label, Text} from 'native-base';

const FormTextInput = ({style, error, ...otherProps}) => {
  return (
    <View>
      <Item regular style={styles.form}>
        <Input style={{color: '#fff'}}
          {...otherProps}
        />
      </Item>
      <Text style={{
        color: 'white',
      }}>{error !== '' &&
        <Label style={{
          fontSize: 14,
          textAlign: 'center',
        }}>{error}</Label>}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

export default FormTextInput;
