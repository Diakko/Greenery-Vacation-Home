/* eslint-disable max-len */
import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to be at least 3 characters.',
    },
  },
  description: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 5,
      message: 'needs to be at least 5 characters.',
    },
  },
};

const useUploadForm = (callback) => {
  const [uploadErrors, setUploadErrors] = useState({});
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints);
    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
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
    const titleError = validator('title', inputs.title, constraints);
    const descriptionError = validator('description', inputs.description, constraints);
    if (titleError !== null || descriptionError !== null) {
      return false;
    } else {
      return true;
    }
  };

  const reset = () => {
    setInputs({
      title: '',
      description: '',
    });
    setUploadErrors({});
  };

  return {
    handleInputChange,
    validateOnSend,
    reset,
    setInputs,
    inputs,
    uploadErrors,
  };
};

export default useUploadForm;
