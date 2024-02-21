import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    exercicios: [],
    loading: false
}

export const exercicioSlice = createSlice({
    name: 'exercicio',
    initialState,
    reducers: {
        listar: (state) => {                        
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
    }
});

export const { listar, listarSucesso, listarError } = exercicioSlice.actions;

export default exercicioSlice.reducer;