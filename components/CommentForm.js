import React, {useState, useEffect} from 'react';
import {View, Button, Text, CardItem, Textarea} from 'native-base';
import useCommentForm from '../hooks/CommentHooks';
import AsyncStorage from '@react-native-community/async-storage';
import {postComments, getComments} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const CommentForm = ({fileId}) => {
  const [comments, setComments] = useState([]);
  const [] = useState({});
  const {
    handleInputChange,
    validateOnSend,
    inputs,
    setInputs,
  } = useCommentForm();

  const doComment = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed');
      return;
    }
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const commentData = await postComments(inputs, userToken);
      console.log('user comment success:', commentData);
    } catch (e) {
      console.log('comment error', e.message);
    }
    // navigation.navigate('Home');
  };

  const fetchComments = async () => {
    setInputs((inputs) => {
      return {
        ...inputs,
        file_id: fileId,
      };
    });


    try {
      setComments(await getComments(fileId));
    } catch (e) {
      console.log('comment error', e.message);
    }
  };

  /* const fetchOwner = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setOwner(await getUser(comment.user_id, userToken));
  }; */


  useEffect(() => {
    fetchComments();
    // fetchOwner();
  }, []);
  console.log('rivi 51', comments);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{
        fontFamily: 'Bellota_bold',
        color: '#318053',
        fontSize: 17,
        paddingBottom: 10,
      }}>Comments:</Text>
      {comments.map((comment) => (
        <View
          style={{
            paddingVertical: 5,
          }}
          key={comment.comment_id} >
          {/* <Text>{owner.username}</Text> */}
          <CardItem style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
          }}>
            <Text style={{fontSize: 14}}>{comment.comment}</Text>
          </CardItem>
        </View>
      ))}
      <View style={{padding: 10}} />
      <Textarea
        style={{borderWidth: 1, borderRadius: 5, borderColor: '#4BBD6A'}}
        autoCapitalize="none"
        label="Message"
        placeholder='Leave a message...'
        onChangeText={(txt) => handleInputChange('comment', txt)}
        value={inputs.comment}
      />
      <View style={{padding: 10}}></View>
      <Button
        title="Comment"
        onPress={doComment}
        style={{
          alignSelf: 'center',
          backgroundColor: '#4BBD6A',
          paddingTop: 10,
        }}
      >
        <Text style={{
          fontSize: 15,
          width: 200,
          textAlign: 'center',
        }}>Contact</Text>
      </Button>
      <View style={{padding: 20}} />
    </View>
  );
};

CommentForm.propTypes = {
  fileId: PropTypes.number,
};

export default CommentForm;
