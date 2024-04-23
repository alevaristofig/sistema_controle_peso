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
        atualizar(state,action) {
            state.loading = true;
        },
        atualizarSucesso(state) {
            state.loading = true;
            toast.success("Pessoa atualizada com Sucesso!");
        },
        atualizarError(state,action) {
            state.loading = true;
            toast.error(action.payload);
        }
    }
});

export const { listar, listarSucesso, listarError, atualizar, 
               atualizarSucesso,atualizarError } = pessoaSlice.actions;

export default pessoaSlice.reducer;