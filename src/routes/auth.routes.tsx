import{Routes, Route} from 'react-router-dom'

import { Signin } from '../pages/Signin'
import { SignOut } from '../pages/SignOut'

export function AuthRoute(){

     return(
          <Routes>
               <Route path='/' element={<Signin/>}/>
               <Route path='/register' element={<SignOut/>}/>
          </Routes>
     )
}