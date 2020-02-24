import React from 'react'
import Map from './MapComponent'
import { Header } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

const App = () => {
  return (
    <>
    <br/>
      <center>
        <Header as='h2' id='header' content='UX-Map, find your team-mates'/>
      </center>
      <div className='map-container'>
        <Map />
      </div>
    </>
  )
}
export default App