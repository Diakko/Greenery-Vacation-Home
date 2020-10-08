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
import {StyleSheet, ImageBackground} from 'react-native';


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
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../assets/gradient.png')}>
        <Content padder>
          <Form>
            <Text style={{color: 'white', paddingLeft: 10}}>Title</Text>
            <FormTextInput
              autoCapitalize="none"
              label='Title'
              value={inputs.title}
              onChangeText={(txt) => handleInputChange('title', txt)}
              error={uploadErrors.title}
            />
            <Text style={{color: 'white', paddingLeft: 10}}>Description</Text>
            <FormTextInput
              autoCapitalize="none"
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
            <Text style={{
              textAlign: 'center',
              paddingTop: 10,
              color: '#318053',
              fontFamily: 'Bellota',
              fontSize: 15,
            }} block onPress={doReset}> Reset</Text>
          </View>
        </Content>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  formButton: {
    paddingTop: 10,
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
