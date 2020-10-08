/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Image, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Left,
  Text,
  Content,
  Container,
  View,
} from 'native-base';
import {Video} from 'expo-av';
import {getUser} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import {FontAwesome} from '@expo/vector-icons';
import CommentForm from '../components/CommentForm';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const [error, setError] = useState(false);
  const [owner, setOwner] = useState({});
  const [videoRef, setVideoRef] = useState(null);
  const {file} = route.params;

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.presentFullscreenPlayer();
    } catch (e) {
      console.log('svifs error', e.message);
    }
  };

  const unlock = async () => {
    await ScreenOrientation.unlockAsync();
  };

  const lock = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    );
  };

  const fetchOwner = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setOwner(await getUser(file.user_id, userToken));
  };

  useEffect(() => {
    unlock();
    fetchOwner();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('Orientation: ', evt);
      if (evt.orientationInfo.orientation > 2) {
        showVideoInFullscreen();
      }
    });

    return () => {
      lock();
      ScreenOrientation.removeOrientationChangeListener(orientSub);
    };
  }, [videoRef]);

  return (
    <Container>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../assets/gradient.png')}>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Left>
                <FontAwesome name="pagelines"
                  size={17} />
                <Text>{owner.username}</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <>
                {file.media_type === 'image' ?
                  <Image
                    source={{uri: mediaUrl + file.filename}}
                    style={{height: 400, width: null, flex: 1}}
                  /> :
                  <Video
                    ref={handleVideoRef}
                    source={{
                      uri:
                        error ? 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' :
                          mediaUrl + file.filename,
                    }}
                    style={{height: 400, width: null, flex: 1}}
                    useNativeControls={true}
                    resizeMode="cover"
                    posterSource={{uri: mediaUrl + file.screenshot}}
                    usePoster={true}
                    posterStyle={{height: 400, width: null, flex: 1}}
                    onError={(err) => {
                      console.log('video error', err);
                      setError(true);
                    }}
                  />
                }
              </>
            </CardItem>
            <CardItem>
              <Text>
                {file.description}
              </Text>
            </CardItem>

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 20,
            }}>
              <CardItem>
                <CommentForm fileId={file.file_id} />
              </CardItem>
            </View>
          </Card>
        </Content>
      </ImageBackground>

    </Container>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
