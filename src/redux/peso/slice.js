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
        salvarError(state,action) {
            state.loading = false;
            toast.error(action.payload);
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
        },
        apagar(state,action) {
            state.loading = true;
        },
        apgarSucesso(state) {
            state.loading = false;
            toast.success("Peso apagado com Sucesso!");
        },
        apgarError(state) {
            state.loading = false;
            toast.success("Ocorreu um erro ao apagar o peso!");
        }
    }
});

export const { listar, listarSucesso, listarError, salvar, salvarSucesso, salvarError,
               atualizar, atualizarSucesso, atualizarError, apagar, apgarSucesso, 
               apgarError  } = pesoSlice.actions;

export default pesoSlice.reducer;