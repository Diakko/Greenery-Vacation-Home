/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Content, Form, Text} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {updateFile} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';
import {OutlinedTextField} from '@ubaids/react-native-material-textfield';


const Modify = ({navigation, route}) => {
  const {file} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const doModify = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await updateFile(file.file_id, inputs, userToken);
      console.log('update file info: ', result.message);
    } catch (e) {
      console.error('doModify error', e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    handleInputChange,
    uploadErrors,
    inputs,
    reset,
    setInputs,
  } = useUploadForm();

  useEffect(() => {
    setInputs({
      title: file.title,
      description: file.description,
    });
  }, []);

  const doReset = () => {
    reset();
  };

  return (
    <Container>
      <Content padder>
        {/* TODO add media player (see single.js) */}
        <Form>
          <OutlinedTextField
            autoCapitalize="none"
            placeholder="title"
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={uploadErrors.title}
          />
          <OutlinedTextField
            autoCapitalize="none"
            placeholder="description"
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={uploadErrors.description}
          />
        </Form>
        <Button block
          disabled={(uploadErrors.title !== null ||
            uploadErrors.description !== null)}
          onPress={doModify}>
          <Text>Save</Text>
        </Button>
      </Content>
    </Container>
  );
};


Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};


export default Modify;
