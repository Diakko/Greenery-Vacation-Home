import {useState} from 'react';
import {validator} from '../utils/validator';
import {checkAvailable} from './APIHooks';

const constraints = {
  username: {
    presence: {
      message: 'cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to be at least 3 characters.',
    },
  },
  password: {
    presence: {
      message: 'cannot be empty.',
    },
    length: {
      minimum: 5,
      message: 'needs to be at least 5 characters.',
    },
  },
  confirmPassword: {
    equality: 'password',
  },
  email: {
    presence: {
      message: 'cannot be blank.',
    },
    email: {
      message: 'address is not valid',
    },
  },
  full_name: {
    length: {
      minimum: 3,
      message: 'minimum 3 characters',
    },
  },
};

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    full_name: '',
  });
  const [registerErrors, setRegisterErrors] = useState({});


  const handleInputChange = (name, text) => {
    // handle just input, no validation
    // console.log('RegisterHooks.js', name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const handleInputEnd = (name, event) => {
    // dis is for validation
    console.log('RegisterHooks.js', name, event.nativeEvent.text);
    const text = event.nativeEvent.text;
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
    let error;
    if (name === 'confirmPassword') {
      error = validator(name, {
        password: inputs.password,
        confirmPassword: text,
      }, constraints);
    } else {
      error = validator(name, text, constraints);
    }

    setRegisterErrors((registerErrors) => {
      return {
        ...registerErrors,
        [name]: error,
      };
    });
  };

  const validateOnSend = () => {
    const usernameError = validator('username', inputs.username, constraints);
    const passwordError = validator('password', inputs.password, constraints);
    const emailError = validator('email', inputs.email, constraints);
    const confirmError = validator('confirmPassword', {
      password: inputs.password,
      confirmPassword: inputs.confirm,
    }, constraints);

    const fullNameError = validator('full_name', inputs.full_name, constraints);
    setRegisterErrors((registerErrors) => ({
      ...registerErrors,
      username: usernameError,
      password: passwordError,
      email: emailError,
      confirm: confirmError,
      full_name: fullNameError,
    }));


    for (const val of Object.values(registerErrors)) {
      console.log('validation error: ', val);
      if (val !== null) {
        return false;
      }
    }
    return true;
  };

  const checkUserAvailable = async (event) => {
    const username = event.nativeEvent.text;
    try {
      if (!registerErrors.username) {
        return;
      }
      const result = await checkAvailable(username);
      setRegisterErrors((registerErrors) => ({
        ...registerErrors,
        username: result,
      }));
    } catch (error) {
      console.log('checkUserAvailable error', error.message);
    }
  };

  return {
    handleInputChange,
    handleInputEnd,
    validateOnSend,
    checkUserAvailable,
    inputs,
    registerErrors,
  };
};

export default useSignUpForm;
