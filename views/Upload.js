/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Text,
  View,
} from 'native-base';
import {Image, ImageBackground, Platform, StyleSheet} from 'react-native';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  upload,
  appIdentifierPlants,
  appIdentifierCaretakers,
  postTag,
} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Video} from 'expo-av';
import {OutlinedTextField} from '@ubaids/react-native-material-textfield';
import FormTextInput from '../components/FormTextInput';


const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('image');
  const [plantsValue, setPlantsValue] = useState(true);

  const doUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // lisätään tekstikentät formDataan
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `${fileType}/${match[1]}` : fileType;
      if (type === 'image/jpg') type = 'image/jpeg';


      formData.append('file', {uri: image, name: filename, type});
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await upload(formData, userToken);
      console.log('Upload', resp);

      let postTagResponse = '';
      if (plantsValue) {
        postTagResponse = await postTag({
          file_id: resp.file_id,
          tag: appIdentifierPlants,
        }, userToken);
      } else {
        postTagResponse = await postTag({
          file_id: resp.file_id,
          tag: appIdentifierCaretakers,
        }, userToken);
      }
      console.log('posting tag', postTagResponse);


      setTimeout(() => {
        doReset();
        if (plantsValue) {
          navigation.push('Home');
        } else {
          navigation.push('Caretakers');
        }
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      console.error('upload error', e);
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setFileType(result.type);
      }

      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  });

  const {
    handleInputChange,
    uploadErrors,
    inputs,
    reset,
  } = useUploadForm();

  const doReset = () => {
    reset();
    setImage(null);
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
          {image &&
            <>
              {fileType === 'image' ?
                <Image
                  source={{uri: image}}
                  style={{height: 400, width: null, flex: 1}}
                /> :
                <Video
                  source={{uri: image}}
                  style={{height: 400, width: null, flex: 1}}
                  useNativeControls={true}
                />
              }
            </>
          }
          <View style={{paddingBottom: 20}}></View>
          <Form>
            <Text style={{color: 'white', paddingLeft: 10}}>Title</Text>
            <FormTextInput
              autoCapitalize="none"
              value={inputs.title}
              onChangeText={(txt) => handleInputChange('title', txt)}
              error={uploadErrors.title}
            />
            <Text style={{color: 'white', paddingLeft: 10}}>Description</Text>
            <FormTextInput
              autoCapitalize="none"
              value={inputs.description}
              onChangeText={(txt) => handleInputChange('description', txt)}
              error={uploadErrors.description}
            />
          </Form>
          <Form>
            <Picker
              mode='dialog'
              selectedValue={plantsValue}
              style={{
                height: 50,
                width: 150,
              }}
              onValueChange={
                (itemValue, itemIndex) => setPlantsValue(itemValue)
              }>
              <Picker Item style={{color: 'white'}}
                label="Plants"
                value={true} />
              <Picker Item label="Caretakers"
                value={false} />
            </Picker>
          </Form>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
          }}>
            <Button style={styles.formButton} block onPress={pickImage}>
              <Text>Choose file</Text>
            </Button>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <Button style={{
              width: 250,
              backgroundColor: '#318053',
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 20,
              shadowOffset: {
                height: 5,
              },
            }} block disabled={(uploadErrors.title !== null ||
              uploadErrors.description !== null || image === null)}
              onPress={doUpload}>
              <Text>Upload</Text>
            </Button>
          </View>

          <View style={{padding: 5}}></View>
          <Text style={{
            textAlign: 'center',
            color: '#318053',
            fontFamily: 'Bellota',
            fontSize: 15,
          }} block onPress={doReset}>
            Reset</Text>
        </Content>
      </ImageBackground>
    </Container >
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: 250,
    backgroundColor: '#4BBD6A',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
    shadowOffset: {
      height: 5,
    },
  },
  container: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});


Upload.propTypes = {
  navigation: PropTypes.object,
};


export default Upload;
