import axios from 'axios';
import {ErrorToast, SuccessToast} from 'src/app/components/common/Toast/Toast';
import type {ILoginBody} from 'src/app/types/types';

export const loginUser = async ({username, password}: ILoginBody) => {
  const usernameLower = username.toLowerCase();
  const passwordLower = password.toLowerCase();
  try {
    const response = await axios.post('/api/login', {
      username: usernameLower,
      password: passwordLower,
    });

    if (response.status === 200) {
      SuccessToast('Login successful !');
    } else {
      ErrorToast('Login failed, username or password is incorrect.');
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'Network error, unable to login.';
    ErrorToast(errorMessage);
  }
};
