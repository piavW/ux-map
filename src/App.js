import React from 'react'
import Map from './MapComponent'

const App = () => {
  return (
    <div className="App">
      <h1 id="header">UX-Map, find your team-mates</h1>
      <div className="map-container">
        <Map />
      </div>
    </div>
  )
}
export default App