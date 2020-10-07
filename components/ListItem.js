/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as Container, Body, Text, Button, Thumbnail, Icon, Content, CardItem, Card, Left, Right, View} from 'native-base';
import {ImageBackground, StyleSheet} from 'react-native';
import {deleteFile} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const ListItem = ({navigation, singleMedia, editable}) => {
  const doDelete = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await deleteFile(singleMedia.file_id, userToken);
      console.log('Delete file: ', result);
      navigation.replace('MyFiles');
    } catch (e) {
      console.error('deletebutton', e);
    }
  };

  return (
    <Container>
      <Content>
        <TouchableOpacity onPress={
          () => {
            navigation.navigate('Single', {file: singleMedia});
          }}>
          <Card style={{flex: 0}} >
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
                <Text note style={styles.description}>{singleMedia.description}</Text>
              </Body>
            </CardItem>
            {editable && <>
              <Button transparent onPress={
                () => {
                  navigation.navigate('Modify', {file: singleMedia});
                }
              }><Icon name={'create'}></Icon><Text>Modify</Text>
              </Button>
              <Button danger transparent onPress={doDelete}>
                <Icon name={'trash'}></Icon>
                <Text>Delete</Text>
              </Button>
            </>
            }
          </Card>
        </TouchableOpacity>
      </Content >
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    color: 'black',
  },
  description: {
    textAlign: 'left',
    fontSize: 13,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};

export default ListItem;
