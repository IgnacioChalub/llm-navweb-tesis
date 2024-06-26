import {ErrorToast} from 'src/app/components/common/Toast/Toast';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/transactions',
});

export const getTransactions = async ({userId}: {userId: number}) => {
  try {
    const response = await apiClient.get(`/${userId}`);
    return response.data;
  } catch (error) {
    ErrorToast(error.response?.data?.error || 'An error occurred');
    return [];
  }
};
