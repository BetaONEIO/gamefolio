import {createSlice} from '@reduxjs/toolkit';

export type InitialState = {
  theme: string;
  language: string;
};

const initialState: InitialState = {
  theme: 'light',
  language: 'en',
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});
export const {setTheme, setLanguage} = slice.actions;
export default slice.reducer;
