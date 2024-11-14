import create from 'zustand';
import axios from 'axios';

interface BalanceState {
  balance: number | null;
  balanceLoading: boolean;
  error: string | null;
  fetchBalance: (userId: string) => void;
  balanceFetched: boolean; // Ensure this flag exists
  setBalanceFetched: (value: boolean) => void; // Function to update the fetched state
}

const useBalanceStore = create<BalanceState>((set) => ({
  balance: null,
  balanceLoading: false,
  error: null,
  balanceFetched: false,
  setBalanceFetched: (value) => set({balanceFetched: value}),

  fetchBalance: async (userId) => {
    set({balanceLoading: true, error: null});
    try {
      const response = await axios.get(`/api/balance/${userId}`);
      set({
        balance: response.data.balance,
        balanceLoading: false,
        balanceFetched: true,
      });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch balance',
        balanceLoading: false,
        balance: null,
      });
    }
  },
}));

export default useBalanceStore;
