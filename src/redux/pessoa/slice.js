import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    pessoas: [],
    loading: false
  }

export const pessoaSlice = createSlice({
    name: 'pessoa',
    initialState,
    reducers: {
        listar: (state,action) => {
            state.loading = true;            
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.pessoas = action.payload;
        },
        listarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao listar as Pessoas!");
        },
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
            toast.success("Pessoa cadastrada com Sucesso!");
        },
        salvarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        atualizar(state,action) {
            state.loading = true;
        },
        atualizarSucesso(state) {
            state.loading = true;
            toast.success("Pessoa atualizada com Sucesso!");
        },
        atualizarError(state) {
            state.loading = true;
            toast.error("Ocorreu um erro ao atualizar a Pessoa!");
        }
    }
});

export const { listar, listarSucesso, listarError, salvar, salvarSucesso, salvarError,
               atualizar, atualizarSucesso,atualizarError } = pessoaSlice.actions;

export default pessoaSlice.reducer;