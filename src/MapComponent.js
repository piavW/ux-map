import React, { Component } from 'react' 
import { GetOperators, GetOperator } from './Modules/Service'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { Item, Table, Icon } from 'semantic-ui-react'

class MapComponent extends Component {
  state = {
    operators: [],
    operatorDetails: [],
    errorMessage: null,
    activeMarker: {},
    selectedPlace: null
  }

  async componentDidMount() { //Gets array of id, type and latitude & longitude.
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

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker
    })
    this.getOperatorInfo(this.state.selectedPlace.id)
  }

  //Selects the specific information related to the given id.
  getOperatorInfo = async id => { 
    let details = await GetOperator(id)
    this.setState({
      operatorDetails: details
    })
  }

  render() {
    let errorMessage, showingOperatorInfo
    let operatorData = this.state.operators
    
    const mapStyle = {
      width: '60%',
      height: '70%', //Could be made to cover full width of screen for smaller screen
      top: '10%',
      left: '20%'
    }

    if (this.state.errorMessage) {
    errorMessage = <p id='error-message'>{this.state.errorMessage}</p> 
    }    
    
    if (this.state.selectedPlace) {
      let operatorInfo = this.state.operatorDetails
      showingOperatorInfo = (
      <center>
          <Table className='ui-table' stackable collapsing striped> {/* Could be inverted for light & not inverted for dark theme - needs access to isDark */}
          <Table.Header> 
            <Table.HeaderCell>
              <Item.Header as='h3'> 
                <Icon size='large' name='spy'/> 
                {operatorInfo.type}: {operatorInfo.id}
             </Item.Header>
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Item.Group>
              <Table.Row>
                <Item.Image size='small' src={operatorInfo.image}></Item.Image>
              </Table.Row>
              <Table.Row><Table.Cell>
                <Item.Meta as='h4'><Icon size='large' name='search plus'/>Info: {operatorInfo.information}</Item.Meta>
              </Table.Cell></Table.Row>
              <Table.Row><Table.Cell>
                <Item.Meta as='h4'><Icon size='large' name='shield alternate'/>Qualifications: {operatorInfo.qualifications}</Item.Meta>
              </Table.Cell></Table.Row>
              <Table.Row><Table.Cell>
                <Item.Description as='h4'><Icon size='large' name='suitcase'/>Equipment: {operatorInfo.equipment}</Item.Description>
              </Table.Cell></Table.Row>
            </Item.Group>
          </Table.Body>
        </Table>
        </center>
      )
  }

    return(
      <>
        {errorMessage}
        <br/>
        {showingOperatorInfo}
      
        <div id='map-container'>
          <Map
          isMarkerShown={true} //Needed to display all markers on map.
          google={this.props.google}
          zoom={8} //if more zoomed out it looks like only 1 markers is present if they are close to eachother.
          style={mapStyle}
          initialCenter={{
            lat: 35.9580,
            lng: 39.0010}}
          >
            {operatorData.map(operatorInfo => {
              return(
                <Marker
                key={operatorInfo}
                id={operatorInfo.id}
                type={operatorInfo.type}
                image={operatorInfo.image}
                information={operatorInfo.information}
                qualifications={operatorInfo.qualifications}
                equipment={operatorInfo.equipment}
                position={{ 
                  lat: operatorInfo.lat,
                  lng: operatorInfo.lon
                }}
                onClick={this.onMarkerClick}
                >
                </Marker>
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