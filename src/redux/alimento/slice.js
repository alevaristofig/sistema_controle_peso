import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    alimentos: [],
    loading: false
}

export const alimentoSlice = createSlice({
    name: 'alimento',
    initialState,
    reducers: {
        listar: (state) => {
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
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
            toast.success("Alimento cadastrado com Sucesso!");
        },
        salvarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao cadastrar o Alimento!");
        }
    }
});

export const { salvar, salvarSucesso, salvarError, listar, listarSucesso, listarError } = alimentoSlice.actions;

export default alimentoSlice.reducer;