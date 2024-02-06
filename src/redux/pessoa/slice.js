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
        buscar: (state,action) => {            
            state.loading = true;
        },
        buscarSucesso: (state,action) => {
            state.loading = true;
            state.pessoas = action.payload;
        },
        buscarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao buscar a Pessoa!");
        },
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
            toast.success("Pessoa cadastrada com Sucesso!");
        },
        salvarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao salvar a Pessoa!");
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
               buscar, buscarSucesso, buscarError, atualizar, atualizarSucesso,
               atualizarError 
            } = pessoaSlice.actions;

export default pessoaSlice.reducer;