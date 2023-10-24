import { ThemeContext } from '../../context/authTheme'
import { useContext } from 'react'

import './styles.css'


import { Switch } from "antd";


export function SelectorTheme() {

     const {toggleTheme} = useContext(ThemeContext)

     return (
          <div className='selecTheme'>
          <Switch
          onChange={toggleTheme}
          className='switch'
          />
          <p className='light-dark'>light/dark</p>
          </div>

     )
}