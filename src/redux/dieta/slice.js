import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false
}

export const dietaSlice = createSlice({
    name: 'dieta',
    initialState,
    reducers: {
        salvarDietaAlimento: (state,action) => {
            state.loading = true;
        },
        salvarDietaAlimentoSucesso: (state) => {
            state.loading = false;
            toast.success("Dieta cadastrada com Sucesso!");
        },
        salvarDietaAlimentoError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao salvar a Dieta!");         
        },
        atualizar(state,action){
            state.loading = true;
        },
        atualizarSucesso(state){
            state.loading = false;
            toast.success("Dieta atualizada com Sucesso!");
        },
        atualizarError(state){
            state.loading = false;
            toast.error("Ocorreu um erro ao atualizar a Dieta!");   
        },
        apagar(state,action) {
            state.loading = true;
        },
        apagarSucesso(state) {
            state.loading = false;
            toast.success("Dieta apagada com Sucesso!");
        },
        apagarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao apagar a dieta!");
        }
    }
});

export const { salvarDietaAlimento, salvarDietaAlimentoSucesso, salvarDietaAlimentoError, 
               apagar, apagarSucesso, apagarError, atualizar, atualizarSucesso,
               atualizarError } = dietaSlice.actions;

export default dietaSlice.reducer;