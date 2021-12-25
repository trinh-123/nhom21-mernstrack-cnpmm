import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class SimpleMap extends Component {
  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: 10.8497415, lng: 106.771588 }}
        >
          <Marker position={{ lat: 10.8497415, lng: 106.771588 }} />
        </GoogleMap>
      ))
    );
    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDt8TYhDnISwmGiKqdfCAFcq4cFFnH6NcQ&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `120%`, width: `100%` }} />}
      />
    );
  }
}

export default SimpleMap;
