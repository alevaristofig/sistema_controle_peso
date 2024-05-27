import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    pesos: {
        'dados': []
    },
    primeiroPeso: '',
    ultimoPeso: '',
    loading: false,
}

export const pesoSlice = createSlice({
    name: 'peso',
    initialState,
    reducers: {
        listar: (state,action) => {                        
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
        },
        atualizarSucesso(state) {
            state.loading = false;
            toast.success("Peso atualizado com Sucesso!");
        },
        atualizarError(state,action) {
            state.loading = false;
            toast.error(action.payload);
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
        },
        buscarPrimeiroPeso(state,action) {
            state.loading = true;
        },
        buscarPrimeiroPesoSucesso(state,action) {
            state.loading = false;
            state.primeiroPeso = action.payload;
        },
        buscarPrimeiroPesoError(state,action) {
            state.loading = false;
            //toast.error(action.payload.response.data.userMessage);
        },
        buscarUltimoPeso(state,action) {
            state.loading = true;
        },
        buscarUltimoPesoSucesso(state,action) {
            state.loading = false;
            state.ultimoPeso = action.payload;
        },
        buscarUltimoPesoError(state,action) {
            state.loading = false;
           // toast.error(action.payload.response.data.userMessage);
        },
    }
});

export const { listar, listarSucesso, listarError, salvar, salvarSucesso, salvarError,
               atualizar, atualizarSucesso, atualizarError, apagar, apgarSucesso, 
               apgarError, buscarPrimeiroPeso, buscarPrimeiroPesoSucesso,
               buscarPrimeiroPesoError, buscarUltimoPeso, buscarUltimoPesoSucesso,
               buscarUltimoPesoError  } = pesoSlice.actions;

export default pesoSlice.reducer;