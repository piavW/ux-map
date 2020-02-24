/** @jsx jsx */
import React, { useState }from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import { ThemeProvider } from 'emotion-theming'
import { jsx } from "@emotion/core"

const lightTheme = {
  text: '#363537',
  background: '#E2E2E2',
  buttonText: '#000',
  buttonTextHover:'#fff',
  buttonBorder: '#000',
  buttonBg: 'rgba(0,0,0,0)',
  buttonBgHover: 'rgba(0,0,0,1)',
}

const darkTheme = {
  text: '#FAFAFA',
  background: '#363537',
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