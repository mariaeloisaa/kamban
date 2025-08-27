import {Routes, Route} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Quadro } from '../components/quadro';
import { CadUsuario } from '../pages/CadUsuario';
import { CadTarefa } from '../pages/CadTarefa';

export function Rotas(){
    return(
    <Routes>
        <Route path='/' element={<Home/>}>
            <Route index element={<Quadro/>}/>
            <Route path ='cadUsuario' element={<CadUsuario/>}/>
            <Route path ='cadTarefa' element={<CadTarefa/>}/>
        </Route>
    </Routes>
    )

}

