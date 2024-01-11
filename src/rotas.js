import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from "./paginas/Home";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}