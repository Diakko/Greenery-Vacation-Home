
import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item, View, Label} from 'native-base';

const FormTextInput = ({style, error, ...otherProps}) => {
  return (
    <View>
      <Input
        {...otherProps}
      />
      {error !== '' && <Label>{error}</Label>}
    </View>
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

export default FormTextInput;
