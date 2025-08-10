import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: typeof window !== 'undefined' ? 
    localStorage.getItem('darkMode') !== null ? 
      localStorage.getItem('darkMode') === 'true' : 
      true : // Default to dark mode if no preference set
    true, // Default to dark mode in SSR
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', action.payload.toString());
      }
      state.value = action.payload;
    },
    toggleDarkMode: (state) => {
      state.value = !state.value;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', state.value.toString());
      }
    },
  },
});

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => {
  if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === null) {
    localStorage.setItem('darkMode', 'true'); // Default to dark mode
  }
  return state.darkMode.value;
};

export default darkModeSlice.reducer;