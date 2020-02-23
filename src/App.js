import React from 'react'
import Map from './MapComponent'

const App = () => {
  return (
    <div className="App">
      <h1 id="header">UX-Map</h1>
      <p>Hello world</p>
      <div className="map-container">
        <Map />
      </div>
    </div>
  )
}
export default App