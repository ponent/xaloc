import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { readdirSync } from 'fs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import type { RootState } from '../../store'

// Define a type for the slice state
interface CounterState {
  value: number;
  user: UserEntity;
  loading: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  user: {username: "Empty", id: -1},
  loading: false
}

export type UserEntity = {
    id: number;
    username: string;
}

const generateUsername = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.substring(0,30);
 }

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId: number, {dispatch}) => {
      dispatch(setLoading(true))
      return await new Promise<UserEntity>(res => setTimeout(() => res({id: userId, username: generateUsername(userId)}), 2000))
    }
  )

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload
      state.loading = false
    })
  },
})

export const { increment, decrement, incrementByAmount, setLoading } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer