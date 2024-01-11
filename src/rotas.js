import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from "./paginas/Home";
import Pessoa from "./paginas/Pessoa";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pessoa" element={<Pessoa />} />
            </Routes>
        </BrowserRouter>
    )
}