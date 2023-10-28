import { ThemeContext } from '../../context/authTheme'
import { useContext } from 'react'

// import './styles.css'


import { Switch } from "antd";


export function SelectorTheme() {

     const {toggleTheme, isDarkMode } = useContext(ThemeContext)

     return (
        
          <Switch
          onChange={toggleTheme}
          className='switch'
          checked={isDarkMode} 
          checkedChildren="dark"
          unCheckedChildren="light"
          />
         
          

     )
}