import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    exercicios: {
        'dados': []
    },
    exerciciosSemPaginacao: [],
    loading: false
}

export const exercicioSlice = createSlice({
    name: 'exercicio',
    initialState,
    reducers: {
        listar: (state,action) => {                                  
            state.loading = true;
        },
        listarSucesso(state,action) {
            state.loading = false;
            state.exercicios = action.payload;
        },
        listarError(state,action) {
            state.loading = false;  
            toast.error("Ocorreu um erro ao listar os Exercícios!");         
        },
        listarSemPaginacao(state) {            
            state.loading = true;
        },
        listarSemPaginacaoSucesso(state,action) {
            state.loading = false;
            state.exerciciosSemPaginacao = action.payload;
        },
        listarSemPaginacaoError(state) {
            state.loading = false;                
        },
        salvar(state,action) {
            state.loading = true;
        },
        salvarSucesso(state) {
            state.loading = false;
            toast.success("Exercício cadastrado com Sucesso!");
        },
        salvarError(state,action) {
            state.loading = false;
            toast.error(action.payload);
        },
        remover(state,action) {
            state.loading = true;
        },
        removerSucesso(state) {
            state.loading = false;
            toast.success("Exercício apagado com Sucesso!");
        },
        removerError(state) {
            state.loading = false;
            toast.success("Ocorreu um erro ao apagar o Exercício!");
        },
        atualizar(state,action) {
            state.loading = true;
        },
        atualizarSucesso(state) {
            state.loading = false;
            toast.success("Exercício atualizado com Sucesso!");
        },
        atualizarError(state,action) {
            state.loading = false;
            toast.error(action.payload);
        },
    }
});

export const { listar, listarSucesso, listarError, salvar, salvarSucesso, salvarError,
               remover, removerSucesso, removerError, atualizar, atualizarSucesso, 
               atualizarError, listarSemPaginacao, listarSemPaginacaoSucesso,
               listarSemPaginacaoError } = exercicioSlice.actions;

export default exercicioSlice.reducer;