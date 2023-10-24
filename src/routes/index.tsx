import {BrowserRouter} from 'react-router-dom'
import { useAuth } from '../context/authUser'

import {AuthRoute} from './auth.routes'
import {AppRoute} from './app.routes'



export function Router(){

     const { user } = useAuth();

     return(
          <BrowserRouter>
                   {user ? <AppRoute/> : <AuthRoute />}
          </BrowserRouter>
     )
}