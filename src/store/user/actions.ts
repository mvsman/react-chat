import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersDB } from '../../db/db';
import { IUser } from '../../schema/schema';
import { AsyncThunkConfig } from '../store';

export const addUser = createAsyncThunk<void, IUser, AsyncThunkConfig>(
  'user/addUser',
  async ({ username, password }: IUser, { rejectWithValue }) => {
    try {
      const users = await usersDB.users.toArray();

      const hasUser = users.some((u) => u.username === username);

      if (hasUser) {
        return rejectWithValue('Пользователь с таким именем уже существует!');
      }

      const usersCount = await usersDB.users.count();

      await usersDB.users.add({
        id: usersCount + 1,
        username,
        password,
      });
    } catch (error) {
      return rejectWithValue('Ошибка');
    }
  }
);

export const checkUserIsRegistered = createAsyncThunk<
  boolean,
  IUser,
  AsyncThunkConfig
>('user/checkUserIsRegistered', async (_, { rejectWithValue, getState }) => {
  try {
    const users = await usersDB.users.toArray();

    const { username, password } = getState().user;

    const hasUser = users.some(
      (u) => u.username === username && u.password === password
    );

    return hasUser;
  } catch (error) {
    return rejectWithValue('Ошибка');
  }
});
