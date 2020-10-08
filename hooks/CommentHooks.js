
import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  comment: {
    presence: {
      message: 'cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to be at least 3 characters.',
    },
  },
};

const useCommentForm = () => {
  const [commentErrors, setCommentErrors] = useState({});
  const [inputs, setInputs] = useState({
    comment: '',
    file_id: '',
  });

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints);
    setCommentErrors((commentErrors) => {
      return {
        ...commentErrors,
        [name]: error,
      };
    });

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const validateOnSend = () => {
    const commentError = validator('comment', inputs.comment, constraints);
    if (commentError !== null) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleInputChange,
    validateOnSend,
    setInputs,
    inputs,
    commentErrors,
  };
};

export default useCommentForm;
