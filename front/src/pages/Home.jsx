import{Outlet} from "react-router-dom"; 
import { Cabecalho } from "../components/cabecalho";


export function Home(){
    return(
        <>
            <Cabecalho/>
            <Outlet/>
        </>
    )

}