import React from 'react'
import Map from './MapComponent'
import { Header } from 'semantic-ui-react'

const App = () => {
  return (
    <div className="App">
      <Header id="header">UX-Map, find your team-mates</Header>
      <div className="map-container">
        <Map />
      </div>
    </div>
  )
}
export default App