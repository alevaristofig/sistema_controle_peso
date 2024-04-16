import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


const initialState = {
    treinos: [],
    loadingTreino: false
}

export const treinoSlice = createSlice({
    name: 'treino',
    initialState,
    reducers: {
        listarTreino: (state,action) => {
            state.loadingTreino = true;            
        },
        listarSucesso: (state,action) => {
            state.loadingTreino = false;
            state.treinos = action.payload;
        },
        listarError: (state) => {
            state.loadingTreino = false;
            toast.error("Ocorreu um erro ao listar os Treinos!");
        },        
        salvar(state,action) {
            state.loadingTreino = true;  
        },
        salvarSucesso(state) {
            state.loadingTreino = false; 
            toast.success("Treino registrado com Sucesso!"); 
        },
        salvarError(state) {
            state.loadingTreino = false;  
            toast.error("Ocorreu um erro ao registrar o Treino!");
        }
    }
});

export const { listarTreino, listarSucesso, listarError, salvar, salvarSucesso, 
              salvarError} = treinoSlice.actions;

export default treinoSlice.reducer;