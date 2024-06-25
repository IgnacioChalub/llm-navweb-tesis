import axios from 'axios';
import {ErrorToast, SuccessToast} from 'src/app/components/common/Toast/Toast';
import type {IRegisterBody} from 'src/app/types/types';

export const registerUser = async ({
  email,
  username,
  password,
}: IRegisterBody) => {
  try {
    const response = await axios.post('/api/register', {
      email,
      username,
      password,
    });

    if (response.status === 200) {
      SuccessToast('Register successful!');
    } else {
      ErrorToast('Register failed.');
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'Network error, unable to register.';
    ErrorToast(errorMessage);
  }
};
