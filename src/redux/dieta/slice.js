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
        },
        apagarAlimentoDieta(state,action) {            
            state.loading = false;
        },
        apagarAlimentoDietaSucesso(state) {
            state.loading = false;
        },
        apagarAlimentoDietaErro(state) {
            state.loading = false;
            toast.success("Dieta apagada com Sucesso!");
        },
        atualizarDietaAlimento(state,action){
            state.loading = false;
        },
        atualizarDietaAlimentoSucesso(state){
            state.loading = false;
            toast.success("Alimento da Dieta atualizado com Sucesso!");
        },
        atualizarDietaAlimentoError(state){
            state.loading = false;
            toast.error("Ocorreu um erro ao atualizar o alimento da dieta!");            
        }
    }
});

export const { salvarDietaAlimento, salvarDietaAlimentoSucesso, salvarDietaAlimentoError, 
               apagar, apagarSucesso, apagarError, atualizar, atualizarSucesso,
               atualizarError, apagarAlimentoDieta, apagarAlimentoDietaSucesso,
               apagarAlimentoDietaErro, atualizarDietaAlimento, atualizarDietaAlimentoSucesso,
               atualizarDietaAlimentoError } = dietaSlice.actions;

export default dietaSlice.reducer;