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
    this.getOperatorInfo(this.state.selectedPlace.id)
  }

  getOperatorInfo = async id => {
    // let operatorDeets = []
    let details = await GetOperator(id)
    debugger
    // operatorDeets[0] = details.id
    // operatorDeets[1] = details.type
    // operatorDeets[2] = details.image
    // operatorDeets[3] = details.information
    // operatorDeets[4] = details.qualifications
    // operatorDeets[5] = details.equipment
    this.setState({
      operatorDetails: details
    })
  }
  // getOperatorInfo = async id => {
  //   let details = await GetOperator(id)
  //   let AllDetails = this.state.operators.concat(details)
  //   debugger
  //   this.setState({
  //     operatorDetails: AllDetails
  //   })
  // }

  render() {
    let errorMessage, showingOperatorInfo
    let operatorData = this.state.operators
    

    const style = {
      width: '50%',
      height: '70%',
      top: '10%',
      left: '25%',
      borderRadius: '6px',
      position: 'relative'
    }

    if (this.state.errorMessage) {
    errorMessage = <p id='error-message'>{this.state.errorMessage}</p>
    }    
    
    if (this.state.selectedPlace) {
      let operatorInfo = this.state.operatorDetails
      showingOperatorInfo = (
        <center>
        <Item.Group>
          <Item>
            <Item.Header>About this operative:</Item.Header>
            <Item.Meta>Id:{operatorInfo.id}</Item.Meta>
            <Item.Meta>Type:{operatorInfo.type}</Item.Meta>
            <Item.Image src={operatorInfo.image}></Item.Image>
            <Item.Meta >Info:{operatorInfo.information}</Item.Meta>
            <Item.Meta>Qualifications:{operatorInfo.qualifications}</Item.Meta>
            <Item.Description>Equipment:{operatorInfo.equipment}</Item.Description>           
          </Item>
        </Item.Group>
        </center>
      )
  }

    return(
      <>
      
        {errorMessage}
        
        {showingOperatorInfo}
      
        <div id='map-container'>
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

        </div>
      </>
    )
  }
}  
export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapComponent)