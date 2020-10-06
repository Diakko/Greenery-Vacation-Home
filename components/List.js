import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/APIHooks';
import {AuthContext} from '../contexts/AuthContext';

const List = ({navigation, all, plants}) => {
  const {user} = useContext(AuthContext);
  let mediaArray = '';
  if (plants) {
    mediaArray = useLoadMedia(all, user.user_id, plants);
  } else {
    mediaArray = useLoadMedia(all, user.user_id, plants);
  }

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={
        ({item}) => <ListItem
          singleMedia={item}
          navigation={navigation}
          editable={!all}
        />
      }
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  all: PropTypes.bool,
  plants: PropTypes.bool,
};

export default List;

