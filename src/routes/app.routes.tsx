import{Routes, Route} from 'react-router-dom'

import { Header } from "../pages/Home";



export function AppRoute(){

     return(
          <Routes>
               <Route path='/' element={<Header/>}/>
          </Routes>
     )
}