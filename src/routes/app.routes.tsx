import{Routes, Route} from 'react-router-dom'

import { Home } from "../pages/Home";
import { NewCar } from '../pages/NewCar';
import { ListCar } from '../pages/ListCar';
import { ListEnd } from '../pages/ListEnd';
import { NewEnd } from '../pages/NewEnd';

export function AppRoute(){

     return(
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/listcar' element={<ListCar/>}/>
               <Route path='/newcar/:id?' element={<NewCar/>}/>
               <Route path='/listend' element={<ListEnd/>}/>
               <Route path='/newend/:id?' element={<NewEnd/>}/>
          </Routes>
     )
}