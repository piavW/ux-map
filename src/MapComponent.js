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

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker
    })
    this.getOperatorInfo(this.state.selectedPlace.id)
  }

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
      height: '70%',
      top: '10%',
      left: '20%',
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
           <Table inverted stackable collapsing striped>
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
          google={this.props.google}
          zoom={5}
          style={mapStyle}
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