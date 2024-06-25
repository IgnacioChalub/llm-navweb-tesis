import create from 'zustand';
import axios from 'axios';

interface BalanceState {
  balance: number | null;
  loading: boolean;
  error: string | null;
  fetchBalance: (userId: number) => void;
  balanceFetched: boolean; // Ensure this flag exists
  setBalanceFetched: (value: boolean) => void; // Function to update the fetched state
}

const useBalanceStore = create<BalanceState>((set) => ({
  balance: null,
  loading: false,
  error: null,
  balanceFetched: false,
  setBalanceFetched: (value) => set({balanceFetched: value}),

  fetchBalance: async (userId) => {
    set({loading: true, error: null});
    try {
      const response = await axios.get(`/api/balance/${userId}`);
      set({
        balance: response.data.balance,
        loading: false,
        balanceFetched: true,
      });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch balance',
        loading: false,
        balance: null,
      });
    }
  },
}));

export default useBalanceStore;
