import axios from 'axios';
import {ErrorToast, SuccessToast} from '../components/common/Toast/Toast';
import type {TransactionType} from '../types/types';

interface TransactionData {
  userId: number;
  type: TransactionType;
  amount: number;
  recipientId?: number; // Optional for transfers
}

const apiClient = axios.create({
  baseURL: '/api/transaction',
});

export const performTransaction = async ({
  userId,
  type,
  amount,
  recipientId,
}: TransactionData) => {
  try {
    const response = await apiClient.post(`/${userId}`, {
      type,
      amount,
      recipientId,
    });
    SuccessToast('Transaction successful');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    ErrorToast(error.response?.data?.error || 'An error occurred');
    return {
      success: false,
      message: error.response?.data?.error || 'An error occurred',
    };
  }
};
