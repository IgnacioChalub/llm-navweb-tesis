import create from 'zustand';
import axios from 'axios';
import type {Transaction} from 'src/app/types/types';
import {TransactionType} from 'src/app/types/types';
import {ErrorToast, SuccessToast} from 'src/app/components/common/Toast/Toast';

interface TransactionState {
  transactions: Transaction[];
  transactionsLoading: boolean;
  transactionsFetched: boolean;
  setTransactionsFetched: (value: boolean) => void;
  fetchTransactions: (userId: string) => Promise<void>;
  error: string | null;
  createTransaction: (
    userId: string,
    type: TransactionType,
    amount: number,
    recipientAlias?: string, // Rename to recipientAlias
  ) => Promise<void>;
}

const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  transactionsLoading: false,
  transactionsFetched: false,
  error: null, // Initialize error state
  setTransactionsFetched: (value) => set({transactionsFetched: value}),

  // Fetch transactions for a user
  fetchTransactions: async (userId) => {
    set({transactionsLoading: true, error: null}); // Reset error before fetching
    try {
      const response = await axios.get<Transaction[]>(
        `/api/transactions/${userId}`,
      );
      set({
        transactions: response.data,
        transactionsLoading: false,
        transactionsFetched: true,
      });
    } catch (error: any) {
      // Extract error message from API response
      const errorMessage =
        error.response?.data?.error || 'Failed to fetch transactions.';
      set({
        transactionsLoading: false,
        transactions: [],
        error: errorMessage, // Set error state
      });
      ErrorToast(errorMessage); // Display error toast
    }
  },

  // Create a new transaction
  createTransaction: async (userId, type, amount, recipientAlias) => {
    set({transactionsLoading: true, error: null}); // Reset error before creating
    try {
      const payload: any = {type, amount};
      if (type === TransactionType.TRANSFER && recipientAlias) {
        payload.recipientAlias = recipientAlias.toLowerCase(); // Ensure lowercase
      }

      const response = await axios.post(`/api/transaction/${userId}`, payload); // Corrected endpoint path

      set({transactionsLoading: false});
      SuccessToast('Transaction created successfully.');
    } catch (error: any) {
      // Extract error message from API response
      const errorMessage =
        error.response?.data?.error ||
        'An error occurred during the transaction.';
      set({
        transactionsLoading: false,
        error: errorMessage, // Set error state
      });
      ErrorToast(errorMessage); // Display error toast
    }
  },
}));

export default useTransactionStore;
