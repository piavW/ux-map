/** @jsx jsx */
import React from 'react'
import Map from './MapComponent'
import { Header, Icon } from 'semantic-ui-react'
import { css, jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const App = ( {isDark, setIsDark} ) => {
  const theme = useTheme()

  return (
    <div 
      css={css`
        padding: 50px 0;
        background-color: ${theme.background};
        color: ${theme.text};
        text-align: center;
        height: 100vh;
        transition-duration: 0.2s;
        transition-property: background-color, color;
      `}>
      
      <button
        css={css`
        border: 2px solid ${theme.buttonBorder};
        background-color: ${theme.buttonBg};
        color: ${theme.buttonText};
        padding: 2px 6px;
        margin: 10px;
        :hover {
          background-color: ${theme.buttonBgHover};
          color: ${theme.buttonTextHover};
        }
        `}
        onClick={() => {
          setIsDark(!isDark)
        }}
      >
        Change to {isDark? 'light' : 'dark'} mode <Icon size='small' name='adjust'></Icon>
      </button>
      <center>
      {isDark? <Header as='h2' id='header' inverted content='UX-Map, find your team-mates'/> : <Header as='h2' id='header' content='UX-Map, find your team-mates'/> }
      <hr />
      </center>
      <div className='map-container'>
        <Map />
      </div>
    </div>
  )
}
export default App