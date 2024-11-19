import create from 'zustand';
import axios from 'axios';
import type {GraphData} from 'src/app/types/types';

interface GraphDataState {
  graphData: GraphData[];
  graphDataLoading: boolean;
  fetchGraphData: (userId: string) => void;
  graphDataFetched: boolean;
  setGraphDataFetched: (value: boolean) => void;
}

const useGraphDataStore = create<GraphDataState>((set) => ({
  graphData: [],
  graphDataLoading: false,
  graphDataFetched: false,
  setGraphDataFetched: (value) => set({graphDataFetched: value}),

  fetchGraphData: async (userId) => {
    set({graphDataLoading: true});
    try {
      const response = await axios.get(`/api/graphData/${userId}`);
      set({
        graphData: response.data,
        graphDataLoading: false,
        graphDataFetched: true,
      });
    } catch (error) {
      set({
        graphDataLoading: false,
        graphData: [],
      });
    }
  },
}));

export default useGraphDataStore;
