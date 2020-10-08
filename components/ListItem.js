/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as Container, Body, Text, Button, Thumbnail, Icon, Content, CardItem, Card, Left, Right, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {deleteFile} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  FontAwesome,
} from '@expo/vector-icons';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const ListItem = ({navigation, singleMedia, editable}) => {
  const doDelete = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await deleteFile(singleMedia.file_id, userToken);
      console.log('Delete file: ', result);
      navigation.replace('Home');
    } catch (e) {
      console.error('deletebutton', e);
    }
  };

  return (
    <Container>
      <Content>
        <Card style={{flex: 1}} >
          <TouchableOpacity onPress={
            () => {
              navigation.navigate('Single', {file: singleMedia});
            }}>
            <CardItem header bordered>
              <Left>
                <Thumbnail source={{uri: mediaUrl + singleMedia.thumbnails.w160}} />
                <Body>
                  <Text style={styles.title}>{singleMedia.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text note numberOfLines={3} style={styles.description}>{singleMedia.description}</Text>
              </Body>
            </CardItem>
          </TouchableOpacity>

          {editable && <>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <Button transparent onPress={
                () => {
                  navigation.navigate('Modify', {file: singleMedia});
                }
              }><FontAwesome style={{color: '#318053', fontSize: 20}} name={'edit'} />
                <Text style={{color: '#318053'}}>Modify</Text>
              </Button>
              <Button transparent onPress={doDelete}>
                <FontAwesome style={{color: '#318053', fontSize: 20}} name={'trash'} />
                <Text style={{color: '#318053'}}>Delete</Text>
              </Button>
            </View>
          </>
          }
        </Card>
      </Content >
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Roboto_medium',
  },
  description: {
    textAlign: 'left',
    fontSize: 14,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};

export default ListItem;
