/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Content, Form, Text, View} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {updateFile} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';
import {OutlinedTextField} from '@ubaids/react-native-material-textfield';
import {StyleSheet} from 'react-native';


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
        <Form>
          <OutlinedTextField
            autoCapitalize="none"
            tintColor='rgb(75, 189, 106)'
            textColor='rgb(75, 189, 106)'
            baseColor='rgb(75, 189, 106)'
            errorColor='rgb(249, 235, 73)'
            label='Title'
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={uploadErrors.title}
          />
          <OutlinedTextField
            autoCapitalize="none"
            tintColor='rgb(75, 189, 106)'
            textColor='rgb(75, 189, 106)'
            baseColor='rgb(75, 189, 106)'
            errorColor='rgb(249, 235, 73)'
            label='Description'
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={uploadErrors.description}
          />
        </Form>
        <View style={styles.formButton}>
          <Button block
            disabled={(uploadErrors.title !== null ||
              uploadErrors.description !== null)}
            onPress={doModify}
            style={{backgroundColor: '#4BBD6A'}}>
            <Text>Save</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  formButton: {
    alignSelf: 'center',
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
    shadowOffset: {
      height: 5,
    },
  },
});

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};


export default Modify;
