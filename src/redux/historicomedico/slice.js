import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false
}

export const historicoMedicoSlice = createSlice({
    name: 'historicomedico',
    initialState,
    reducers: {
        salvar(state,action) {
            state.loading = true;
        },
        salvarSucesso(state) {
            state.loading = false;
            toast.success("Histórico Médico cadastrado com Sucesso!");
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
            toast.success("Histórico Médico atualizado com Sucesso!");
        },
        atualizarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao atualizar o Histórico Médico!");
        },
        apagar(state,action){
            state.loading = true;
        },
        apagarSucesso(state){
            state.loading = false;
            toast.success("Histórico Médico apagado com Sucesso!");
        },
        apagarError(state){
            state.loading = false;
            toast.error("Ocorreu um erro ao apagar o Histórico Médico!");
        }
    }
});

export const { salvar, salvarSucesso, salvarError, apagar, apagarSucesso,
               apagarError, atualizar, atualizarSucesso, atualizarError } = historicoMedicoSlice.actions;

export default historicoMedicoSlice.reducer;