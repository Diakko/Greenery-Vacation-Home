import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'native-base';
import useCommentForm from '../hooks/CommentHooks';
import FormTextInput from './FormTextInput';
import AsyncStorage from '@react-native-community/async-storage';
import {postComments, getComments} from '../hooks/APIHooks';
import {OutlinedTextField} from '@ubaids/react-native-material-textfield';

const CommentForm = ({fileId}) => {
  const [comments, setComments] = useState([]);
  const {
    handleInputChange,
    validateOnSend,
    inputs,
    loginErrors,
    setInputs,
  } = useCommentForm();

  // const fetchOwner = async () => {
  //   const userToken = await AsyncStorage.getItem("userToken");
  //   setOwner(await getUser(file.user_id, userToken));
  // };

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

  useEffect(() => {
    fetchComments();
    // fetchOwner();
  }, []);
  console.log('rivi 51', comments);
  // console.log("rivi 52", fetchOwner);

  return (
    <View>
      <OutlinedTextField
        placeholder="Write"
        onChangeText={(txt) => handleInputChange('comment', txt)}
        value={inputs.comment}
        style={{
          padding: 10,
        }}
      />
      <Button
        title="Comment"
        onPress={doComment}
      >
        <Text style={{fontSize: 12}}>Comment</Text>
      </Button>
      <View
        style={{
          justifyContent: 'space-around',
          paddingVertical: 5,
          borderRadius: 10,
        }}
      >
        <View>
          {comments.map((commentti) => (
            <View
              key={commentti.comment_id} >
              <Text>{commentti.comment}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CommentForm;
