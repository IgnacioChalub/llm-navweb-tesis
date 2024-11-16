import create from 'zustand';
import axios from 'axios';
import type {User} from '../types/types';
import {ErrorToast} from '../components/common/Toast/Toast';

interface UserState {
  user: User;
  userFetched: boolean;
  setUserFetched: (userFetched: boolean) => void;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {id: '', username: '', email: ''},
  userFetched: false,
  setUserFetched: (userFetched: boolean) => {
    set({userFetched});
  },

  setUser: (user: User) => {
    set({user, userFetched: true});
  },

  fetchUser: async () => {
    try {
      const response = await axios.get('/api/user', {withCredentials: true});
      const fetchedUser: User = response.data;
      set({user: fetchedUser, userFetched: true});
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      set({user: {id: '', username: '', email: ''}, userFetched: false});
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/logout');
      set({user: {id: '', username: '', email: ''}, userFetched: false});
    } catch {
      ErrorToast('Error logging out');
    }
  },
}));

export default useUserStore;
