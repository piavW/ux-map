import React, { Component } from 'react' 
import { GetOperators, GetOperator } from './Modules/Service'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { Grid, Item } from 'semantic-ui-react'

class MapComponent extends Component {
  state = {
    operators: [],
    operatorDetails: [],
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

      let details = await GetOperator(response[0].id)
      let AllDetails = this.state.operators.concat(details)
      debugger
      this.setState({
        operatorDetails: AllDetails
      })
    }  
  }

  // async getOperatorInfo(id){
  //    let response = await GetOperator(id)
  //   debugger
  //   if (response.error_message) {
  //     this.setState({
  //       errorMessage: response.error_message
  //     })
  //   } else {
  //     this.setState({
  //       operatorDetails: response
  //     })
  //   }
  // }

  onMarkerClick = (props, marker) => {
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
   //   this.getOperatorInfo(this.state.selectedPlace.props.id)
     operatorData.map(operatorInfo => {
        showingOperatorInfo = (
          <Grid centered stackable>
          <Item.Group>
            <Item>
              <Item.Header>Type:{operatorInfo.type}</Item.Header>
              <Item.Image src={operatorInfo.image}></Item.Image>
              <Item.Meta >Info:{operatorInfo.information}</Item.Meta>
              <Item.Meta>Qualifications:{operatorInfo.qualifications}</Item.Meta>
              <Item.Description>Equipment:{operatorInfo.equipment}</Item.Description>
              <Item.Extra>Lat: {operatorInfo.lat}</Item.Extra>
              <Item.Extra>Long: {operatorInfo.lon}</Item.Extra>
            </Item>
          </Item.Group>
          </Grid>
        )
      })
    }
    
    return(
      <>
      <Grid centered container>
        {errorMessage}
        <Grid.Row>
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
                id={`operator_${operatorInfo.id}`}
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
            })
          }
          
          </Map>
        </div>
        </Grid.Row>
        <Grid.Row>
        {showingOperatorInfo}
        </Grid.Row>
        </Grid>
      </>
    )
  }
}  
export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapComponent)