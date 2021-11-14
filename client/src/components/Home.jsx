import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getDetails,
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

//let hotspotList = []



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
    //console.log(e.latLng.lat(), e.latLng.lng())
    if (window.confirm("Do you want to add this to your hotspots?")) {
        //hotspotList.push(e.latLng.lat())
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

  const setLocationOnMap = React.useCallback(({ lat, lng, place_id = -1 }) => {
      if (place_id !== -1) {
        const param = {
          placeId: place_id,
        };
        getDetails(param)
          .then((res) => {
           // hotspotList.push(res.formatted_address);
            setMarkers((current) => { 
              let prev_index = current.findIndex(x => x.lat === lat && x.lng === lng)
              if (prev_index > -1) {
                return current;
              }
              return [
              ...current,
              {
                lat: lat,
                lng: lng,
                address: res.formatted_address,
                time: new Date(),
              },
            ]
          });
          })
          .catch((e) => console.error(e));
      } else {

        setMarkers((current) => {
          let prev_index = current.findIndex(x => x.lat === lat && x.lng === lng)
          if (prev_index > -1) {
            return current;
          }
        return [
          ...current,
          {
            lat: lat,
            lng: lng,
            time: new Date(),
          },
        ]
      });
      }
  }, []);

  // const getPlaceDetailsById = React.useCallback((pId) => {
  //   const param = {
  //     placeId: pId
  //   }
  //   console.log(param)
  //   getDetails(param).then((res) => {
  //     // console.log(res)
  //     setMarkers((current) => { 
  //         return [
  //           ...current,
  //           {
  //             lat: res.geometry.location.lat(),
  //             lng: res.geometry.location.lng(),
  //             placeId: pId,
  //             time: new Date(),
  //             address: res.formatted_address,
  //           },
  //         ]
  //       }
  //    );
  //   }).catch(e => console.error(e))
  // }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
      <div style={{display:'flex'}} className="map-container mtxl pll prl">
        <div style={{flex:1}} className="hotspotList">
            <ul>
                {markers.map((spot, i) => <li key={spot.lat}>{spot.address || spot.lat}</li>)}
                <Search panTo={panTo} setLocationOnMap={setLocationOnMap} />
            </ul>
        </div>
        <div style={{flex:3, minHeight:'500'}}>
            <div style={{minHeight: 500}}>
            <Locate panTo={panTo}/>
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
                          {selected.address}
                      </h2>
                    </div>
                </InfoWindow>
                ) : null}
            </GoogleMap>
            </div>
        </div>  
      </div>
  );
}

function Locate({ panTo }) {
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
      console.log(results)
      const place_id = results[0].place_id
      console.log(place_id)
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setLocationOnMap({ lat, lng, place_id });
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
                <ComboboxOption key={id + description} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}