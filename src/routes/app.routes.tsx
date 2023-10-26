import{Routes, Route} from 'react-router-dom'

import { Home } from "../pages/Home";
import { NewCar } from '../pages/NewCar';
import { ListCar } from '../pages/ListCar';

export function AppRoute(){

     return(
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/newcar' element={<NewCar/>}/>
               <Route path='/listcar' element={<ListCar/>}/>
          </Routes>
     )
}