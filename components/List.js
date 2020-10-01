import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/APIHooks';
import {AuthContext} from '../contexts/AuthContext';

const List = ({navigation, all}) => {
  const {user} = useContext(AuthContext);
  const mediaArray = useLoadMedia(all, user.user_id);

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
};

export default List;
