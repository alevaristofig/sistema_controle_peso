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
        salvarError(state) {
            state.loading = false;
            toast.error("Ocorreu um erro ao cadastrar o Histórico Médico!");
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
               apagarError } = historicoMedicoSlice.actions;

export default historicoMedicoSlice.reducer;