import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false
}

export const dietaSlice = createSlice({
    name: 'dieta',
    initialState,
    reducers: {
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
            toast.success("Dieta cadastrada com Sucesso!");
        },
        salvarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao salvar a Dieta!");         
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
            toast.success("Ocorreu um erro ao apagar a dieta!");
        }
    }
});

export const { salvar, salvarSucesso, salvarError, apagar, apagarSucesso, apagarError } = dietaSlice.actions;

export default dietaSlice.reducer;