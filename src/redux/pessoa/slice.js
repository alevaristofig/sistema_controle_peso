import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    pessoas: null,
    loading: false
  }

export const pessoaSlice = createSlice({
    name: 'pessoa',
    initialState,
    reducers: {
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso(state) {
            state.loading = false;
            toast.success("Empresa Salva com Sucesso!");
        },
        salvarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao salvar a Empresa!");
        }
    }
});

export const { salvar, salvarSucesso, salvarError } = pessoaSlice.actions;

export default pessoaSlice.reducer;