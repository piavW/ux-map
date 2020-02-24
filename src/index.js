import React, { useState }from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import { ThemeProvider } from 'emotion-theming'

const lightTheme = {
  text: '#000',
  background: '#fff',
  buttonText: '#fff',
  buttonTextHover:'#fff',
  buttonBorder: '#fff',
  buttonBg: 'rgba(0,0,0,0)',
  buttonBgHover: 'rgba(0,0,0,1)',
}

const darkTheme = {
  text: '#fff',
  background: '#121212',
  buttonText: '#fff',
  buttonTextHover:'#000',
  buttonBorder: '#fff',
  buttonBg: 'rgba(255,255,255,0)',
  buttonBgHover: 'rgba(255,255,255,1)',
}
function Root() {
  const [isDark, setIsDark] = useState(false) 
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <App isDark={isDark} setIsDark={setIsDark}/>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Root />, rootElement)
serviceWorker.unregister()