import create from 'zustand';
import axios from 'axios';
import type {Transaction} from '../types/types';
import {TransactionType} from '../types/types';

interface TransactionState {
  transactions: Transaction[];
  transactionsLoading: boolean;
  transactionsFetched: boolean;
  setTransactionsFetched: (value: boolean) => void;
  fetchTransactions: (userId: string) => Promise<void>;
  createTransaction: (
    userId: string,
    type: TransactionType,
    amount: number,
    recipientId?: string,
  ) => Promise<void>;
}

const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  transactionsLoading: false,
  error: null,
  transactionsFetched: false,
  setTransactionsFetched: (value) => set({transactionsFetched: value}),

  // Fetch transactions for a user
  fetchTransactions: async (userId) => {
    set({transactionsLoading: true});
    try {
      const response = await axios.get<Transaction[]>(
        `/api/transactions/${userId}`,
      );
      set({
        transactions: response.data,
        transactionsLoading: false,
        transactionsFetched: true,
      });
    } catch (error) {
      set({
        transactionsLoading: false,
        transactions: [],
      });
    }
  },

  // Create a new transaction
  createTransaction: async (userId, type, amount, recipientId) => {
    set({transactionsLoading: true});
    try {
      const payload: any = {type, amount};
      if (type === TransactionType.TRANSFER && recipientId) {
        payload.recipientId = recipientId;
      }

      const response = await axios.post(`/api/transaction/${userId}`, payload);

      set({transactionsLoading: false});
    } catch (error) {
      set({
        transactionsLoading: false,
      });
    }
  },
}));

export default useTransactionStore;
