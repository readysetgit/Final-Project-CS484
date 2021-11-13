import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class Home2 extends Component {

    render() {
        return (
            <Map google={this.props.google} zoom={14}>
 
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
        
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(Home2)

