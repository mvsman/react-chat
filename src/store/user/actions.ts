import { createAsyncThunk } from '@reduxjs/toolkit';
import { LS_USERNAME_KEY } from '../../components/const';

import { usersDB } from '../../db/db';
import { IUser, ValidationError } from '../../schema/schema';
import { AsyncThunkConfig } from '../store';
import { userActions } from './slice';

export const addUser = createAsyncThunk<void, IUser, AsyncThunkConfig>(
  'user/addUser',
  async ({ username, password }: IUser, { rejectWithValue }) => {
    try {
      const users = await usersDB.users.toArray();

      const hasUser = users.some((u) => u.username === username);

      if (hasUser) {
        return rejectWithValue(ValidationError.USERNAME_IS_BUSY);
      }

      const usersCount = await usersDB.users.count();

      await usersDB.users.add({
        id: usersCount + 1,
        username,
        password,
      });
    } catch (error) {
      return rejectWithValue(ValidationError.ERROR);
    }
  }
);

export const checkUserIsRegistered = createAsyncThunk<
  boolean,
  IUser,
  AsyncThunkConfig
>(
  'user/checkUserIsRegistered',
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    const users = await usersDB.users.toArray();

    const isCorrectUsername = users.some((u) => u.username === username);
    const isCorrectPassword = users.some((u) => u.password === password);

    if (isCorrectUsername && !isCorrectPassword) {
      dispatch(userActions.setUserIsRegistered(true));
      return rejectWithValue(ValidationError.INCORRECT_PASSWORD);
    }

    const hasUser = users.some(
      (u) => u.username === username && u.password === password
    );

    if (!hasUser) {
      return rejectWithValue(ValidationError.INCORRECT_USERNAME);
    }

    localStorage.setItem(LS_USERNAME_KEY, username as string);

    return true;
  }
);
