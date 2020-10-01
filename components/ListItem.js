/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as NBListItem, Left, Body, Text, Right, Button, Thumbnail, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import {deleteFile} from '../hooks/APIHooks';
import AsyncStorage from '@react-native-community/async-storage';

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
    <NBListItem style={{height: 150}} thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
        />
      </Left>
      <Body>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text note numberOfLines={1} style={styles.description}>{singleMedia.description}</Text>
      </Body>
      <Right>
        <Button onPress={
          () => {
            navigation.navigate('Single', {file: singleMedia});
          }
        }><Text>View</Text>
        </Button>
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
      </Right>
    </NBListItem >
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFF',
  },
  textBox: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};

export default ListItem;
