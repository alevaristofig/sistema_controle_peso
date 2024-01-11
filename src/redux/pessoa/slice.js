import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pessoa: null,
  }

export const pessoaSlice = createSlice({
    name: 'pessoa',
    initialState,
    reducers: {
        buscar(state,action) {

        }
    }
});

export const { buscar } = pessoaSlice.actions;

export default pessoaSlice.reducer;