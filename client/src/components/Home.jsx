import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100%",
  width: "100%",
  minHeight: "500px"
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

let hotspotList = []
export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    console.log(e.latLng.lat(), e.latLng.lng())
    if (window.confirm("Do you want to add this to your hotspots?")) {
        hotspotList.push(e.latLng.lat())
        // TODO - Make database call to save place
    }
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const setLocationOnMap = React.useCallback(({ lat, lng }) => {
    setMarkers((current) => [
      ...current,
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ]);
    hotspotList.push(lat)
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
      <div style={{display:'flex'}} className="map-container mtxl pll prl">
        <div style={{flex:1}} className="hotspotList">
            <ul>
                {hotspotList.map((spot, i) => <li key={i}>{spot}</li>)}
                <Search panTo={panTo} setLocationOnMap={setLocationOnMap}/>
            </ul>
        </div>
        <div style={{flex:3, minHeight:'500'}}>
            <div style={{minHeight: 500}}>
            {/* <h1>
                Bears{" "}
                <span role="img" aria-label="tent">
                ⛺️
                </span>
            </h1> */}

            <Locate panTo={panTo} setLocationOnMap={setLocationOnMap}/>

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                <Marker
                    key={`${marker.lat}-${marker.lng}`}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => {
                    setSelected(marker);
                    }}
                    // icon={{
                    //   url: `/bear.svg`,
                    //   origin: new window.google.maps.Point(0, 0),
                    //   anchor: new window.google.maps.Point(15, 15),
                    //   scaledSize: new window.google.maps.Size(30, 30),
                    // }}
                />
                ))}

                {selected ? (
                <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                    setSelected(null);
                    }}
                >
                    <div>
                    <h2>
                        {this.state.selectedPlace.name}
                        {/* <span role="img" aria-label="bear">
                        //  🐻
                        </span>{" "}
                        Alert */}
                    </h2>
                    {/* <p>Spotted {formatRelative(selected.time, new Date())}</p> */}
                    </div>
                </InfoWindow>
                ) : null}
            </GoogleMap>
            </div>
        </div>  
      </div>
  );
}

function Locate({ panTo, setLocationOnMap }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLocationOnMap({
              lat: position.coords.latitude, 
              lng:position.coords.longitude
            })
           },
          () => null
        );
      }}
    >
      My location

    </button>
  );
}

function Search({ panTo, setLocationOnMap }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setLocationOnMap({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}