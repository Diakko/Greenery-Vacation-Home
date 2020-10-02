import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item, View, Label} from 'native-base';
import {StyleSheet} from 'react-native';


const FormTextInput = ({style, error, ...otherProps}) => {
  return (
    <View>
      <Item rounded>
        <Input style={styles.formText}
          {...otherProps}
        />
      </Item>
      {error !== '' && <Label style={styles.errorText} >{error}</Label>}
    </View>
  );
};

const styles = StyleSheet.create({
  formText: {
    color: 'white',
    paddingLeft: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

export default FormTextInput;
