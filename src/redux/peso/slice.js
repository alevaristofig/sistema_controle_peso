import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    pesos: [],
    loading: false
}

export const pesoSlice = createSlice({
    name: 'peso',
    initialState,
    reducers: {
        listar: (state) => {            
            state.loading = true;
        },
        listarSucesso(state,action) {
            state.loading = false;
            state.pesos = action.payload;
        },
        listarError(state,action) {
            state.loading = false;  
            toast.error("Ocorreu um erro ao listar os Pesos!");         
        },
        salvar(state,action) {
            state.loading = true;
        },
        salvarSucesso(state) {
            state.loading = false;
            toast.success("Peso cadastrado com Sucesso!");
        },
        salvarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao salvar o Peso!");
        }
    }
});

export const { listar, listarSucesso, listarError, salvar, salvarSucesso, salvarError } = pesoSlice.actions;

export default pesoSlice.reducer;