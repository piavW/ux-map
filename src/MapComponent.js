import React, { Component } from 'react' 
import { GetOperators } from './Modules/Service'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class MapComponent extends Component {
  state = {
    operators: [],
    errorMessage: null,
    activeMarker: {},
    selectedPlace: null
  }

  async componentDidMount() {
    let response = await GetOperators()
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        operators: response
      })
    }
  }

  onMarkerClick = (props,marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker
    })
  }

  render() {
    let errorMessage, showingOperatorInfo
    let operatorData = this.state.operators
    const style = {
      width: '60%',
      height: '80%',
      left: '20%',
      borderRadius: '6px',
      position: 'relative'
    }

    if (this.state.errorMessage) {
    errorMessage = <p id="error-message">{this.state.errorMessage}</p>
    }

    if (this.state.selectedPlace) {
      this.state.operators.map(operatorInfo => {
        debugger
        showingOperatorInfo = (
          <> 
          <p>Test test</p>
            <h1 content={operatorInfo.type}></h1>
                  image={operatorInfo.image}
                  information={operatorInfo.information}
                  qualifications={operatorInfo.qualifications}
                  equipment={operatorInfo.equipment}
                  lat={operatorInfo.latitude}
                  long={operatorInfo.longitude}
          </>
        )
      })
    }

    return(
      <>
        {errorMessage}
        <div id="map-container">
          <Map
          google={this.props.google}
          zoom={5}
          style={style}
          initialCenter={{
            lat: 30.0131,
            lng: 10.0686}}
          >
            {operatorData.map(operatorInfo => {
              return(
                <Marker
                id={operatorInfo.id}
                type={operatorInfo.type}
                image={operatorInfo.image}
                information={operatorInfo.information}
                qualifications={operatorInfo.qualifications}
                equipment={operatorInfo.equipment}
                lat={operatorInfo.latitude}
                long={operatorInfo.longitude}
                onClick={this.onMarkerClick}
                />
              )
            })}
          </Map>
          {showingOperatorInfo}
        </div>
      </>
    )
  }
}  
export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapComponent)