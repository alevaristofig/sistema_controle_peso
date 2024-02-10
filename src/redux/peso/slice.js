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
        buscar(state,action) {                   
            state.loading = true; 
        },
        buscarSucesso(state,action) {
            state.loading = false;
            state.pesos = action.payload;
        },
        buscarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao buscar o peso!");   
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
        },
        atualizar(state,action) {
            state.loading = true;
            console.log(action)
        },
        atualizarSucesso(state) {
            state.loading = false;
            toast.success("Peso atualizado com Sucesso!");
        },
        atualizarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao atualizar o peso!");
        }
    }
});

export const { listar, listarSucesso, listarError, salvar, salvarSucesso, salvarError,
               buscar, buscarSucesso, buscarError, atualizar, atualizarSucesso,
               atualizarError } = pesoSlice.actions;

export default pesoSlice.reducer;