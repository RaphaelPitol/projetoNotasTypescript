import { ThemeContext } from '../../context/authTheme'
import { useContext } from 'react'

import './styles.css'


import { Switch } from "antd";


export function SelectorTheme() {

     const {toggleTheme, isDarkMode } = useContext(ThemeContext)

     return (
          <div className='selecTheme'>
          <Switch
          onChange={toggleTheme}
          className='switch'
          checked={isDarkMode} 
          />
          <p className='light-dark'>light/dark</p>
          </div>

     )
}