import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    alimentos: {
        'dados': []
    },
    loading: false
}

export const alimentoSlice = createSlice({
    name: 'alimento',
    initialState,
    reducers: {
        listar: (state,action) => {
            state.loading = true;
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.alimentos = action.payload            
        },
        listarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao listar os Alimentos!");
        },
        listarAlimentos: (state) => {
            state.loading = true;
        },
        listarAlimentosSucesso: (state, action) => {
            state.loading = false;
            state.alimentos = action.payload
        },
        listarAlimentosError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao listar os Alimentos!");
        },
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
            toast.success("Alimento cadastrado com Sucesso!");
        },
        salvarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        atualizar: (state,action) => {
            state.loading = true;
        },
        atualizarSucesso: (state,action) => {
            state.loading = false;
            toast.success("Alimento atualizado com Sucesso!");
        },
        atualizarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        apagar: (state,action) => {
            state.loading = true;
        },
        apagarSucesso: (state) => {
            state.loading = false;
            toast.success("Alimento apagado com Sucesso!");
        },
        apagarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao apagar o Alimento!");
        }
    }
});

export const { salvar, salvarSucesso, salvarError, listar, listarSucesso, listarError,
               apagar, apagarSucesso, apagarError, atualizar, atualizarSucesso,
               atualizarError, listarAlimentos, listarAlimentosSucesso,
               listarAlimentosError } = alimentoSlice.actions;

export default alimentoSlice.reducer;