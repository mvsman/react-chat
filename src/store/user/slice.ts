import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addUser, checkUserIsRegistered } from './actions';
import { UserState } from './utils';

const initialState: UserState = {
  username: '',
  password: '',
  status: 'idle',
  userIsRegistered: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserIsRegistered: (state, action: PayloadAction<boolean>) => {
      state.userIsRegistered = action.payload;
    },
    logout: (state) => {
      state.username = '';
      state.password = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(checkUserIsRegistered.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload;
      })
      .addCase(checkUserIsRegistered.fulfilled, (state, action) => {
        state.status = 'success';
        state.userIsRegistered = action.payload;
      })
      .addCase(checkUserIsRegistered.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = '';
        state.userIsRegistered = false;
      });
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
