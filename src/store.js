import { configureStore } from '@reduxjs/toolkit';
import searchJobsReducer from './store/reducers/searchReducers';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.log("error", err)
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    search: searchJobsReducer,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
